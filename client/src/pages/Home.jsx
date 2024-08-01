// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/logout';

const Home = () => {
  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">HRMS Platform</h1>
      <nav className="flex flex-col space-y-4">
        <Link to="/add-user-to-team" className="text-blue-500 hover:underline">
          Add User to Team
        </Link>
        <Link to="/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password
        </Link>
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
        <Logout />
      </nav>
    </div>
  );
};

export default Home;
