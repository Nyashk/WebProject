const {
  getLikesCount,
  hasUserLikedPost,
  likePost,
  unlikePost
} = require('../models/postModel');

exports.toggleLike = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId, 10);
    const userId = req.user.id;

    if (isNaN(postId)) return res.status(400).json({ error: 'Invalid post ID' });

    const liked = await hasUserLikedPost(postId, userId);

    if (liked) {
      await unlikePost(postId, userId);
    } else {
      await likePost(postId, userId);
    }

    const likesCount = await getLikesCount(postId);

    res.json({ liked: !liked, likesCount });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при обновлении лайка' });
  }
};
