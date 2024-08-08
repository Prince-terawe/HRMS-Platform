import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Sample data URL; adjust the path according to your project structure
const PROJECT_DATA_URL = '../config/teamProject.json';

const AddUserToTeam = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectLead, setProjectLead] = useState('');
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch project data from the JSON file
    const fetchProjects = async () => {
      try {
        const response = await fetch(PROJECT_DATA_URL);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching project data:', error);
        setMessage('Error fetching project data');
      }
    };

    fetchProjects();
  }, []);

  const handleAddUserToTeam = async (e) => {
    e.preventDefault();
    try {
      // Construct the form data object
      const formData = {
        projectName,
        projectLead,
      };

      // Send the request to add user to the team
      const response = await fetch(`http://localhost:5000/api/teams/addUserToTeam/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('User added to team successfully');
        // Optionally clear the form fields
        setProjectName('');
        setProjectLead('');
        // Redirect to user details or another page
        navigate(`/hr-dashboard/allUsers/userDetails/${id}`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Add User to Team</h2>
      <form onSubmit={handleAddUserToTeam}>
        <div className="mb-4">
          <label className="block mb-2">Project Name</label>
          <select
            value={projectName}
            onChange={(e) => {
              const selectedProject = projects.find(p => p.projectName === e.target.value);
              setProjectName(e.target.value);
              setProjectLead(selectedProject?.projectLead.id || '');
            }}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.projectName} value={project.projectName}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Project Lead ID</label>
          <input
            type="text"
            value={projectLead}
            readOnly
            className="border p-2 w-full bg-gray-200"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add User to Team
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default AddUserToTeam;
