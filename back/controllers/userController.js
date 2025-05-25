const db = require('../config/db');

exports.uploadAvatar = async (req, res) => {
  const avatarUrl = `/uploads/${req.file.filename}`;
  await db.query('UPDATE users SET avatarUrl = ? WHERE id = ?', [avatarUrl, req.user.id]);
  res.json({ message: 'Аватар обновлён', avatarUrl });
};

exports.uploadBackground = async (req, res) => {
  const backgroundUrl = `/uploads/${req.file.filename}`;
  await db.query('UPDATE users SET backgroundUrl = ? WHERE id = ?', [backgroundUrl, req.user.id]);
  res.json({ message: 'Фон обновлён', backgroundUrl });
};
