import React from 'react';
import { Link } from 'react-router-dom';

const ManageTeam = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-green-600 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-orange-700 mb-6">Manage Team</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/manager/add-team-member"
            className="inline-block bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Add Team Member
          </Link>
          <Link
            to="/manager/view-team"
            className="inline-block bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            View Team
          </Link>
          <Link
            to="/manager/assign-projects"
            className="inline-block bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Assign Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageTeam;
