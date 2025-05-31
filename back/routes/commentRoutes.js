const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware   = require('../middleware/authMiddleware');

// GET  /api/comments/:postId    
router.get('/:postId', commentController.getComments);

// POST /api/comments/:postId    
router.post('/:postId', authMiddleware, commentController.addComment);

module.exports = router;
