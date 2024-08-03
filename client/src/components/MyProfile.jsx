import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MyProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [manager, setManager] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/userProfile', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch user profile');
        }
        console.log('Fetched user data:', data);
        setUser(data);

        if (data.manager) {
          fetchManager(data.manager);
        } else {
          setManager('N/A');
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err.message);
      }
    };

    const fetchManager = async (managerId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/getUserById/${managerId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch manager name');
        }
        console.log('Fetched manager name:', data);
        setManager(`${data.profile.firstName} ${data.profile.lastName}`);
      } catch (err) {
        console.error('Error fetching manager name:', err);
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log('User object:', user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-6">
          <img
            src={user.profile.profileImage || '/default-profile.png'}
            alt={`${user.profile.firstName || ''} ${user.profile.lastName || ''}`}
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.profile.firstName} {user.profile.lastName}</h2>
            <p className="text-gray-600">{user.position}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone Number:</span> {user.profile.phoneNumber}</p>
            <p><span className="font-semibold">Date of Birth:</span> {new Date(user.profile.dateOfBirth).toLocaleDateString()}</p>
            <p><span className="font-semibold">Address:</span> {user.profile.address}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Professional Information</h3>
            <p><span className="font-semibold">Employee ID:</span> {user.empId}</p>
            <p><span className="font-semibold">Department:</span> {user.department}</p>
            <p><span className="font-semibold">Role:</span> {user.role}</p>
            <p><span className="font-semibold">Hire Date:</span> {new Date(user.hireDate).toLocaleDateString()}</p>
            <p><span className="font-semibold">Manager:</span> {manager}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Leave Balance</h3>
          <div className="grid grid-cols-2 gap-4">
            <p><span className="font-semibold">Casual Leave:</span> {user.leaveBalance.casualLeave}</p>
            <p><span className="font-semibold">Sick Leave:</span> {user.leaveBalance.sickLeave}</p>
            <p><span className="font-semibold">Paid Leave:</span> {user.leaveBalance.paidLeave}</p>
            <p><span className="font-semibold">Work From Home:</span> {user.leaveBalance.workFromHome}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Team/Projects</h3>
          <ul className="list-disc list-inside">
            {user.teamProject.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
