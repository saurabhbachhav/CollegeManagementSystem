import React, { useState, useEffect } from "react";
import axios from "axios";

function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [instructorID, setInstructorID] = useState("");
  const [departments, setDepartments] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch departments
    axios
      .get("http://localhost:8080/departments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });

    // Fetch instructors
    axios
      .get("http://localhost:8080/instructors")
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(departmentID);
    if (!courseName || !courseId || !departmentID || !instructorID) {
      setErrorMessage("All fields are required.");
      return;
    }

    axios
      .post("http://localhost:8080/courses", {
        CourseName: courseName,
        CourseId: courseId,
        DepartmentId: departmentID,
        InstructorId: instructorID,
      })
      .then(() => {
        setSuccessMessage("Course added successfully!");
        setCourseName("");
        setCourseId("");
        setDepartmentID("");
        setInstructorID("");
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage("Error adding course. Please try again.");
        setSuccessMessage("");
      });
  };

  return (
    <div className="mx-auto w-full bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black  w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-lg space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Add Course
          </h2>

          {/* Course Details Section */}
          <div className="space-y-4">
            <h6 className="text-xl font-semibold text-[#F4C63D]">
              Course Details
            </h6>
            <div>
              <label
                htmlFor="courseName"
                className="text-sm font-semibold text-white"
              >
                Course Name *
              </label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter Course Name"
                required
                className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="courseId"
                className="text-sm font-semibold text-white"
              >
                Course ID *
              </label>
              <input
                type="text"
                id="courseId"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                placeholder="Give a unique Course ID"
                required
                className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="departmentID"
                className="text-sm font-semibold text-white"
              >
                Department *
              </label>
              <select
                id="departmentID"
                value={departmentID}
                onChange={(e) => setDepartmentID(e.target.value)} // Sets departmentID when a department is selected
                required
                className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.DepartmentID} value={dept.DepartmentId}>
                    {dept.DepartmentName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="instructorID"
                className="text-sm font-semibold text-white"
              >
                Instructor *
              </label>
              <select
                id="instructorID"
                value={instructorID}
                onChange={(e) => setInstructorID(e.target.value)}
                required
                className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
              >
                <option value="">Select Instructor</option>
                {instructors.map((inst) => (
                  <option key={inst.InstructorID} value={inst.InstructorID}>
                    {inst.InstructorName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#F4C63D] text-black font-bold rounded-md shadow-lg hover:bg-[#FF6F61] transition-colors"
          >
            Add Course
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

export default AddCourse;
