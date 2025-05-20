import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';

const LoginForm = () => {
  const [form, setForm]     = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      // По ответу от бэка сохраняем состояние
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(res.data.user));
      setMessage(`Добро пожаловать, ${res.data.user.username}`);
      // Переходим в личный кабинет
      navigate('/me');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Ошибка при входе');
    }
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Логин</h2>

        <div className="input-field">
          <input
            name="email"
            type="email"
            placeholder=" "
            value={form.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-field">
          <input
            name="password"
            type="password"
            placeholder=" "
            value={form.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <button type="submit">Login</button>
        {message && <p className="form-message">{message}</p>}

        <p className="register-link">
          Нет аккаунта? <Link to="/register">Регистрация</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;