import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
});

// В каждый запрос добавляем токен
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    // Сервер проверяет его в x-auth-token (или Authorization, см. middleware)
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Генерим событие, чтобы другие компоненты (UserPage) перезагружали данные
API.interceptors.response.use(response => {
  if (response.config.url.includes('/login') || response.config.url.includes('/register') || response.config.url.includes('/logout')) {
    window.dispatchEvent(new Event('authChange'));
  }
  return response;
}, error => {
  return Promise.reject(error);
});

export const registerUser = (userData) => API.post('/register', userData);
export const loginUser    = (userData) => API.post('/login', userData);
export const logoutUser   = ()        => API.post('/logout');
export const checkAuth    = ()        => API.get('/check-auth');
