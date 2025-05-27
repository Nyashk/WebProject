require('dotenv').config();
const {
  getPostsByUser,
  getMyPosts,
  createPost,
  getPostById
} = require('../models/postModel');

const API_URL = process.env.API_URL || 'http://localhost:5000';

// POST /api/arts/upload
exports.uploadArt = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Не авторизован' });
    if (!req.file) return res.status(400).json({ error: 'Файл не загружен' });

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
    console.error(err);
    res.status(500).json({ error: 'Ошибка при загрузке арта' });
  }
};

// GET /api/arts/me/posts
exports.getMyPosts = async (req, res) => {
  try {
    const posts = await getMyPosts(req.user.id);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Не удалось получить ваши работы' });
  }
};

// GET /api/arts/user/:id/posts
exports.getUserArtworksByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) return res.status(400).json({ error: 'Некорректный ID пользователя' });
    const posts = await getPostsByUser(userId);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Не удалось получить работы пользователя' });
  }
};

// GET /api/arts/:id
exports.getArtById = async (req, res) => {
  try {
    const postId = parseInt(req.params.id, 10);
    if (isNaN(postId)) return res.status(400).json({ error: 'Некорректный ID арта' });

    const post = await getPostById(postId);
    if (!post) return res.status(404).json({ error: 'Арт не найден' });

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Не удалось получить арт' });
  }
};
