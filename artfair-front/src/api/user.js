import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

// добавляем токен автоматически
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers['x-auth-token'] = token;
  return cfg;
});

// Загрузить аватар
export const uploadAvatar = (file) => {
  const fd = new FormData();
  fd.append('avatar', file);
  return API.post('/avatar', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// Загрузить фон
export const uploadBackground = (file) => {
  const fd = new FormData();
  fd.append('background', file);
  return API.post('/background', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
