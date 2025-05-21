import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
});

// Добавляем токен в заголовки каждого запроса
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const registerUser = (userData) => API.post('/register', userData);
export const loginUser = (userData) => API.post('/login', userData);
export const checkAuth = () => API.get('/check-auth');
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
};