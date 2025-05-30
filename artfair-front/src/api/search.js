import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/search',
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export const searchAll = (query) => {
  return API.get('/', { params: { q: query } }).then(res => res.data);
};
