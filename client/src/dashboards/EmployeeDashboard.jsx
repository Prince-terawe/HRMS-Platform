import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaUser, FaUsers, FaHistory, FaPlus } from 'react-icons/fa';

const EmployeeDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [manager, setManager] = useState("");
  const location = useLocation();
  const paths = location.pathname.replace('/employee-dashboard', '').split("/").filter(Boolean);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/userProfile",
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user profile");
        }
        setUser(data);

        if (data.manager) {
          fetchManager(data.manager);
        } else {
          setManager(null);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.message);
      }
    };

    const fetchManager = async (managerId) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/getUserById/${managerId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch manager name");
        }
        setManager(`${data.profile.firstName} ${data.profile.lastName}`);
      } catch (err) {
        console.error("Error fetching manager name:", err);
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!user) {
    return <div className="text-center text-gray-500 mt-4">Loading...</div>;
  }

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white flex flex-col items-center py-6">
        <img
          src={user.profile.profileImage || "/default-profile.png"}
          alt={`${user.profile.firstName || ""} ${user.profile.lastName || ""}`}
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold">
          {user.profile.firstName} {user.profile.lastName}
        </h2>
        <p className="text-gray-400 mb-6">{user.position}</p>
        <nav className="w-full">
          <ul className="flex flex-col items-center">
            <li className="w-full mb-2">
              <Link
                to="employee-profile"
                className={`flex items-center px-4 py-2 w-full hover:bg-gray-700 ${isActive('employee-profile') ? 'bg-gray-700' : ''}`}
              >
                <FaUser className="mr-2" />
                User Details
              </Link>
            </li>
            <li className="w-full mb-2">
              <Link
                to="team-projects"
                className={`flex items-center px-4 py-2 w-full hover:bg-gray-700 ${isActive('team-projects') ? 'bg-gray-700' : ''}`}
              >
                <FaUsers className="mr-2" />
                Teams/Projects
              </Link>
            </li>
            <li className="w-full mb-2">
              <Link
                to={`leaveList/${user._id}`}
                className={`flex items-center px-4 py-2 w-full hover:bg-gray-700 ${isActive('leaveList') ? 'bg-gray-700' : ''}`}
              >
                <FaHistory className="mr-2" />
                Leave History
              </Link>
            </li>
            <li className="w-full mb-2">
              <Link
                to="apply-leave"
                className={`flex items-center px-4 py-2 w-full hover:bg-gray-700 ${isActive('apply-leave') ? 'bg-gray-700' : ''}`}
              >
                <FaPlus className="mr-2" />
                Apply for Leave
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div className="w-3/4 bg-gray-100 p-6">
        {/* Navbar */}
        <nav className="bg-white p-4 mb-6 shadow">
          <ul className="flex space-x-2 text-gray-600">
            {paths.map((path, index) => (
              <li key={index} className="flex items-center">
                {index !== 0 && <span className="mx-2">/</span>}
                <span className="capitalize">{path.replace("-", " ")}</span>
              </li>
            ))}
          </ul>
        </nav>
        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
