import React, { useEffect, useState } from "react";
import axios from "axios";

function AddStudent() {
  const [studentName, setStudentName] = useState("");
  const [studentRollNo, setStudentRollNo] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [midname, setMidname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coursestart, setCoursestart] = useState("");
  const [courseend, setCourseend] = useState("");
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  
  // console.log(departmentId);
  const handleSubmit = (e) => {
    e.preventDefault();
    setStudentName(firstname + " " + midname + " " + lastname);
    if (!studentName || !studentRollNo) {
      setErrorMessage("Both name and roll number are required.");
      return;
    }
    axios
      .post("http://localhost:8080/students", {
        StudentName: studentName,
        StudentNumber: studentRollNo,
        Gender: gender,
        Email: email,
        Phone: phone,
        DepartmentId: departmentId,
        Startcourse: coursestart,
        Endcourse: courseend,
      })
      .then(() => {
        setSuccessMessage("Student added successfully!");
        setStudentName("");
        setStudentRollNo("");
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage("Error adding student. Please try again.");
        setSuccessMessage("");
      });
  };
  console.log(gender);
   useEffect(() => {
     axios
       .get("http://localhost:8080/departments")
       .then((response) => {
        //  console.log(response.data); // Log the response to check its structure
         setDepartments(response.data); // Assuming the data is an array
       })
       .catch((error) => {
         console.error("Error fetching departments:", error);
       });
   }, []);

  return (
    <div className="mx-auto w-full  bg-white rounded-lg shadow-lg border border-gray-200 ">
      <div className="flex items-center justify-center  bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen w-full">
        {" "}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Student Registration Form
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
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
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
                  value={midname}
                  onChange={(e) => setMidname(e.target.value)}
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
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
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
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your e-mail"
                  className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-white"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  placeholder="Enter your phone number"
                  className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Course Year Details */}
          <div className="space-y-4">
            <h6 className="text-xl font-semibold text-[#F4C63D]">
              Course Details
            </h6>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-white">
                  Select Branch
                </label>
                <select
                  className="mt-1 block w-full rounded-md placeholder-gray-400 bg-[#333333] text-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6F61] py-2 px-3"
                  onChange={(e) => {
                    setDepartmentId(e.target.value);
                  }}
                >
                  {departments.map((course) => (
                    <option
                      key={course.DepartmentId}
                      value={course.DepartmentId}
                    >
                      {course.DepartmentName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="text-sm font-bold text-white">
                  Roll Number *
                </label>
                <input
                  type="text"
                  placeholder="Enter Roll Number"
                  required
                  onChange={(e) => {
                    setStudentRollNo(e.target.value);
                  }}
                  className="mt-1 block w-full rounded-mdplaceholder-gray-400 bg-[#333333] text-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6F61] py-2 px-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startYear"
                  className="text-sm font-semibold text-white"
                >
                  Course Start Year
                </label>
                <input
                  type="number"
                  id="startYear"
                  min="2024"
                  max="2100"
                  onChange={(e) => {
                    setCoursestart(e.target.value);
                  }}
                  placeholder="Start Year"
                  className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="endYear"
                  className="text-sm font-semibold text-white"
                >
                  Course End Year
                </label>
                <input
                  type="number"
                  id="endYear"
                  min="2024"
                  max="2100"
                  onChange={(e) => {
                    setCourseend(e.target.value);
                  }}
                  placeholder="End Year"
                  className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#F4C63D] text-black font-bold rounded-md shadow-lg hover:bg-[#FF6F61] transition-colors"
          >
            Add Student
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

export default AddStudent;
