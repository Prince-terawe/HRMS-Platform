import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplyLeave = () => {
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const handleApplyLeave = async () => {
    setEmptyFields([]);
    if (!leaveType || !startDate || !endDate || !reason) {
      const fields = [];
      if (!leaveType) fields.push('leaveType');
      if (!startDate) fields.push('startDate');
      if (!endDate) fields.push('endDate');
      if (!reason) fields.push('reason');
      setEmptyFields(fields);
      setMessage('Please fill all the required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/leaveApi/leaves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ leaveType, startDate, endDate, reason }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessage(data.msg);
      window.alert(data.msg); 
      navigate('/employee-dashboard/employee-profile');
    } catch (error) {
      setMessage(error.message);
      window.alert(error.message); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">Apply for Leave</h2>
      <div className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Leave Type:</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className={`w-full p-2 border ${emptyFields.includes('leaveType') ? 'border-red-500' : 'border-gray-300'} rounded mb-1`}
          >
            <option value="">Select Leave Type</option>
            <option value="sickLeave">Sick Leave</option>
            <option value="casualLeave">Casual Leave</option>
            <option value="paidLeave">Paid Leave</option>
            <option value="workFromHome">Work From Home</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`w-full p-2 border ${emptyFields.includes('startDate') ? 'border-red-500' : 'border-gray-300'} rounded mb-1`}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`w-full p-2 border ${emptyFields.includes('endDate') ? 'border-red-500' : 'border-gray-300'} rounded mb-1`}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Reason:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className={`w-full p-2 border ${emptyFields.includes('reason') ? 'border-red-500' : 'border-gray-300'} rounded mb-1`}
          />
        </div>
        <button
          onClick={handleApplyLeave}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
        >
          Submit
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ApplyLeave;
