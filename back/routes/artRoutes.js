const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');
const artController = require('../controllers/artController');

// Получить все арты (с сортировкой через query ?sort=popular)
router.get('/', artController.getAllPosts);

// Загрузить арт (поле 'art')
router.post('/upload', authMiddleware, upload.single('art'), artController.createPost);

// Получить свои посты
router.get('/me/posts', authMiddleware, artController.getMyPosts);

// Получить посты пользователя по ID
router.get('/user/:userId/posts', artController.getPostsByUser);

// Получить один арт по ID
router.get('/:id', artController.getPostById);

module.exports = router;
