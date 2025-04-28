import React, { useState } from 'react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <form className="register-form">
        <div className="input-field">
          <input type="text" required placeholder=" " />
          <label>Username</label>
        </div>
        <div className="input-field">
          <input type="email" required placeholder=" " />
          <label>Email</label>
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
        <button type="submit">Register</button>
        <p className="login-link">
          Already have an account? <a href="/">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
