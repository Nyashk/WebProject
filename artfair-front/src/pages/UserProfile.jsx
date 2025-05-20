import React, { useEffect, useState } from 'react'; 
import '../components/UserProfile.css';
import defaultAvatar from '../assets/images/user-avatar.png';
import { useNavigate } from 'react-router-dom';

const getCurrentUser = () => {
  return 'ArtistName'; // Заглушка: заменить на реальную авторизацию
};

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (userId === currentUser) {
      navigate('/me', { replace: true });
      return;
    }

    const fetchedUser = {
      username: userId,
      posts: 20,
      followers: 50,
      following: 10,
    };
    setUser(fetchedUser);
    setIsSubscribed(false);
  }, [userId, navigate]);

  if (!user) {
    return <div className="loading">Загрузка...</div>;
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const openArt = (id) => {
    navigate(`/art/${id}`);
  };

  return (
    <div className="user-profile" style={{ backgroundColor: '#10101a', minHeight: '100vh', color: 'white' }}>
      <div className="profile-section">
        <div className="profile-header large">
          <img src={defaultAvatar} alt="User Avatar" className="profile-avatar" />
          <div className="profile-info-row">
            <div className="profile-info">
              <h2>{user.username}</h2>
              <div className="stats">
                <span>{user.posts} publications</span>
                <span>{user.followers} subscribers</span>
                <span>{user.following} subscriptions</span>
              </div>
            </div>
            <button 
              className={`subscribe-button ${isSubscribed ? 'subscribed' : ''}`}
              onClick={handleSubscribe}
            >
              {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
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
              All works
            </button>
            <button 
              className={`filter-button ${activeFilter === 'popular' ? 'active' : ''}`} 
              onClick={() => handleFilterClick('popular')}
            >
              Popular
            </button>
            <button 
              className={`filter-button ${activeFilter === 'articles' ? 'active' : ''}`} 
              onClick={() => handleFilterClick('articles')}
            >
              Articles
            </button>
          </div>
        </div>
        <hr className="divider" />

        <div className="artwork-grid">
          {[1, 2, 3].map((id) => (
            <div key={id} className="artwork-item" onClick={() => openArt(id)}>
              <img src={`https://picsum.photos/id/${id + 30}/400/300`} alt={`Artwork ${id}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
