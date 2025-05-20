import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';

const RegisterForm = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify({
        username: form.username,
        email: form.email,
      }));
      setMessage(res.data.message);
      navigate('/main');  // Переходим на главную страницу
    } catch (err) {
      setMessage(err.response?.data?.error || 'Ошибка при регистрации');
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Регистрация</h2>

        <div className="input-field">
          <input
            name="username"
            type="text"
            placeholder=" "
            value={form.username}
            onChange={handleChange}
            required
          />
          <label>Username</label>
        </div>

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

        <button type="submit">Register</button>
        {message && <p className="form-message">{message}</p>}

        <p className="register-link">
          Уже есть аккаунт? <Link to="/login">Логин</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
