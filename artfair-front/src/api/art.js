import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/arts',
});

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers['x-auth-token'] = token;
  return cfg;
});

export const uploadArt = (file, title, description) => {
  const fd = new FormData();
  fd.append('art', file);
  if (title) fd.append('title', title);
  if (description) fd.append('description', description);
  return API.post('/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data);
};
