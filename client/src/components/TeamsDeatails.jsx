import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeamLeaves from './TeamLeave';

const TeamsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);
  const [error, setError] = useState(null);
  const [onLeaveUsers, setOnLeaveUsers] = useState({}); // Object to store leave status keyed by user ID

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // Fetch team members
        const response = await fetch(`http://localhost:5000/api/teams/getUsersFromTeam/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        setTeam(data.users);

        // Fetch users on leave today
        const leaveResponse = await fetch(`http://localhost:5000/api/teams/getUsersOnLeave/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!leaveResponse.ok) {
          throw new Error('Failed to fetch leave data');
        }
        const leaveData = await leaveResponse.json();
        // Create a dictionary of users on leave for quick lookup
        const leaveStatus = leaveData.users.reduce((acc, user) => {
          acc[user._id] = true; // Mark user as on leave
          return acc;
        }, {});
        setOnLeaveUsers(leaveStatus);

      } catch (error) {
        setError(error.message);
      }
    };

    fetchTeam();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  if (team.length === 0) {
    return <div className="text-center text-gray-500 mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Team Leave List</h2>
      <TeamLeaves />
      <h2 className="text-2xl font-bold mb-4">Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member) => (
          <div
            key={member._id}
            className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer transition-transform duration-300"
            onClick={() => navigate(`/leaveList/${member._id}`)}
          >
            <div className="flex items-center mb-4">
              {member.profile.profileImage && (
                <img src={member.profile.profileImage} alt={`${member.profile.firstName} ${member.profile.lastName}`} className="w-16 h-16 rounded-full mr-4" />
              )}
              <div>
                <p className="font-semibold text-lg">{member.profile.firstName} {member.profile.lastName}</p>
                <p><strong>Position:</strong> {member.position}</p>
                <p><strong>Role:</strong> {member.role}</p>
                <p><strong>Department:</strong> {member.department}</p>
              </div>
            </div>
            {onLeaveUsers[member._id] && (
              <p className="text-red-500 mt-2">On Leave Today</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsDetails;
