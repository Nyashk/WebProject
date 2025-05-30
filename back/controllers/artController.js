const {
  getPostsByUser,
  getMyPosts,
  createPost,
  getPostById,
  getAllPosts
} = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
  try {
    const sortBy = req.query.sort === 'popular' ? 'popular' : 'created_at';
    const posts = await getAllPosts(sortBy);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Не удалось получить список артов' });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await getMyPosts(req.user.id);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Не удалось получить ваши арты' });
  }
};

exports.createPost = async (req, res) => {
  const { file } = req;
  const { title, description } = req.body;
  if (!file) {
    return res.status(400).json({ error: 'Файл изображения обязателен' });
  }

  try {
    const newPost = await createPost({
      userId: req.user.id,
      imageUrl: `/uploads/arts/${file.filename}`,
      title,
      description
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Не удалось создать арт' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Арт не найден' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении арта' });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await getPostsByUser(req.params.userId);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Не удалось получить арты пользователя' });
  }
};
