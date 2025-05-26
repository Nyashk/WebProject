const db = require('../config/db');
const { getPostsByUser } = require('../models/postModel');

// Загрузка аватара
exports.uploadAvatar = async (req, res) => {
  const avatarUrl = `/uploads/avatars/${req.file.filename}`;
  await db.query('UPDATE users SET avatar_url = ? WHERE id = ?', [avatarUrl, req.user.id]);
  res.json({ message: 'Аватар обновлён', avatarUrl });
};

// Загрузка фонового изображения
exports.uploadBackground = async (req, res) => {
  const backgroundUrl = `/uploads/backgrounds/${req.file.filename}`;
  await db.query('UPDATE users SET background_url = ? WHERE id = ?', [backgroundUrl, req.user.id]);
  res.json({ message: 'Фон обновлён', backgroundUrl });
};

// Получить арты текущего пользователя
exports.getUserArtworks = async (req, res) => {
  try {
    const posts = await getPostsByUser(req.user.id);
    res.json(posts);
  } catch (err) {
    console.error('Ошибка при получении артов:', err);
    res.status(500).json({ error: 'Не удалось загрузить работы пользователя' });
  }
};
