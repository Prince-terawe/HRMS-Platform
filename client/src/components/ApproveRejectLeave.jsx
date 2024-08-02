import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ApproveRejectLeave = () => {
  const { leaveId } = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch leave details from the backend
    const fetchLeaveDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/leaveApi/leaves/${leaveId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch leave details');
        }
        console.log(data);
        setLeave(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLeaveDetails();
  }, [leaveId]);

  const handleApprove = async () => {
    try {
      const response = await fetch(`http://localhost:5000/leaveApi/leaves/approve/${leaveId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to approve leave request');
      }
      setMessage('Leave approved successfully');
      navigate('/'); // Redirect to another page if needed
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(`http://localhost:5000/leaveApi/leaves/reject/${leaveId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to reject leave request');
      }
      setMessage('Leave rejected successfully');
      navigate('/'); // Redirect to another page if needed
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!leave) {
    return <div>Leave Request not Found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">Leave Request Details</h2>
      <div className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Leave Type:</label>
          <p>{leave.leaveType}</p>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Number of Days:</label>
          <p>{leave.numberOfDays}</p>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Start Date:</label>
          <p>{new Date(leave.startDate).toLocaleDateString()}</p>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">End Date:</label>
          <p>{new Date(leave.endDate).toLocaleDateString()}</p>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Reason:</label>
          <p>{leave.reason}</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleApprove}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Approve
          </button>
          <button
            onClick={handleReject}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </div>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default ApproveRejectLeave;
