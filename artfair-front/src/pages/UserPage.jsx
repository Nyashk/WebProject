import React, { useEffect, useState, useCallback } from 'react';
import '../components/UserPage.css';
import defaultAvatar from '../assets/images/user-avatar.png';
import { useNavigate } from 'react-router-dom';
import { checkAuth, uploadAvatar, uploadBackground } from '../api/auth';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    try {
      const res = await checkAuth();
      const u = res.data.user;
      setUser({
        username: u.username,
        email: u.email,
        avatarUrl: u.avatarUrl || defaultAvatar,
        backgroundUrl: u.backgroundUrl || '',
        posts: u.posts ?? 0,
        followers: u.followersCount ?? 0,
        following: u.followingCount ?? 0,
      });
    } catch (err) {
      console.error('Не удалось загрузить данные пользователя:', err);
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserData();
    window.addEventListener('authChange', fetchUserData);
    return () => window.removeEventListener('authChange', fetchUserData);
  }, [fetchUserData]);

  if (!user) return <div className="loading">Загрузка...</div>;

  const handleFilterClick = (filter) => setActiveFilter(filter);
  const openArt = (id) => navigate(`/art/${id}`);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      await uploadAvatar(formData);
      fetchUserData(); // обновить данные
    } catch (err) {
      console.error('Ошибка загрузки аватара:', err);
    }
  };

  const handleBackgroundChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('background', file);
    try {
      await uploadBackground(formData);
      fetchUserData();
    } catch (err) {
      console.error('Ошибка загрузки фона:', err);
    }
  };

  return (
    <div className="user-page" style={{ backgroundColor: '#10101a', minHeight: '100vh', color: 'white' }}>
      <div className="profile-section">
        <div
          className="profile-header large"
          style={user.backgroundUrl ? { backgroundImage: `url(${user.backgroundUrl})` } : {}}
        >
          <div className="avatar-wrapper">
            <img
              src={user.avatarUrl}
              alt="User Avatar"
              className="profile-avatar"
            />
            <label className="edit-avatar">
              📸
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </label>
          </div>

          <div className="profile-info">
            <h2>{user.username}</h2>
            <p className="email">{user.email}</p>
            <div className="stats">
              <span>{user.posts} Публикаций</span>
              <span>{user.followers} Подписчиков</span>
              <span>{user.following} Подписок</span>
            </div>
            <label className="edit-background">
              🖼️ Сменить фон
              <input type="file" accept="image/*" onChange={handleBackgroundChange} />
            </label>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="artworks-section">
        <div className="header">
          <div className="filters">
            {['all', 'popular', 'articles'].map((filter) => (
              <button
                key={filter}
                className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter === 'all' ? 'All works' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <hr className="divider" />

        <div className="artwork-grid">
          {[1, 2, 3].map((id) => (
            <div key={id} className="artwork-item" onClick={() => openArt(id)} style={{ cursor: 'pointer' }}>
              <img src={`https://picsum.photos/id/${id + 20}/400/300`} alt={`Artwork ${id}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
