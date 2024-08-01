import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home.jsx';
import AddUserToTeam from './components/AddEmployeeToTeam.jsx';
import ForgotPassword from './components/forgot';
import Login from './components/login';
import AddUser from './components/AddUser.jsx';
import ResetPassword from './components/resetpassword';
import UpdateUser from './components/updateEmployeeData.jsx';
import UserDetails from './components/UserDetails.jsx';
import AllUsers from './components/AllUsers.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} /> */}
          <Route path="/" element={ <Home /> } />
          <Route path="/add-user-to-team" element={isAuthenticated ? <AddUserToTeam /> : <Navigate to="/login" />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/addUser" element={<AddUser/>} />
          <Route path="/updateEmployee/:id" element={<UpdateUser/>} />
          <Route path="/userDetails/:id" element={<UserDetails />} /> 
          <Route path="/allUsers" element={<AllUsers />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
