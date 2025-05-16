import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginForm';
import Register from './pages/RegisterForm';
import Header from './components/Header';
import './styles.css'; // Чтобы точно стили применились

const App = () => {
  return (
    <div className="background">
      <Router>
        <Header />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
