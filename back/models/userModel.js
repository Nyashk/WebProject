const db = require('../config/db');

async function createUser({ username, email, password }) {
 
  const [result] = await db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  const id = result.insertId;
  const [rows] = await db.query(
    'SELECT id, username, email FROM users WHERE id = ?',
    [id]
  );
  return rows[0];  
}

async function findUserByEmail(email) {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0] || null;
}

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
