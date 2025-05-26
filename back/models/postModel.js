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

// Создать новый пост (арт) и вернуть вместе с username автора
async function createPost({ userId, imageUrl, title, description }) {
  const [result] = await db.query(
    `INSERT INTO posts (user_id, image_url, title, description)
     VALUES (?, ?, ?, ?)`,
    [userId, imageUrl, title, description]
  );
  const postId = result.insertId;

  // Отдаём вместе с username
  const [rows] = await db.query(
    `SELECT 
       p.id,
       p.user_id AS userId,
       u.username AS username,
       p.image_url AS imageUrl,
       p.title,
       p.description,
       p.created_at AS createdAt
     FROM posts p
     JOIN users u ON u.id = p.user_id
     WHERE p.id = ?`,
    [postId]
  );
  return rows[0];
}

module.exports = {
  getPostsByUser,
  createPost,
};
