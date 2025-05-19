import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/LoginForm';
import Register from './pages/RegisterForm';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import GalleryPage from './pages/GalleryPage'; // <-- импортируем новую страницу
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import './styles.css';

const AppContent = () => {
  const location = useLocation();
  const showHeader = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/gallery" element={<GalleryPage />} /> {/* <-- Добавил роут */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <div className="background">
    <Router>
      <AppContent />
    </Router>
  </div>
);

export default App;
