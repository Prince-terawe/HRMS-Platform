import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const UserLeaveList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leaveList, setLeaveList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/leaveApi/leaves//userLeaveList/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);

        setLeaveList(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLeaves();
  }, [id]);

  return (
    <div className="">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          User Leave List
        </h2>
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        {leaveList ? (
          <ul className="grid grid-cols-2 gap-6 list-disc list-inside text-gray-700">
          {leaveList.map((leave, index) => (
            <li
              key={index}
              className="p-4 bg-white shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <div className="mb-2">
                <span className="font-semibold text-gray-900">Type:</span> {leave.leaveType}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-900">Start Date:</span> {new Date(leave.startDate).toLocaleDateString()}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-900">End Date:</span> {new Date(leave.endDate).toLocaleDateString()}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-900">Status:</span> {leave.status}
              </div>
              <Link
                to={`leave-details/${leave._id}`}
                className="inline-block mt-2 text-indigo-500 hover:underline"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
        
        ) : (
          <div className="text-center text-gray-500">Loading...</div>
        )}
        {/* <div className="mt-6">
          <Link
            to="/apply-leave"
            className="inline-block bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Apply for Leave
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default UserLeaveList;
