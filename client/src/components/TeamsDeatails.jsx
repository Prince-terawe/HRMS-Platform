import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TeamsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/teams/getUsersFromTeam/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeam(data.users);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTeam();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (team.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member) => (
          <div
            key={member._id}
            className="bg-white p-4 rounded shadow cursor-pointer"
            onClick={() => navigate(`/leaveDetails/${member._id}`)}
          >
            <p><strong>Full Name:</strong> {member.profile.firstName} {member.profile.lastName}</p>
            <p><strong>Position:</strong> {member.position}</p>
            {member.profile.profileImage && (
              <img src={member.profile.profileImage} alt={`${member.profile.firstName} ${member.profile.lastName}`} className="w-16 h-16 rounded-full" />
            )}
            <p><strong>Role:</strong> {member.role}</p>
            <p><strong>Department:</strong> {member.department}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsDetails;
