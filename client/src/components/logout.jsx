// src/components/Logout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Link to="/login" onClick={handleLogout} className="text-blue-500 hover:underline">
      Logout
    </Link>
  );
};

export default Logout;
