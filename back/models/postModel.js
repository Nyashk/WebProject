const db = require('../config/db');

// Список постов пользователя
async function getPostsByUser(userId) {
  const [rows] = await db.query(
    `SELECT
       p.id,
       p.user_id    AS userId,
       u.username   AS username,
       p.image_url  AS imageUrl,
       p.title,
       p.description,
       p.created_at AS createdAt
     FROM posts p
     JOIN users u ON u.id = p.user_id
     WHERE p.user_id = ?
     ORDER BY p.created_at DESC`,
    [userId]
  );
  return rows;
}

// Список своих постов
async function getMyPosts(userId) {
  return getPostsByUser(userId);
}

// Создать новый пост
async function createPost({ userId, imageUrl, title, description }) {
  const [result] = await db.query(
    `INSERT INTO posts (user_id, image_url, title, description)
     VALUES (?, ?, ?, ?)`,
    [userId, imageUrl, title, description]
  );
  const postId = result.insertId;

  // Вернуть созданный пост
  const [rows] = await db.query(
    `SELECT
       p.id,
       p.user_id    AS userId,
       u.username   AS username,
       p.image_url  AS imageUrl,
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

// Получить один пост по ID
async function getPostById(postId) {
  const [rows] = await db.query(
    `SELECT
       p.id,
       p.user_id      AS userId,
       u.username     AS username,
       u.avatar_url   AS avatarUrl,
       p.image_url    AS imageUrl,
       p.title,
       p.description,
       p.created_at   AS createdAt
     FROM posts p
     JOIN users u ON u.id = p.user_id
     WHERE p.id = ?`,
    [postId]
  );
  return rows[0] || null;
}

// *** Новая функция: получить все посты ***
async function getAllPosts() {
  const [rows] = await db.query(
    `SELECT
       p.id,
       p.user_id      AS userId,
       u.username     AS username,
       u.avatar_url   AS avatarUrl,
       p.image_url    AS imageUrl,
       p.title,
       p.description,
       p.created_at   AS createdAt
     FROM posts p
     JOIN users u ON u.id = p.user_id
     ORDER BY p.created_at DESC`
  );
  return rows;
}

module.exports = {
  getPostsByUser,
  getMyPosts,
  createPost,
  getPostById,
  getAllPosts
};
