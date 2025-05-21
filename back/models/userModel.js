const db = require('../config/db');

// Создание нового пользователя: возвращаем полный объект
async function createUser({ username, email, password }) {
  // 1. Вставляем в БД
  const [result] = await db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  const id = result.insertId;
  // 2. Достаём созданного пользователя (без пароля!)
  const [rows] = await db.query(
    'SELECT id, username, email FROM users WHERE id = ?',
    [id]
  );
  return rows[0];  // { id, username, email }
}

// Поиск пользователя по email (для логина и проверки дублирования)
async function findUserByEmail(email) {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0] || null;
}

// Поиск пользователя по id (для checkAuth)
async function findUserById(id) {
  const [rows] = await db.query(
    'SELECT id, username, email FROM users WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
