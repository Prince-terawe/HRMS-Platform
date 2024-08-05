import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MyProfile = () => {
  // const { id } = useParams();

  // console.log({"id is":id})
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [manager, setManager] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/userProfile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user profile");
        }
        console.log("Fetched user data:", data);
        setUser(data);

        if (data.manager) {
          fetchManager(data.manager);
        } else {
          setManager("N/A");
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
        console.log("Fetched manager name:", data);
        setManager(`${data.profile.firstName} ${data.profile.lastName}`);
      } catch (err) {
        console.error("Error fetching manager name:", err);
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  console.log("User object:", user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 transform transition duration-500 hover:scale-105">
        <div className="flex items-center mb-6">
          <img
            src={user.profile.profileImage || "/default-profile.png"}
            alt={`${user.profile.firstName || ""} ${user.profile.lastName || ""}`}
            className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md mr-4"
          />
          <div>
            <h2 className="text-3xl font-bold text-indigo-700">
              {user.profile.firstName} {user.profile.lastName}
            </h2>
            <p className="text-gray-600">{user.position}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-600">Personal Information</h3>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Email:</span> {user.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Phone Number:</span> {user.profile.phoneNumber}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Date of Birth:</span> {new Date(user.profile.dateOfBirth).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Address:</span> {user.profile.address}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-600">Professional Information</h3>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Employee ID:</span> {user.empId}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Department:</span> {user.department}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Role:</span> {user.role}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Hire Date:</span> {new Date(user.hireDate).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Manager:</span> {manager}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-indigo-600">Leave Balance</h3>
          <div className="grid grid-cols-2 gap-4">
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Casual Leave:</span> {user.leaveBalance.casualLeave}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Sick Leave:</span> {user.leaveBalance.sickLeave}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Paid Leave:</span> {user.leaveBalance.paidLeave}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-700">Work From Home:</span> {user.leaveBalance.workFromHome}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-indigo-600">Team/Projects</h3>
          <ul className="list-disc list-inside text-gray-700">
            {user.teamProject.map((project, index) => (
              <li key={index}>
              <Link
                to={`/teamDetails/${project}`}
                className="text-indigo-500 hover:underline"
              >
                {project}
              </Link>
            </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <Link
            to="/apply-leave"
            className="inline-block bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Apply for Leave
          </Link>
        </div>
        <div className="mt-6">
          <Link
            to={`/leaveList/${user._id}`}
            className="inline-block bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Leave List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
