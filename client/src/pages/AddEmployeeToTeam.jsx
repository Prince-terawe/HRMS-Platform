import React, { useState } from 'react';

const AddUserToTeam = () => {
  const [username, setUsername] = useState('');
  const [projectName, setProjectName] = useState('');
  const [message, setMessage] = useState('');

  const handleAddUserToTeam = async (e) => {
    e.preventDefault();
    try {
      const userIdResponse = await fetch(`http://localhost:5000/api/users?username=${username}`);
      const userIdData = await userIdResponse.json();
      if (!userIdResponse.ok || !userIdData.userId) {
        setMessage(`Error: ${userIdData.error || 'User not found'}`);
        return;
      }
      const userId = userIdData.userId;

      const response = await fetch(`http://localhost:5000/api/teams/addUserToTeam?userId=${userId}&projectName=${projectName}`, {
        method: 'PUT',
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('User added to team successfully');
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
          <label className="block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
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
