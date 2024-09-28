import React, { useEffect, useState } from "react";
import axios from "axios";
import Instructor from "./Instructor";

function AddInstructor() {
  const [firstName, setFirstName] = useState("");
  const [midName, setMidName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [instructorID, setInstructorID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const instructorName = `${firstName} ${midName} ${lastName}`;

    if (!instructorName || !email) {
      setErrorMessage("All fields are required.");
      return;
    }

    axios
      .post("http://localhost:8080/instructors", {
        InstructorName: instructorName,
        Gender: gender,
        Email: email,
        Phone: phone,
        DepartmentId: departmentId,
        InstructorId: instructorID,
      })
      .then(() => {
        setSuccessMessage("Instructor added successfully!");
        setFirstName("");
        setMidName("");
        setLastName("");
        setGender("");
        setEmail("");
        setPhone("");
        setDepartmentId("");
        setInstructorID("");
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage("Error adding instructor. Please try again.");
        setSuccessMessage("");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/departments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  return (
    <div className="mx-auto w-full bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Instructor Registration Form
          </h2>

          {/* Personal Details Section */}
          <div className="space-y-4">
            <h6 className="text-xl font-semibold text-[#F4C63D]">
              Personal Details
            </h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="text-sm font-semibold text-white"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                  className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="midName"
                  className="text-sm font-semibold text-white"
                >
                  Mid Name
                </label>
                <input
                  type="text"
                  id="midName"
                  value={midName}
                  onChange={(e) => setMidName(e.target.value)}
                  placeholder="Mid Name"
                  className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="text-sm font-semibold text-white"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                  className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="gender"
                  className="text-sm font-semibold text-white"
                >
                  Gender
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onClick={() => setGender("male")}
                      className="text-[#F4C63D] focus:ring-[#F4C63D]"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onClick={() => setGender("female")}
                      className="text-[#F4C63D] focus:ring-[#F4C63D]"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="space-y-4">
            <h6 className="text-xl font-semibold text-[#F4C63D]">
              Contact Details
            </h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-white"
                >
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your e-mail"
                  required
                  className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-white"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Department Selection */}
          <div className="space-y-4">
            <h6 className="text-xl font-semibold text-[#F4C63D]">Department</h6>
            <div>
              <label className="text-sm font-semibold text-white">
                Select Department *
              </label>
              <select
                className="mt-1 block w-full rounded-md bg-[#333333] text-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6F61] py-2 px-3"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option
                    key={department.DepartmentId}
                    value={department.DepartmentId}
                  >
                    {department.DepartmentName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-sm font-bold text-white">
                Instructor ID *
              </label>
              <input
                type="text"
                placeholder="Give ID To Instructor"
                required
                onChange={(e) => {
                  setInstructorID(e.target.value);
                }}
                className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#F4C63D] text-black font-bold rounded-md shadow-lg hover:bg-[#FF6F61] transition-colors"
          >
            Add Instructor
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

export default AddInstructor;
