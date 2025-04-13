const db = require('../config/db');

// Создание нового пользователя
async function createUser({ username, email, password }) {
  const [result] = await db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  return result.insertId; // возвращаем id нового пользователя
}

// Поиск пользователя по email
async function findUserByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // вернётся undefined, если нет такого
}

// Поиск пользователя по id
async function findUserById(id) {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
