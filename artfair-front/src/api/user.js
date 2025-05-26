import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

// Добавляем в каждый запрос заголовок Authorization: Bearer <token>
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) {
    cfg.headers['Authorization'] = `Bearer ${token}`;
  }
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

// Получить арты текущего пользователя
export const fetchCurrentUserArtworks = () => {
  return API.get('/me/posts').then(res => res.data);
};

// Получить арты любого пользователя по id
export const fetchUserArtworksById = (userId) => {
  return API.get(`/${userId}/posts`).then(res => res.data);
};
