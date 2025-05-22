import React, { useEffect, useState, useCallback } from 'react';
import '../components/UserPage.css';
import defaultAvatar from '../assets/images/user-avatar.png';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../api/auth';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  // Стабильная функция для fetch-запроса
  const fetchUserData = useCallback(async () => {
    try {
      const res = await checkAuth();            // GET /api/auth/check
      const u = res.data.user;                  // { id, username, email, avatarUrl?, posts?, followersCount?, followingCount? }
      setUser({
        username: u.username,
        email: u.email,
        avatarUrl: u.avatarUrl || defaultAvatar,
        posts: u.posts ?? 0,
        followers: u.followersCount ?? 0,
        following: u.followingCount ?? 0,
      });
    } catch (err) {
      console.error('Не удалось загрузить данные пользователя:', err);
      // если токен недействителен — кидаем на логин
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserData();  // один раз при монтировании

    // при событиях логина/логаута (если настроен authChange)
    window.addEventListener('authChange', fetchUserData);
    return () => {
      window.removeEventListener('authChange', fetchUserData);
    };
  }, [fetchUserData]);

  if (!user) {
    return <div className="loading">Загрузка...</div>;
  }

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const openArt = (id) => {
    navigate(`/art/${id}`);
  };

  return (
    <div
      className="user-page"
      style={{ backgroundColor: '#10101a', minHeight: '100vh', color: 'white' }}
    >
      <div className="profile-section">
        <div className="profile-header large">
          <img
            src={user.avatarUrl}
            alt="User Avatar"
            className="profile-avatar"
          />
          <div className="profile-info">
            <h2>{user.username}</h2>
            <p className="email">{user.email}</p>
            <div className="stats">
              <span>{user.posts} Публикаций</span>
              <span>{user.followers} Подписчиков</span>
              <span>{user.following} Подписок</span>
            </div>
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
          {/* TODO: заменить на реальный массив работ из API */}
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="artwork-item"
              onClick={() => openArt(id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={`https://picsum.photos/id/${id + 20}/400/300`}
                alt={`Artwork ${id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
