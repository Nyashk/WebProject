import React, { useEffect, useState, useCallback } from 'react';
import '../components/UserPage.css';
import defaultAvatar from '../assets/images/user-avatar.png';
import { useNavigate, useParams } from 'react-router-dom';
import { checkAuth, uploadAvatar, uploadBackground } from '../api/auth';
import { fetchCurrentUserArtworks, fetchUserArtworksById } from '../api/user';

const API_URL = 'http://localhost:5000';

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    try {
      const res = await checkAuth();
      setUser(res.data.user);
    } catch {
      if (!id) navigate('/login', { replace: true });
    }
  }, [navigate, id]);

  const loadArtworks = useCallback(async () => {
    let posts;
    if (!id) {
      posts = await fetchCurrentUserArtworks();
    } else {
      posts = await fetchUserArtworksById(id);
    }
    setArtworks(posts);
  }, [id]);

  useEffect(() => {
    fetchUserData();
    loadArtworks();
  }, [fetchUserData, loadArtworks]);

  if (!user && !id) return <div className="loading">Загрузка...</div>;

  const handleFilterClick = (filter) => setActiveFilter(filter);
  const openArt = (artId) => navigate(`/art/${artId}`);

  const filtered = activeFilter === 'all'
    ? artworks
    : artworks.filter(a => a.title?.toLowerCase().includes(activeFilter));

  return (
    <div className="user-page">
      {user && (
        <div className="profile-section">
          <div
            className="profile-header large"
            style={user.backgroundUrl ? { backgroundImage: `url(${user.backgroundUrl})` } : {}}
          >
            <div className="avatar-wrapper">
              <img
                src={user.avatarUrl || defaultAvatar}
                alt="Avatar"
                className="profile-avatar"
              />
              {id === undefined && (
                <label className="edit-avatar">
                  📸<input type="file" accept="image/*" onChange={async e => {
                    await uploadAvatar(e.target.files[0]);
                    fetchUserData();
                  }} />
                </label>
              )}
            </div>
            <div className="profile-info">
              <h2>{user.username}</h2>
              <p className="email">{user.email}</p>
              <div className="stats">
                <span>Постов: {artworks.length}</span>
                <span>Подписчики: {user.followers || 0}</span>
                <span>Подписки: {user.following || 0}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="artworks-section">
        <div className="header filters-left">
          <div className="filters">
            {['all', 'popular', 'articles'].map(f => (
              <button
                key={f}
                className={`filter-button ${activeFilter === f ? 'active' : ''}`}
                onClick={() => handleFilterClick(f)}
              >
                {f === 'all' ? 'Все работы' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="artwork-grid">
          {filtered.length === 0 ? (
            <div className="no-artworks-message">
              Пользователь ещё ничего не выкладывал
            </div>
          ) : (
            filtered.map(art => (
              <div
                key={art.id}
                className="artwork-item"
                onClick={() => openArt(art.id)}
              >
                <img
                  src={art.imageUrl.startsWith('/uploads')
                    ? `${API_URL}${art.imageUrl}`
                    : art.imageUrl}
                  alt={art.title || 'Artwork'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
