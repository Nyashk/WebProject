import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/LoginForm';
import Register from './pages/RegisterForm';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import ArtDetailPage from './pages/ArtDetailPage'; 
// ProtectedRoute временно не используем
import UserPage from './pages/UserPage';
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
          {/* Убираем защиту, просто показываем страницу пользователя */}
          <Route path="/user" element={<UserPage />} />
          <Route path="/art/:id" element={<ArtDetailPage />} />
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
