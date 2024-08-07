import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AllLeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile from the backend
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/userProfile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch user profile');
        }

        setRole(data.role);
        setUser(data);
        setUserId(data.empId); // Assuming the user ID is stored in `_id`
      } catch (err) {
        setError(err.message);
      }
    };

    // Fetch all leave requests from the backend
    const fetchLeaves = async () => {
      try {
        const response = await fetch('http://localhost:5000/leaveApi/leaves', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.noLeaveRequestFound || 'Failed to fetch leave requests');
        }

        setLeaves(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
    fetchLeaves();
  }, []);

  const getLeaveStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-500';
      case 'pending':
        return 'text-orange-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return '';
    }
  };

  const handleCardClick = (leaveId) => {
    navigate(`/leaveDetails/${leaveId}`);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (leaves.length === 0) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">All Leave Requests</h2>
      <div className="grid grid-cols-1 gap-4">
        {leaves.map((leave) => (
          <div
            key={leave._id}
            className="border p-4 rounded shadow flex items-center cursor-pointer"
            onClick={() => handleCardClick(leave._id)}
          >
            <div className="flex-grow">
              <Link to={`/userDetails/${leave.connectionId}`} className="text-blue-500 hover:underline">
                <h3 className="text-xl font-bold">{leave.empId}</h3>
              </Link>
              <p>Leave Type: {leave.leaveType}</p>
              <p>Number of Days: {leave.numberOfDays}</p>
              <p>Start Date: {new Date(leave.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(leave.endDate).toLocaleDateString()}</p>
              <p>Reason: {leave.reason}</p>
              <p className={`font-semibold ${getLeaveStatusClass(leave.status)}`}>Status: {leave.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLeaveRequests;
