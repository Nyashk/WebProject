const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const db = require('../db'); // твое подключение к базе
const authMiddleware = require('../middleware/auth'); // проверка токена

// Загрузка аватара
router.post('/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
  try {
    const userId = req.user.id;
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    
    await db.query('UPDATE users SET avatarUrl = ? WHERE id = ?', [avatarUrl, userId]);
    
    res.json({ message: 'Аватар обновлён', avatarUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при загрузке аватара' });
  }
});

// Загрузка фонового изображения
router.post('/background', authMiddleware, upload.single('background'), async (req, res) => {
  try {
    const userId = req.user.id;
    const backgroundUrl = `/uploads/backgrounds/${req.file.filename}`;

    await db.query('UPDATE users SET backgroundUrl = ? WHERE id = ?', [backgroundUrl, userId]);

    res.json({ message: 'Фон обновлён', backgroundUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при загрузке фона' });
  }
});

module.exports = router;
