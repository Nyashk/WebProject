import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>ArtFair</h1>
    <nav>
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  </header>
);

export default Header;
