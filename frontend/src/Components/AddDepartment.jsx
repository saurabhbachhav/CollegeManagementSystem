import React, { useEffect, useState } from "react";
import axios from "axios";

function AddDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  const [headId, setHeadId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [departmentId, setDepartmentId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!departmentName || !departmentId) {
      setErrorMessage("Both Department Name and Head ID are required.");
      return;
    }
      axios
        .post("http://localhost:8080/departments", {
          DepartmentName: departmentName,
          HeadId: headId,
          DepartmentId: departmentId,
        })
        .then(() => {
          setSuccessMessage("Department added successfully!");
          setDepartmentName("");
          setHeadId("");
          setErrorMessage("");
        })
        .catch(() => {
          setErrorMessage("Error adding department. Please try again.");
          setSuccessMessage("");
        });
    if (headId) {
      // Ensure headId is defined or truthy
      axios
        .post("http://localhost:8080/instructors/ishead", { headID: headId })
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8080/instructors")
      .then((response) => {
        setInstructors(() => response.data.filter((inst) => inst.IsHead === null))
    })
  },[])

  return (
    <div className="mx-auto w-full bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black  w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-lg space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Add Department
          </h2>

          {/* Department Details Section */}
          <div className="space-y-4">
            <h6 className="text-xl font-semibold text-[#F4C63D]">
              Department Details
            </h6>
            <div>
              <label
                htmlFor="departmentID"
                className="text-sm font-semibold text-white"
              >
                Department ID *
              </label>
              <input
                type="text"
                id="departmentID"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                placeholder="Give unique Department ID"
                required
                className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="departmentName"
                className="text-sm font-semibold text-white"
              >
                Department Name *
              </label>
              <input
                type="text"
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="Enter Department Name"
                required
                className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
              />
            </div>
            <div>
              <div>
                <label className="text-sm font-semibold text-white">
                  Make Head to this Department
                </label>
                <select
                  className="mt-1 block w-full rounded-md bg-[#333333] text-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6F61] py-2 px-3"
                  onChange={(e) => setHeadId(e.target.value)}
                >
                  <option value="">Select Instructor</option>
                  {instructors.map((inst, index) => (
                    <option key={index} value={inst.InstructorID}>
                      {inst.InstructorName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#F4C63D] text-black font-bold rounded-md shadow-lg hover:bg-[#FF6F61] transition-colors"
          >
            Add Department
          </button>
        </form>
      </div>

      {successMessage && (
        <p className="mt-5 text-green-600 text-center">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mt-5 text-red-600 text-center">{errorMessage}</p>
      )}
    </div>
  );
}

export default AddDepartment;
