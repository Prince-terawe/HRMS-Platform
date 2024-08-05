import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/getUserById/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
        setProjects(data.teamProject);

        if (data.manager) {
          const managerResponse = await fetch(`http://localhost:5000/api/users/getUserById/${data.manager}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (!managerResponse.ok) {
            throw new Error('Network response was not ok');
          }
          const managerData = await managerResponse.json();
          // console.log({"managerData": managerData});

          setManager(managerData);
        } else {
          setManager(null);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
      <div className="space-y-4">
        <p><strong>First Name:</strong> {user.profile?.firstName}</p>
        <p><strong>Last Name:</strong> {user.profile?.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.profile?.phoneNumber}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Department:</strong> {user.department}</p>
        <p><strong>Position:</strong> {user.position}</p>
        <p><strong>Manager:</strong> {manager}</p>
        <button
          onClick={() => navigate(`/updateEmployee/${user._id}`)}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Update Employee
        </button>
        <div>
          <h3 className="text-xl font-semibold mt-4">Teams</h3>
          <ul className="list-disc pl-5">
            {projects.map((project, index) => (
              <li key={index}>
                <Link to={`/teamDetails/${project}`} className="text-blue-500 hover:underline">
                  {project}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => navigate(`/addUserToTeam/${user._id}`)}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Add User To New Team
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
