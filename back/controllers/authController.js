const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your-strong-secret-key';

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Проверяем, нет ли уже пользователя с таким email
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // 2. Хешируем пароль и создаём
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await userModel.createUser({
      username,
      email,
      password: hashedPassword
    });

    // 3. Генерируем JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 4. Возвращаем клиенту и token, и объект user
    return res.status(201).json({
      message: 'Регистрация успешна',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    return res.status(500).json({ message: 'Ошибка сервера при регистрации' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' });
    }

    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Авторизация успешна',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    return res.status(500).json({ message: 'Ошибка сервера при авторизации' });
  }
};

exports.logout = async (req, res) => {
  // Здесь можно добавить логику инвалидирования токена, если нужно
  return res.status(200).json({ message: 'Выход выполнен успешно' });
};

exports.checkAuth = async (req, res) => {
  try {
    const user = await userModel.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Ошибка проверки авторизации:', error);
    return res.status(500).json({ message: 'Ошибка сервера при проверке авторизации' });
  }
};
