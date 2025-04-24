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
    if (existingUser) {
      return res.status(409).json({ error: 'Email уже зарегистрирован. Пожалуйста, авторизуйтесь.' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await userModel.createUser({ username, email, password: hashedPassword });

    return res.status(201).json({ message: 'Регистрация успешна. Можете войти.' });
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email и пароль обязательны' });
  }

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    return res.status(200).json({ message: 'Авторизация успешна', user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Ошибка авторизации:', err);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
}

module.exports = {
  register,
  login,
};
