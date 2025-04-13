const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');

const SALT_ROUNDS = 10; // для хеширования пароля

// Регистрация пользователя
async function register(req, res) {
  const { username, email, password } = req.body;

  // Простая проверка на заполненность
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }

  try {
    // Проверяем, есть ли пользователь с таким email
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Создаём пользователя в БД
    const userId = await userModel.createUser({
      username,
      email,
      password: hashedPassword,
    });

    // Отправляем письмо
    await sendEmail({
      to: email,
      subject: 'Добро пожаловать в ArtFair!',
      text: `Привет, ${username}! Спасибо за регистрацию.`,
      html: `<h1>Привет, ${username}!</h1><p>Спасибо за регистрацию в ArtFair 🎨</p>`,
    });

    return res.status(201).json({ message: 'Регистрация успешна', userId });
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
}

module.exports = {
  register,
};
