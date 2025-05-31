const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getPostsByUser } = require('../models/postModel');

router.get('/me/posts', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await getPostsByUser(userId);
    res.json(posts);
  } catch (err) {
    console.error('Ошибка при получении артов текущего пользователя:', err);
    res.status(500).json({ error: 'Не удалось загрузить работы пользователя' });
  }
});

router.get('/:id/posts', async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Некорректный id пользователя' });
    }
    const posts = await getPostsByUser(userId);
    res.json(posts);
  } catch (err) {
    console.error('Ошибка при получении артов пользователя:', err);
    res.status(500).json({ error: 'Не удалось загрузить работы пользователя' });
  }
});

module.exports = router;
