import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">HRMS Platform</h1>
      <nav>
        <Link to="/add-user-to-team" className="text-blue-500 px-4 py-2">
          Add User to Team
        </Link>
        <Link to="/forgot-password" className="text-blue-500 px-4 py-2">
          Forgot Password
        </Link>
        <Link to="/login" className="text-blue-500 px-4 py-2">
          Login
        </Link>
        <Link to="/addUser" className="text-blue-500 px-4 py-2">
          Add User
        </Link>
      </nav>
    </div>
  );
};

export default Home;
