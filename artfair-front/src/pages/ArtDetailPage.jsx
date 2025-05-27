import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaStar } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import '../components/ArtDetailPage.css';

const API_URL = 'http://localhost:5000';

const ArtDetailPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const maxCommentLength = 250;

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/arts/${id}`);
        setArtwork(res.data);
        setError(null);
      } catch (err) {
        setError('Artwork not found');
        setArtwork(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  const handleSendComment = () => {
    if (comment.trim()) {
      console.log("Отправка комментария:", comment);
      setComment('');
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
            src={artwork.imageUrl.startsWith('/uploads') ? `${API_URL}${artwork.imageUrl}` : artwork.imageUrl}
            alt={artwork.title}
            className="art-image"
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
            <div className="likes">
              <FaHeart className="icon" /> {artwork.likes || 0}
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
