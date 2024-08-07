// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './logout';

const Home = () => {
  const userId = localStorage.getItem('userId');
  // const teamProjectId = 'yourTeamProjectId';

  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">HRMS Platform</h1>
      <nav className="flex flex-col space-y-4">
      <Link to={`/myProfile`} className="text-blue-500 hover:underline">
          My Profile
        </Link>
        {/* <Link to="/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password
        </Link>
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link> */}
        <Link to="/addUser" className="text-blue-500 hover:underline">
          Add User
        </Link>
        <Link to="/allUsers" className="text-blue-500 hover:underline">
          All Users
        </Link>
        <Link to="/apply-leave" className="text-blue-500 hover:underline">
          Apply Leave
        </Link>
        <Link to="/all-leave/" className="text-blue-500 hover:underline">
          All Leave Request
        </Link>
        <Link to="/leave/:id" className="text-blue-500 hover:underline">
          Approve/Reject Leave
        </Link>
        <Logout />
      </nav>
    </div>
  );
};

export default Home;
