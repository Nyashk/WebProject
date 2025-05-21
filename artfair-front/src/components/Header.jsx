import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import SidebarMenu from './SidebarMenu';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { logoutUser } from '../api/auth';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(!!localStorage.getItem('token'));
    };
    
    checkAuth();
    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (['/login', '/register'].includes(location.pathname)) return null;

  return (
    <header className="header-container">
      <div className="left-section">
        <SidebarMenu />
        <Link to="/main" className="logo">ArtFair</Link>
        <nav className="header-nav">
          <Link to="#">Shop</Link>
          <Link to="#">Gallery</Link>
          <Link to="#">Articles</Link>
        </nav>
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="right-section">
        {isAuth ? (
          <div className="auth-links">
            <Link to="/notifications" className="notification-icon" title="Уведомления">
              <FaBell size={20} color="#fff" />
            </Link>
            <Link to="/me" className="user-profile" title="Профиль">
              <FaUserCircle size={22} color="#fff" />
            </Link>
            <button onClick={handleLogout} className="logout-button">
              Выйти
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/register" className="header-link">Sign Up</Link>
            <Link to="/login" className="sign-in-link">Sign In</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;