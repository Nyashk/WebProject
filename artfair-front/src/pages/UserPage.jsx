import React, { useEffect, useState } from 'react';
import '../components/UserPage.css';
import defaultAvatar from '../assets/images/user-avatar.png';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

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

  const goToGallery = () => {
    navigate('/gallery');
  };

  return (
    <div className="user-page" style={{ backgroundColor: '#10101a', minHeight: '100vh', color: 'white' }}>
      <div className="profile-section">
        <div className="profile-header large">
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
        <hr className="divider" />

        <div className="artwork-grid">
          {[1, 2, 3].map((id) => (
            <div key={id} className="artwork-item">
              <img src={`https://picsum.photos/id/${id + 20}/400/300`} alt={`Artwork ${id}`} />
            </div>
          ))}
        </div>

        <div className="gallery-button-wrapper">
          <button className="go-gallery-button" onClick={goToGallery}>
            Перейти в галерею
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
