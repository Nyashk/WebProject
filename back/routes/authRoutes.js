const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /регистрация пользователя
router.post('/register', authController.register);
router.get('/verify', authController.verifyEmail);

module.exports = router;
