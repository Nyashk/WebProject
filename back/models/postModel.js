const db = require('../config/db');

// Получить все посты (арты) пользователя
async function getPostsByUser(userId) {
  const [rows] = await db.query(
    `SELECT 
       id,
       user_id AS userId,
       image_url AS imageUrl,
       title,
       description,
       created_at AS createdAt
     FROM posts
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
}

// Создать новый пост (арт)
async function createPost({ userId, imageUrl, title, description }) {
  const [result] = await db.query(
    `INSERT INTO posts (user_id, image_url, title, description)
     VALUES (?, ?, ?, ?)`,
    [userId, imageUrl, title, description]
  );
  // вернём полный объект
  const postId = result.insertId;
  const [rows] = await db.query(
    `SELECT 
       id,
       user_id AS userId,
       image_url AS imageUrl,
       title,
       description,
       created_at AS createdAt
     FROM posts
     WHERE id = ?`,
    [postId]
  );
  return rows[0];
}

module.exports = {
  getPostsByUser,
  createPost,
};
