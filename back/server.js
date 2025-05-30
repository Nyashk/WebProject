const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Статика для загруженных файлов
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Роуты
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/arts', require('./routes/artRoutes'));
app.use('/api/likes', require('./routes/likeRoutes')); // новый роут лайков

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
