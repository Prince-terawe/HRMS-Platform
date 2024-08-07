import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import AddUserToTeam from "./components/AddEmployeeToTeam";
import ForgotPassword from "./components/forgot";
import Login from "./components/login";
import AddUser from "./components/AddUser";
import ResetPassword from "./components/resetpassword";
import ApplyLeave from "./components/ApplyLeave";
import UpdateUser from "./components/updateEmployeeData";
import UserDetails from "./components/UserDetails";
import AllUsers from "./components/AllUsers";
import ApproveRejectLeave from "./components/ApproveRejectLeave";
import AllLeaveRequests from "./components/AllLeaveRequest";
import MyProfile from "./components/MyProfile";
import TeamsDetails from "./components/TeamsDeatails";
import LeaveDetails from "./components/LeaveDetails";
import GetUserLeaveList from "./components/GetUserLeaveList";

import EmployeeDashboard from "./dashboards/EmployeeDashboard.jsx";
import AdminPanel from "./dashboards/AdminPanel .jsx";
import HRDashboard from "./dashboards/HRDashboard.jsx";
import ManageTeam from "./dashboards/ManageTeam.jsx";
import EmployeeProfile from "./components/EmployeeProfile.jsx"
import TeamDetails from "./components/TeamsDeatails.jsx";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    // console.log({"isAuthenticated user":isAuthenticated});
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/manage-team" element={<ManageTeam />} />
          <Route path="/leaveApproval/:leaveId" element={<ApproveRejectLeave />} />

          <Route path="/employee-dashboard/*" element={<EmployeeDashboard />}>
            <Route index element={<EmployeeProfile />} />
            <Route path="employee-profile" element={<EmployeeProfile />} />
            <Route path="employee-profile/team-detail/:id" element={<TeamDetails />} />
            <Route path="team-projects" element={<TeamsDetails />} />
            <Route path="leaveList/:id" element={<GetUserLeaveList />} />
            <Route path="apply-leave" element={<ApplyLeave />} />
            <Route path="leaveList/:id/leave-details/:id" element={<LeaveDetails />} />
            <Route path="employee-profile/team-detail/:id/leaveList/:id" element={<GetUserLeaveList />} />
          </Route>

          <Route path="/hr-dashboard/*" element={<HRDashboard />}>
            <Route index element={<AllUsers />} />
            <Route path="allUsers" element={<AllUsers />} />
            <Route path="allUsers/userDetails/:id" element={<UserDetails />} />
            <Route path="all-leave" element={<AllLeaveRequests />} />
            <Route path="updateEmployee/:id" element={<UpdateUser />} />
            <Route path="addUserToTeam/:id" element={<AddUserToTeam />} />
            <Route path="teamDetails/:id" element={<TeamsDetails />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
