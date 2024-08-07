import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddUserToTeam = () => {
  const [username, setUsername] = useState('');
  const [projectName, setProjectName] = useState('');
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddUserToTeam = async (e) => {
    e.preventDefault();
    try {
      // Construct the form data object
      const formData = {
        projectName,
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
        navigate(`/hr-dashboard/allUsers/userDetails/${id}`);
        // Optionally, redirect to another page or clear the form
        // navigate('/some-path');
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
        {/* <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div> */}
        <div className="mb-4">
          <label className="block mb-2">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border p-2 w-full"
            required
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
