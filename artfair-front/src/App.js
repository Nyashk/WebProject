import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/LoginForm';
import Register from './pages/RegisterForm';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import './styles.css';

const AppContent = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <>
      {showHeader && <Header />}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} /> {/* Редирект на главную */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* 404 страница */}
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
