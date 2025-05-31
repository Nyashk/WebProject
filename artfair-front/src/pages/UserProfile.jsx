import React, { useEffect, useState } from 'react';
import '../components/UserProfile.css';
import defaultAvatar from '../assets/images/user-avatar.png';
import { useNavigate } from 'react-router-dom';

const getCurrentUser = () => 'ArtistName';

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
    
    setUser({
      username: userId,
      avatarUrl: defaultAvatar,
      backgroundUrl: '', 
      postsCount: 20,
      followersCount: 50,
      followingCount: 10,
    });
  }, [userId, navigate]);

  if (!user) return <div className="loading">Загрузка...</div>;

  const handleSubscribe = () => setIsSubscribed(!isSubscribed);
  const openArt = id => navigate(`/art/${id}`);

  return (
    <div className="user-profile-page">
      <div
        className="profile-header large"
        style={ user.backgroundUrl ? { backgroundImage: `url(${user.backgroundUrl})` } : undefined }
      >
        <img
          src={user.avatarUrl}
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-info-row">
          <div className="profile-info">
            <h2>{user.username}</h2>
            <div className="stats">
              <span>{user.postsCount} publications</span>
              <span>{user.followersCount} subscribers</span>
              <span>{user.followingCount} subscriptions</span>
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

      <div className="artworks-section">
        <div className="filters">
          {['all','popular','articles'].map(f => (
            <button
              key={f}
              className={`filter-button ${activeFilter===f?'active':''}`}
              onClick={()=>setActiveFilter(f)}
            >
              {f==='all'?'All works':f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>

        <div className="artwork-grid">
          {[1,2,3].map(id=>(
            <div
              key={id}
              className="artwork-item"
              onClick={()=>openArt(id)}
            >
              <img
                src={`https://picsum.photos/id/${id+30}/400/300`}
                alt={`Artwork ${id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
