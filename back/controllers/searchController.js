const db = require('../config/db');

async function search(req, res) {
  const q = req.query.q;
  if (!q || !q.trim()) {
    return res.status(400).json({ message: 'Пустой запрос' });
  }
  const term = `%${q.trim().toLowerCase()}%`;

  try {
    const [users] = await db.query(
      `SELECT id, username 
       FROM users 
       WHERE LOWER(username) LIKE ? 
       LIMIT 10`,
      [term]
    );

    const [artworks] = await db.query(
      `SELECT p.id, p.title, p.image_url AS imageUrl, u.username 
       FROM posts p
       JOIN users u ON u.id = p.user_id
       WHERE LOWER(p.title) LIKE ? 
       LIMIT 10`,
      [term]
    );

    res.json({ users, artworks });
  } catch (err) {
    console.error('Ошибка поиска:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}

module.exports = { search };
