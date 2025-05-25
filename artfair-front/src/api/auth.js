import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
});

// Прописываем токен как Authorization: Bearer <token>
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Отслеживаем вход/регистрацию/выход
API.interceptors.response.use(response => {
  if (
    response.config.url.includes('/login') ||
    response.config.url.includes('/register') ||
    response.config.url.includes('/logout')
  ) {
    window.dispatchEvent(new Event('authChange'));
  }
  return response;
}, error => Promise.reject(error));

// Методы
export const registerUser = (userData) => API.post('/register', userData);
export const loginUser    = (userData) => API.post('/login', userData);
export const logoutUser   = ()        => API.post('/logout');
export const checkAuth    = ()        => API.get('/check-auth');

// Отдельные POST запросы, требующие auth
export const uploadAvatar = (formData) => axios.post('/api/users/avatar', formData, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
export const uploadBackground = (formData) => axios.post('/api/users/background', formData, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
