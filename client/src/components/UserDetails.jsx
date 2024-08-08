import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

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
        setProjects(data.teamProject || []);

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
      <div className="flex justify-between space-x-4">
        <div className="flex-1 space-y-4">
          <button
            onClick={() => navigate(`/hr-dashboard/updateEmployee/${user._id}`)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
          >
            <PencilIcon className="w-5 h-5 mr-2" />
            Update Employee
          </button>
          <p><strong>First Name:</strong> {user.profile?.firstName}</p>
          <p><strong>Last Name:</strong> {user.profile?.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.profile?.phoneNumber}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Position:</strong> {user.position}</p>
          <p><strong>Manager:</strong> {manager ? `${manager.profile?.firstName} ${manager.profile?.lastName}` : 'No Manager assigned'}</p>
        </div>
        <div className="flex-1">
          <button
            onClick={() => navigate(`/hr-dashboard/addUserToTeam/${user._id}`)}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add User To New Team
          </button>
          <h3 className="text-xl font-semibold mt-4">Team Projects</h3>
          <ul className="list-disc pl-5">
            {projects.map((project, index) => (
              <li key={index}>
                <Link 
                  to={`/hr-dashboard/teamDetails/${project.projectName}`} 
                  className="text-blue-500 hover:underline"
                >
                  {project.projectName} - {project.projectLead.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
