import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LeaveDetails = () => {
  const { id } = useParams();
  console.log({"id:": id});
  const [leave, setLeave] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/leaveApi/leaves/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok he he');
        }
        const data = await response.json();
        // console.log(data);
        setLeave(data);
        console.log({"leave:": leave});
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLeaveDetails();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!leave) {
    return <div>Loading...gg</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Leave Details</h2>
      {/* {leave.map((leave, index) => ( */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <p><strong>Leave Type:</strong> {leave.leaveType}</p>
          <p><strong>Start Date:</strong> {new Date(leave.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(leave.endDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {leave.status}</p>
          <p><strong>Reason:</strong> {leave.reason}</p>
        </div>
      {/* ))} */}
    </div>
  );
};

export default LeaveDetails;
