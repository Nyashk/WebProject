import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="form-container">
      <form className="register-form">
        <h2>Регистрация</h2>
        <div className="input-field">
          <input type="text" name="username" required placeholder=" " />
          <label>Username</label>
        </div>
        <div className="input-field">
          <input type="email" name="email" required placeholder=" " />
          <label>Email</label>
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
        <button type="submit">Register</button>
        <p className="register-link">
          Уже есть аккаунт? <Link to="/">Логин</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
