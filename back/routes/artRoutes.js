const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');
const artController = require('../controllers/artController');

// Загрузить арт (file field name = 'art')
router.post(
  '/upload',
  authMiddleware,
  upload.single('art'),
  artController.uploadArt
);

// Получить арты пользователя по id
router.get(
  '/user/:id/posts',
  artController.getUserArtworksByUserId
);

module.exports = router;
