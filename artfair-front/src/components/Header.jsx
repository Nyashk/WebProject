import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import SidebarMenu from './SidebarMenu';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialQuery = () => {
    const params = new URLSearchParams(location.search);
    return location.pathname === '/search' ? params.get('q') || '' : '';
  };

  const [searchTerm, setSearchTerm] = useState(getInitialQuery());

  // Очистка строки поиска при переходе на другие страницы, кроме /search
  useEffect(() => {
    if (location.pathname !== '/search') {
      setSearchTerm('');
    } else {
      const params = new URLSearchParams(location.search);
      setSearchTerm(params.get('q') || '');
    }
  }, [location]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
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
          <span className="divider">|</span>
          <Link to="/gallery">Gallery</Link> {/* <-- Переход на страницу галереи */}
          <span className="divider">|</span>
          <Link to="#">Articles</Link>
        </nav>
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>

      <div className="right-section">
        <Link to="/register" className="header-link">Sign Up</Link>
        <Link to="/login" className="sign-in-link">Sign In</Link>
      </div>
    </header>
  );
};

export default Header;
