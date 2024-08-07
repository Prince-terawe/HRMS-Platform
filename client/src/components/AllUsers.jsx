import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('User deleted successfully');
        setUsers(users.filter(user => user._id !== userId));
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">All Employees</h2>
      {message && <p className="mt-4">{message}</p>}
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <div key={user._id} className="flex items-center border p-4 rounded shadow">
            <Link to={`userDetails/${user._id}`} className="flex items-center flex-grow">
              {user.profile?.profileImage && (
                <img
                  src={user.profile.profileImage}
                  alt={`${user.profile.firstName} ${user.profile.lastName}`}
                  className="w-24 h-24 rounded-full mr-4"
                />
              )}
              <div>
                <h3 className="text-xl font-bold">{user.profile?.firstName} {user.profile?.lastName}</h3>
                <p>{user.position}</p>
                <p>{user.role}</p>
                <p>{user.department}</p>
              </div>
            </Link>
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="p-2 bg-red-500 text-white rounded ml-4"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
