const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-strong-secret-key';

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token') || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Доступ запрещен. Токен не предоставлен.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Неверный или просроченный токен' });
  }
};