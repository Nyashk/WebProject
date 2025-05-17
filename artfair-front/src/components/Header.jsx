import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import SidebarMenu from './SidebarMenu'; // Добавил импорт всплывающего меню

const Header = () => {
  const location = useLocation();
  
  // Скрываем хедер на страницах регистрации и авторизации
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header className="header-container">
      <div className="left-section">
        <SidebarMenu /> {/* Добавил иконку для меню */}
        <h1 className="logo">ArtFair</h1>
        <nav className="header-nav">
          <Link to="#">Магазин</Link>
          <span className="divider">|</span>
          <Link to="#">Галерея</Link>
        </nav>
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Поиск..." />
      </div>

      <div className="right-section">
        <Link to="/login" className="header-link">Login</Link>
        <Link to="/register" className="header-link">Register</Link>
      </div>
    </header>
  );
};

export default Header;
