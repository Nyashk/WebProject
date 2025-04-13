const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /регистрация пользователя
router.post('/register', authController.register);


module.exports = router;
