const db = require('../config/db');

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

async function getMyPosts(userId) {
  return getPostsByUser(userId);
}

async function createPost({ userId, imageUrl, title, description }) {
  const [result] = await db.query(
    `INSERT INTO posts (user_id, image_url, title, description)
     VALUES (?, ?, ?, ?)`,
    [userId, imageUrl, title, description]
  );
  const postId = result.insertId;

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
       p.created_at   AS createdAt,
       (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) AS likes
     FROM posts p
     JOIN users u ON u.id = p.user_id
     WHERE p.id = ?`,
    [postId]
  );
  return rows[0] || null;
}

async function getAllPosts(sortBy = 'created_at') {
  const orderBy =
    sortBy === 'popular' ? 'likes DESC, p.created_at DESC' : 'p.created_at DESC';

  const [rows] = await db.query(
    `SELECT
       p.id,
       p.user_id      AS userId,
       u.username     AS username,
       u.avatar_url   AS avatarUrl,
       p.image_url    AS imageUrl,
       p.title,
       p.description,
       p.created_at   AS createdAt,
       COUNT(pl.user_id) AS likes
     FROM posts p
     JOIN users u ON u.id = p.user_id
     LEFT JOIN post_likes pl ON pl.post_id = p.id
     GROUP BY p.id
     ORDER BY ${orderBy}`
  );
  return rows;
}

async function getLikesCount(postId) {
  const [rows] = await db.query(
    `SELECT COUNT(*) AS likesCount FROM post_likes WHERE post_id = ?`,
    [postId]
  );
  return rows[0].likesCount || 0;
}

async function hasUserLikedPost(postId, userId) {
  const [rows] = await db.query(
    `SELECT 1 FROM post_likes WHERE post_id = ? AND user_id = ? LIMIT 1`,
    [postId, userId]
  );
  return rows.length > 0;
}

async function likePost(postId, userId) {
  try {
    await db.query(
      `INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)`,
      [postId, userId]
    );
    return true;
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return false;
    throw err;
  }
}

async function unlikePost(postId, userId) {
  const [result] = await db.query(
    `DELETE FROM post_likes WHERE post_id = ? AND user_id = ?`,
    [postId, userId]
  );
  return result.affectedRows > 0;
}

module.exports = {
  getPostsByUser,
  getMyPosts,
  createPost,
  getPostById,
  getAllPosts,
  getLikesCount,
  hasUserLikedPost,
  likePost,
  unlikePost
};
