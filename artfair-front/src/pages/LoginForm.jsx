import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Имитируем успешный вход
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify({ username, email: username + '@example.com' }));

    navigate('/user'); // Переходим на страницу пользователя
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Логин</h2>
        <div className="input-field">
          <input
            type="text"
            name="username"
            required
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            name="password"
            required
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <button type="submit">Login</button>
        <p className="register-link">
          Нет аккаунта? <Link to="/register">Регистрация</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
