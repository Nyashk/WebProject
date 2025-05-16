import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="form-container">
      <form className="login-form">
        <h2>Логин</h2>
        <div className="input-field">
          <input type="text" name="username" required placeholder=" " />
          <label>Username</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            name="password"
            required
            placeholder=" "
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
