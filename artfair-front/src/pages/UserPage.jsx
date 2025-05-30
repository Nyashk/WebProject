import React, { useEffect, useState, useCallback } from 'react';
import '../components/UserPage.css';
import defaultAvatar from '../assets/images/user-avatar.png';
import { useNavigate, useParams } from 'react-router-dom';
import { checkAuth, uploadAvatar } from '../api/auth';
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
      const userData = {
        ...res.data.user,
        birthdate: res.data.user.birthdate || null,
        bio: res.data.user.bio || '',
        createdAt: res.data.user.createdAt || res.data.user.registeredAt || null,
      };
      setUser(userData);
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

  if (!user && !id) return <div className="loading">Loading...</div>;

  const handleFilterClick = (filter) => setActiveFilter(filter);
  const openArt = (artId) => navigate(`/art/${artId}`);

  const filtered = activeFilter === 'all'
    ? artworks
    : artworks.filter(a => a.title?.toLowerCase().includes(activeFilter));

  const formatDate = (dateString) => {
    if (!dateString) return 'not specified';
    const date = new Date(dateString);
    if (isNaN(date)) return 'not specified';
    return date.toLocaleDateString();
  };

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
                <span>Posts: {artworks.length}</span>
                <span>Followers: {user.followersCount || 0}</span>
                <span>Following: {user.followingCount || 0}</span>
              </div>
            </div>
          </div>

          <hr className="divider" />
        </div>
      )}

      <div className="content-row">
        <div className="left-column">
          <div className="artworks-section">
            <div className="header filters-left">
              <div className="filters">
                {['all', 'popular', 'articles'].map(f => (
                  <button
                    key={f}
                    className={`filter-button ${activeFilter === f ? 'active' : ''}`}
                    onClick={() => handleFilterClick(f)}
                  >
                    {f === 'all' ? 'All artworks' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="artwork-grid">
              {filtered.length === 0 ? (
                <div className="no-artworks-message">
                  This user hasn't uploaded anything yet.
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
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <aside className="author-column">
          <h3>About the author</h3>
          {user ? (
            <>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Birthdate:</b> {formatDate(user.birthdate)}</p>
              <p><b>Biography:</b> {user.bio || 'not specified'}</p>
              <p><b>Registration Date:</b> {formatDate(user.createdAt)}</p>
            </>
          ) : (
            <p>Loading author info...</p>
          )}
        </aside>
      </div>
    </div>
  );
};

export default UserPage;
