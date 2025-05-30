import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import '../components/ArtDetailPage.css';
import { toggleLike } from '../api/art';

const API_URL = 'http://localhost:5000';

const ArtDetailPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);
  const imgRef = useRef(null);
  const maxCommentLength = 250;

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/arts/${id}`);
        setArtwork(res.data);
        setError(null);
        setLikesCount(res.data.likes || 0);
        setLiked(false); // Можно потом запросить, лайкал ли юзер (если есть API)
      } catch (err) {
        setError('Artwork not found');
        setArtwork(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  // Проверяем ориентацию изображения после загрузки
  const handleImageLoad = () => {
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      setIsPortrait(naturalHeight > naturalWidth);
    }
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      console.log("Отправка комментария:", comment);
      setComment('');
    }
  };

  const handleToggleLike = async () => {
    try {
      if (!artwork) return;
      const res = await toggleLike(artwork.id);
      setLiked(res.liked);
      setLikesCount(res.likesCount);
    } catch (err) {
      console.error('Ошибка при лайке', err);
    }
  };

  if (loading) return <div style={{ padding: "2rem" }}>Загрузка...</div>;
  if (error) return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;
  if (!artwork) return null;

  return (
    <div className="art-detail-page">
      <div className="art-container">
        <div className="art-left">
          <img
            ref={imgRef}
            src={artwork.imageUrl.startsWith('/uploads') ? `${API_URL}${artwork.imageUrl}` : artwork.imageUrl}
            alt={artwork.title}
            className={`art-image ${isPortrait ? 'portrait' : ''}`}
            onLoad={handleImageLoad}
          />
        </div>

        <div className="art-right">
          <div className="author-info">
            <img
              src={artwork.avatarUrl || '/default-avatar.png'}
              alt="avatar"
              className="author-avatar"
            />
            <p className="author">
              <Link to={`/user/${artwork.username}`}>{artwork.username}</Link>
            </p>
          </div>

          <hr className="info-divider" />

          <h1 className="title">{artwork.title}</h1>
          <p className="description">{artwork.description}</p>

          <div className="meta">
            <div className="likes" onClick={handleToggleLike} style={{ cursor: 'pointer', userSelect: 'none' }}>
              {liked ? <FaHeart className="icon liked" /> : <FaRegHeart className="icon" />} {likesCount}
            </div>
            <div className="rating">
              <FaStar className="icon" /> {artwork.rating || 0}
            </div>
          </div>

          <div className="comments-form">
            <textarea
              maxLength={maxCommentLength}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Оставьте комментарий..."
            />
            <button className="send-button" onClick={handleSendComment}>
              <FiSend />
            </button>
            <div className="char-counter">
              {comment.length} / {maxCommentLength}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtDetailPage;
