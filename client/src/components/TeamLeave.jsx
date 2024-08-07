import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
// import './App.css'; // To import custom CSS if needed

const TeamLeaves = () => {
  const { id } = useParams();
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/teams/upcomingLeave/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setLeaves(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLeaves();
  }, [id]);

  function renderCell(date) {
    const dateLeaves = leaves.filter(leave => {
      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
      return date >= startDate && date <= endDate;
    });

    if (dateLeaves.length) {
      return (
        <Whisper
          placement="top"
          trigger="click"
          speaker={
            <Popover>
              {dateLeaves.map((leave, index) => (
                <div key={index} className="mb-2">
                  <p><b>Employee ID:</b> {leave.empId}</p>
                  {/* <p><b>Employee Name:</b> {leave.empName}</p> */}
                  <p><b>Leave Type:</b> {leave.leaveType}</p>
                  <p><b>Reason:</b> {leave.reason}</p>
                </div>
              ))}
            </Popover>
          }
        >
          <div className="flex items-center justify-center h-full cursor-pointer">
            <Badge className="w-8 h-8 bg-yellow-300 rounded-full text-xs flex items-center justify-center">
              {dateLeaves.length}
            </Badge>
          </div>
        </Whisper>
      );
    }

    return null;
  }

  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Upcoming Leaves for Team Project {id}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6">
        <Calendar
          bordered
          renderCell={renderCell}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TeamLeaves;
