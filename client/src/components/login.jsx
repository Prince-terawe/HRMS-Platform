import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
 
      const data = await response.json();
 
      if (!response.ok) {
        throw new Error(data.error || 'Invalid email or password');
      }
 
      const { token, msg } = data;
      console.log(msg); // Display the message
 
      // Save the token in localStorage or a context provider for future requests
      localStorage.setItem('token', token);
 
      // Optionally, redirect to a protected route
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid email or password');
    }
  };
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      </div>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Login
      </button>
      <Link to="/forgot-password" className="text-blue-500 hover:underline">
        Forgot Password / Reset Password
      </Link>
    </div>
  );
};
 
export default Login;
 