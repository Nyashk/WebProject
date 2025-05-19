import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import SidebarMenu from './SidebarMenu';

const Header = () => {
  const location = useLocation();
  
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header className="header-container">
      <div className="left-section">
        <SidebarMenu />
        
        {/* Логотип как ссылка на /main */}
        <Link to="/main" className="logo">ArtFair</Link>

        <nav className="header-nav">
          <Link to="#">Shop</Link>
          <span className="divider">|</span>
          <Link to="#">Gallery</Link>
          <span className="divider">|</span>
          <Link to="#">Articles</Link>
        </nav>
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="right-section">
        <Link to="/register" className="header-link">Sign Up</Link>
        <Link to="/login" className="sign-in-link">Sign In</Link>
      </div>
    </header>
  );
};

export default Header;
