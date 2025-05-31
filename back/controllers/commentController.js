const { getCommentsByPostId, createComment } = require('../models/commentModel');

exports.getComments = async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  if (isNaN(postId)) return res.status(400).json({ error: 'Некорректный ID поста' });
  try {
    const comments = await getCommentsByPostId(postId);
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении комментариев' });
  }
};

exports.addComment = async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const userId = req.user.id;
  const { content } = req.body;

  if (isNaN(postId)) return res.status(400).json({ error: 'Некорректный ID поста' });
  if (!content || content.length > 250) {
    return res.status(400).json({ error: 'Комментарий должен быть от 1 до 250 символов' });
  }

  try {
    const comment = await createComment({ postId, userId, content });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при добавлении комментария' });
  }
};
