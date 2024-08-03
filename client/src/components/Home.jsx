// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './logout';

const Home = () => {
  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">HRMS Platform</h1>
      <nav className="flex flex-col space-y-4">
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
        <Link to="/addUser" className="text-blue-500 hover:underline">
          Add User
        </Link>
        <Link to="/updateEmployee/:id" className="text-blue-500 hover:underline">
          Update Details
        </Link>
        <Link to="/userDetails/:id" className="text-blue-500 hover:underline">
          Get Employee By Id
        </Link>
        <Link to="/allUsers" className="text-blue-500 hover:underline">
          All Users
        </Link>
        <Logout />
      </nav>
    </div>
  );
};

export default Home;
