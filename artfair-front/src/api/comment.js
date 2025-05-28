import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/comments',
});

// Получить комментарии по ID поста
export const fetchComments = (postId) =>
  API.get(`/${postId}`).then(res => res.data);

// Добавить комментарий (требуется авторизация)
export const postComment = (postId, content) => {
  const token = localStorage.getItem('token');
  return API.post(
    `/${postId}`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(res => res.data);
};
