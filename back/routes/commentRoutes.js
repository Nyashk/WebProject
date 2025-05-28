const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware   = require('../middleware/authMiddleware');

// GET  /api/comments/:postId    — получить комментарии поста
router.get('/:postId', commentController.getComments);

// POST /api/comments/:postId    — добавить комментарий (только авторизованные)
router.post('/:postId', authMiddleware, commentController.addComment);

module.exports = router;
