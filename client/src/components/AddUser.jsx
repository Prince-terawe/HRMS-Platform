import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import teamProjectsData from '../config/teamProject.json'; // Import the JSON data

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    empId: "",
    password: "",
    email: "",
    role: "",
    department: "",
    position: "",
    hireDate: "",
    teamProjects: [], // Update to an array
    manager: "",
  });

  // console.log(teamProjectsData);

  const [managers, setManagers] = useState([]);
  const [roles] = useState(["Employee", "Manager", "HR", "Admin"]);
  const [departments] = useState(["d1", "d2", "d3", "d4"]);
  const [positions] = useState(["p1", "p2", "p3", "p4"]);
  const [teamProjects] = useState(teamProjectsData); // Set team projects from JSON
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch managers from the backend
    const fetchManagers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/managers/manager"
        ); // Update with the actual endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setManagers(data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };
    fetchManagers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "teamProjects") {
      const selectedProjects = Array.from(e.target.selectedOptions, (option) => JSON.parse(option.value));
      setFormData({ ...formData, teamProjects: selectedProjects });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
        navigate("/"); // Redirect to home page or another route
      } else {
        setErrors(data.errors || {});
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-7/12 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-7/12 p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Birth Date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-7/12 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-7/12 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-7/12 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="empId"
          placeholder="Employee ID"
          value={formData.empId}
          onChange={handleChange}
          className="w-7/12 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-7/12 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-7/12 p-2 border border-gray-300 rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-7/12 p-2 border border-gray-300 rounded"
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
          className="w-7/12 p-2 border border-gray-300 rounded"
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
          className="w-7/12 p-2 border border-gray-300 rounded"
        >
          <option value="">Select Position</option>
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
        <input
          type="date"
          placeholder="Joining Date"
          name="hireDate"
          value={formData.hireDate}
          onChange={handleChange}
          className="w-7/12 p-2 border border-gray-300 rounded"
        />
        <select
          name="teamProjects"
          value={formData.teamProjects.map(project => JSON.stringify(project))}
          onChange={handleChange}
          className="w-7/12 p-2 border border-gray-300 rounded"
        >
          <option value="">Select Team Projects</option>
          {teamProjects.map((project) => (
            <option key={project.projectName} value={JSON.stringify(project)}>
              {project.projectName} - {project.projectLead.name}
            </option>
          ))}
        </select>
        <select
          name="manager"
          value={formData.manager}
          onChange={handleChange}
          className="w-7/12 p-2 border border-gray-300 rounded"
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
          className="w-7/12 p-2 bg-blue-500 text-white rounded"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddUser;
