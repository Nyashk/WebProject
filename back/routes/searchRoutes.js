const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/search?q=...
router.get('/', async (req, res) => {
  const q = req.query.q;
  if (!q || !q.trim()) {
    return res.status(400).json({ message: 'Пустой запрос' });
  }

  const term = `%${q.trim()}%`;

  try {
    // Поиск пользователей (по username), регистронезависимо
    const [users] = await db.query(
      `SELECT id, username AS name 
       FROM users 
       WHERE LOWER(username) LIKE LOWER(?)`,
      [term]
    );

    // Поиск статей (если есть таблица articles)
    const [articles] = await db.query(
      `SELECT id, title 
       FROM articles 
       WHERE LOWER(title) LIKE LOWER(?)`,
      [term]
    );

    // Поиск артов (posts.title)
    const [artworks] = await db.query(
      `SELECT id, title 
       FROM posts 
       WHERE LOWER(title) LIKE LOWER(?)`,
      [term]
    );

    res.json({ accounts: users, articles, artworks });
  } catch (err) {
    console.error('Ошибка поиска:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
