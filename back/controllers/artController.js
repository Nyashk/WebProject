require('dotenv').config();
const { getPostsByUser, createPost } = require('../models/postModel');

const API_URL = process.env.API_URL || 'http://localhost:5000';

// Загрузка нового арта
exports.uploadArt = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Пользователь не авторизован' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не загружен' });
    }

    // Делаем полный URL для фронта
    const imageUrl = `${API_URL}/uploads/arts/${req.file.filename}`;
    const { title, description } = req.body;

    const post = await createPost({
      userId: req.user.id,
      imageUrl,
      title: title || null,
      description: description || null,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error('Ошибка при загрузке арта:', err);
    res.status(500).json({ error: 'Не удалось загрузить арт' });
  }
};

// Получить арты любого пользователя (по :id)
exports.getUserArtworksByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Некорректный ID пользователя' });
    }
    const posts = await getPostsByUser(userId);
    res.json(posts);
  } catch (err) {
    console.error('Ошибка при получении артов:', err);
    res.status(500).json({ error: 'Не удалось загрузить работы пользователя' });
  }
};
