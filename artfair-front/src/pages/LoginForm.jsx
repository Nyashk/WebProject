import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';
import '../styles.css';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const res = await loginUser(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('currentUser', JSON.stringify(res.data.user));
      setMessage(`Добро пожаловать, ${res.data.user.username}`);
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="background"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Вход в систему</h2>
        
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

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Вход...' : 'Войти'}
        </button>

        {message && <p className="message">{message}</p>}

        <p className="register-link">
          Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;