const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const SALT_ROUNDS = 10; 

async function register(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }

  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) return res.status(409).json({ error: 'Email уже зарегистрирован' });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = await userModel.createUser({ username, email, password: hashedPassword });

    // 🔐 Генерация токена
    const emailToken = crypto.randomBytes(32).toString('hex');
    await userModel.setEmailToken(userId, emailToken);

    // 📩 Ссылка подтверждения
    const link = `http://localhost:5000/api/auth/verify?token=${emailToken}`;
    await sendEmail({
      to: email,
      subject: 'Подтверждение регистрации на ArtFair',
      html: `<p>Привет, ${username}!</p><p>Нажмите на ссылку для подтверждения email:</p><a href="${link}">${link}</a>`,
    });

    return res.status(201).json({ message: 'Регистрация успешна. Проверьте email для подтверждения.' });
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
}

async function verifyEmail(req, res) {
  const { token } = req.query;

  if (!token) return res.status(400).json({ error: 'Токен отсутствует' });

  try {
    const user = await userModel.findUserByEmailToken(token);
    if (!user) return res.status(400).json({ error: 'Недействительный токен' });

    await userModel.verifyUserEmail(user.id);
    return res.send('Email успешно подтверждён!');
  } catch (err) {
    console.error('Ошибка подтверждения:', err);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
}

module.exports = {
  register,
  verifyEmail,
};
