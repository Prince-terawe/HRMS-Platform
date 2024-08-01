import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    role: '',
    manager: '',
    department: '',
    position: ''
  });

  const [managers, setManagers] = useState([]);
  const [roles] = useState(['Employee', 'Manager', 'HR', 'Admin']);
  const [departments] = useState(['d1', 'd2', 'd3', 'd4']);
  const [positions] = useState(['p1', 'p2', 'p3', 'p4']);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch current user data
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFormData({
          phoneNumber: data.profile.phoneNumber || '',
          email: data.email || '',
          role: data.role || '',
          manager: data.manager || '',
          department: data.department || '',
          position: data.position || '',
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    // Fetch managers
    const fetchManagers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/managers/manager');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setManagers(data);
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    };

    fetchUser();
    fetchManagers();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
        navigate('/'); // Redirect to home page or another route
      } else {
        setErrors(data.errors || {});
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Update Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Position</option>
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
        <select
          name="manager"
          value={formData.manager}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Manager</option>
          {managers.map((manager) => (
            <option key={manager._id} value={manager._id}>
              {manager.profile.firstName} {manager.profile.lastName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
