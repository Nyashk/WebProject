import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import SidebarMenu from './SidebarMenu';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate('/login');
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
        {isAuthenticated ? (
          <button onClick={handleLogout} className="header-link">
            Logout
          </button>
        ) : (
          <>
            <Link to="/register" className="header-link">Sign Up</Link>
            <Link to="/login" className="sign-in-link">Sign In</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
