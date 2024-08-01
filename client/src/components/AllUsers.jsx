import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">All Employees</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="border p-4 rounded shadow">
            <Link to={`/userDetails/${user._id}`}>
              <div className="flex flex-col items-center">
                {user.profile.profileImage && (
                  <img
                    src={user.profile.profileImage}
                    alt={`${user.profile.firstName} ${user.profile.lastName}`}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                )}
                <h3 className="text-xl font-bold">{user.profile.firstName} {user.profile.lastName}</h3>
                <p>{user.position}</p>
                <p>{user.role}</p>
                <p>{user.department}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
