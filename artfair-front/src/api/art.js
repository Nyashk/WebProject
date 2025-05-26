import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/arts',
});

// Добавляем токен в заголовок Authorization: Bearer <token>
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers['Authorization'] = `Bearer ${token}`;
  return cfg;
});

/**
 * Загрузить арт
 * @param {File} file — изображение
 * @param {string} title — заголовок
 * @param {string} description — описание
 * @returns {Promise<Object>} — новый пост с { id, userId, username, imageUrl, ... }
 */
export const uploadArt = (file, title, description) => {
  const fd = new FormData();
  fd.append('art', file);
  if (title) fd.append('title', title);
  if (description) fd.append('description', description);
  return API.post('/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data);
};
