import React, { useEffect, useState } from 'react';
import '../components/UserPage.css';
import defaultAvatar from '../assets/images/user-avatar.png';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const userData = {
      username: "ArtistName",
      posts: 34,
      followers: 120,
      following: 58,
    };
    setUser(userData);
  }, []);

  if (!user) {
    return <div className="loading">Загрузка...</div>;
  }

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="user-page">
      <div className="profile-section">
        <div className="profile-header">
          <img 
            src={defaultAvatar} 
            alt="User Avatar" 
            className="profile-avatar"
          />
          <div className="profile-info">
            <h2>{user.username}</h2>
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
            <button 
              className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`} 
              onClick={() => handleFilterClick('all')}
            >
              Все работы
            </button>
            <button 
              className={`filter-button ${activeFilter === 'popular' ? 'active' : ''}`} 
              onClick={() => handleFilterClick('popular')}
            >
              Популярное
            </button>
            <button 
              className={`filter-button ${activeFilter === 'articles' ? 'active' : ''}`} 
              onClick={() => handleFilterClick('articles')}
            >
              Статьи
            </button>
          </div>
        </div>
        <div className="artwork-grid">
          <div className="artwork-item">Здесь будут работы художника...</div>
          <div className="artwork-item">Здесь будут работы художника...</div>
          <div className="artwork-item">Здесь будут работы художника...</div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
