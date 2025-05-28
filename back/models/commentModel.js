const db = require('../config/db');

// Получить все комментарии к посту
async function getCommentsByPostId(postId) {
  const [rows] = await db.query(
    `SELECT 
       c.id,
       c.content,
       c.created_at AS createdAt,
       u.id          AS userId,
       u.username,
       u.avatar_url  AS avatarUrl
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.post_id = ?
     ORDER BY c.created_at ASC`,
    [postId]
  );
  return rows;
}

// Создать комментарий
async function createComment({ postId, userId, content }) {
  const [result] = await db.query(
    `INSERT INTO comments (post_id, user_id, content)
     VALUES (?, ?, ?)`,
    [postId, userId, content]
  );
  const commentId = result.insertId;
  const [rows] = await db.query(
    `SELECT 
       c.id,
       c.content,
       c.created_at AS createdAt,
       u.id          AS userId,
       u.username,
       u.avatar_url  AS avatarUrl
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.id = ?`,
    [commentId]
  );
  return rows[0];
}

module.exports = {
  getCommentsByPostId,
  createComment,
};
