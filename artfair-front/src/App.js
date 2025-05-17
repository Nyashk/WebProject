import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginForm';
import Register from './pages/RegisterForm';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import './styles.css';

const App = () => {
  const showHeader = window.location.pathname !== '/login' && window.location.pathname !== '/register';

  return (
    <div className="background">
      <Router>
        {showHeader && <Header />}
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Navigate to="/main" />} /> {/* Редирект на главную */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
