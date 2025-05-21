const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/logout', authMiddleware, authController.logout);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/check-auth', authMiddleware, authController.checkAuth);

module.exports = router;