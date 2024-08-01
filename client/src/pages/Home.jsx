import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">HRMS Platform</h1>
      <nav>
        <Link to="/add-user-to-team" className="text-blue-500">
          Add User to Team
        </Link>
        <Link to="/forgot-password" className="text-blue-500">
          Forgot Password
        </Link>
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </nav>
    </div>
  );
};

export default Home;
