import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
});

// Добавляем токен в заголовки
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Добавляем обработчик для обновления UI после авторизации
API.interceptors.response.use(response => {
  if (response.config.url.includes('/login') || response.config.url.includes('/register')) {
    window.dispatchEvent(new Event('authChange'));
  }
  return response;
}, error => {
  return Promise.reject(error);
});

export const registerUser = (userData) => API.post('/register', userData);
export const loginUser = (userData) => API.post('/login', userData);
export const checkAuth = () => API.get('/check-auth');
export const logoutUser = async () => {
  try {
    await API.post('/logout'); // Если есть endpoint для выхода на сервере
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    window.dispatchEvent(new Event('authChange'));
  }
};