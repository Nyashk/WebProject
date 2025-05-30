const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const likeController = require('../controllers/likeController');

router.post('/:postId/toggle', authMiddleware, likeController.toggleLike);

module.exports = router;
