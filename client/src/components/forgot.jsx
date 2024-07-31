// src/components/ForgotPassword.jsx

import React, { useState } from 'react';
import '../style/forgot.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Implement forgot password logic here
    console.log('Forgot Password', { email });
  };

  return (
    <div className="forgotPasswordContainer">
      <h2>Forgot Password</h2>
      <div className="inputContainer">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
      </div>
      <button onClick={handleForgotPassword} className="button">
        Submit
      </button>
    </div>
  );
};

export default ForgotPassword;
