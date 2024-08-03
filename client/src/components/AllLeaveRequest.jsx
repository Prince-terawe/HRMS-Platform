import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllLeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');
  // eslint-disable-next-line
  const [role, setRole] = useState('');
  // eslint-disable-next-line
  const [userId, setUserId] = useState('');
  // eslint-disable-next-line
  const [user, setUser]= useState([]);

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
      case 'Approved':
        return 'text-green-500';
      case 'Pending':
        return 'text-orange-500';
      case 'Rejected':
        return 'text-red-500';
      default:
        return '';
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">All Leave Requests</h2>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Employee ID</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Leave Type</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Number of Days</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Start Date</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">End Date</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Reason</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {leaves.map((leave) => (
                <tr key={leave._id} className="bg-gray-200">
                  <td className="py-3 px-4">
                    <Link to={`/userDetails/${leave.connectionId}`} className="text-blue-500 hover:underline">
                      {leave.empId}
                    </Link>
                  </td>
                  <td className="py-3 px-4">{leave.leaveType}</td>
                  <td className="py-3 px-4">{leave.numberOfDays}</td>
                  <td className="py-3 px-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{leave.reason}</td>
                  <td className={`py-3 px-4 ${getLeaveStatusClass(leave.status)}`}>{leave.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllLeaveRequests;
