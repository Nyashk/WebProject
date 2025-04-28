import React, { useState } from 'react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <form className="login-form">
        <div className="input-field">
          <input type="text" required placeholder=" " />
          <label>Username</label>
        </div>
        <div className="input-field">
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder=" "
          />
          <label>Password</label>
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit">Login</button>
        <p className="register-link">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
