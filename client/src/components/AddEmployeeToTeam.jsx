import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import teamProjectsData from '../config/teamProject.json'; // Import the JSON data directly

const AddUserToTeam = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Directly set the imported JSON data to state
    setProjects(teamProjectsData);
  }, []);

  const handleAddUserToTeam = async (e) => {
    e.preventDefault();
    try {
      if (!selectedProject) {
        setMessage('Please select a project.');
        return;
      }

      const formData = {
        projectName: selectedProject.projectName,
        projectLead: selectedProject.projectLead,
      };

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
        setSelectedProject(null);
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
            value={selectedProject?.projectName || ''}
            onChange={(e) => {
              const project = projects.find(p => p.projectName === e.target.value);
              setSelectedProject(project || null);
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
          <label className="block mb-2">Project Lead</label>
          <input
            type="text"
            value={selectedProject?.projectLead.name || ''}
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
