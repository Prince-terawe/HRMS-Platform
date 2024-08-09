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
      console.log(msg);

      // Save the token in localStorage or a context provider for future requests
      localStorage.setItem('token', token);
      // localStorage.setItem('role', role);

      // Optionally, redirect to a protected route
      navigate('/myProfile');
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 relative">
      {/* Branding at top-left corner */}
      <div className="absolute top-8 left-8 flex items-center">
        <img src="path/to/logo.png" alt="Terawe Logo" className="w-10 h-10 mr-3" />
        <h1 className="text-3xl font-bold text-white">Terawe</h1>
      </div>

      {/* Login form */}
      <div className="flex flex-col items-center w-full max-w-md p-8 space-y-6 rounded-lg ">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Track<span className="text-orange-500">r</span>
          </h2>
          <p className="mt-2 text-gray-400">Empowering Your Workforce, Simplifying Management</p>
        </div>
        <div className="w-full space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-400">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Enter your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button type="button" className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12m0 3a3 3 0 110-6 3 3 0 010 6zM2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <Link to="/forgot-password" className="text-sm text-orange-400 hover:text-orange-500">Forgot Password / Reset Password</Link>
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
