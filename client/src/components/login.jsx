// src/components/Login.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login', { email, password });
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <div className="inputContainer">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
      </div>
      <div className="inputContainer">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
      </div>
      <button onClick={handleLogin} className="button">
        Login
      </button>
      <Link to="/forgot-password" className="linkButton">
        Forgot Password / Reset Password
      </Link>
    </div>
  );
};

export default Login;
