import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Имитируем успешную регистрацию
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify({ username, email }));

    navigate('/user'); // Переходим на страницу пользователя
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Регистрация</h2>

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
            type="email"
            name="email"
            required
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
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

        <button type="submit">Register</button>

        <p className="register-link">
          Уже есть аккаунт? <Link to="/login">Логин</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
