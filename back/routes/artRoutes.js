const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');
const artController = require('../controllers/artController');

// Загрузить арт (поле 'art')
router.post(
  '/upload',
  authMiddleware,
  upload.single('art'),
  artController.uploadArt
);

// Получить свои посты
router.get(
  '/me/posts',
  authMiddleware,
  artController.getMyPosts
);

// Получить посты любого пользователя
router.get(
  '/user/:id/posts',
  artController.getUserArtworksByUserId
);

// Получить один арт по ID
router.get(
  '/:id',
  artController.getArtById
);

module.exports = router;
