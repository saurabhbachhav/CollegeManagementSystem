import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import leftarrow from "../assets/leftarrow.png";
import dept from "../assets/department.png";
import Department from "./Department";

function DepartmentDisplay() {
  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showTables, setShowTables] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [head, setHead] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.departmentId;
  const name = location.state?.departmentName;
  const depthead = location.state?.departmenthead;
  const [editedName, setEditedName] = useState(depthead);
  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {

    if (!id || !editedName) {
      console.error("ID, edited name, or selected head is missing");
      return;
    }
    console.log(editedName);

    const instID = instructors.find((inst) => inst.InstructorName === editedName);
    
    axios
      .put(`http://localhost:8080/departments/${id}`, {
        newhead: instID.InstructorID,
      })
      .then((response) => {
        console.log("Department updated successfully:", response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating department:", error);
      });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [instructorsResponse, studentsResponse, coursesResponse] =
          await Promise.all([
            axios.get("http://localhost:8080/instructors"),
            axios.get("http://localhost:8080/students"),
            axios.get("http://localhost:8080/courses"),
          ]);

        setInstructors(
          instructorsResponse.data.filter((inst) => inst.DepartmentID === id)
        );
        setStudents(
          studentsResponse.data.filter((std) => std.DepartmentId === id)
        );
        setCourses(
          coursesResponse.data.filter((course) => course.DepartmentID === id)
        );
         

        const departmentHeads = instructorsResponse.data.filter(
          (inst) => inst.InstructorID === depthead
        );

        setHead(departmentHeads.length > 0 ? departmentHeads : []);
        setShowTables(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id, depthead]);
 // Ensure depthead is also included as a dependency if it changes

  const handleGoBack = () => {
    navigate(-1);
  };
  // console.log(head);
  
  return (
    <div className="relative p-4">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 bg-white border-2 border-[#0317ef] rounded-full shadow-lg z-10 hover:bg-[#F4C63D] transition duration-300"
        style={{ outline: "none" }} // Prevent default focus outline
      >
        <img src={leftarrow} alt="Go Back" className="w-6 h-6" />{" "}
        {/* Adjust size */}
      </button>
      <h1 className="block text-2xl font-bold text-[#F4C63D] text-center mb-6">
        Department Overview
      </h1>
      <div className="flex  justify-center">
        <img className="size-64" src={dept} alt="" />
      </div>
      <div className="flex justify-center">
        <h1 className="text-3xl font-extrabold text-white text-center m-6 ">
          <span>Discover All Students, Instructors, and Courses in the</span>
          <span className=" text-3xl font-extrabold text-green-600 text-center m-6 ">
            {name} Department
          </span>
        </h1>
      </div>
      <div className="flex justify-around items-start mt-4">
        {/* Department Statistics Box */}
        <div className="w-fit p-4 border border-gray-700 rounded-lg bg-[#2C2C2C] shadow-lg">
          <h2 className="text-3xl font-extrabold text-[#F4C63D] text-center tracking-wide drop-shadow-lg mb-4">
            Department Statistics
          </h2>
          <div className="flex justify-around items-end space-x-4">
            {/* Students Bar */}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                {students.length}
              </span>
              <div className="w-12 bg-gray-800 h-20 flex items-end rounded-lg overflow-hidden shadow-lg">
                <div
                  className="bg-gradient-to-b from-[#FF6F61] to-[#FF8B80] w-full transition-all duration-500 ease-in-out shadow-lg hover:scale-105"
                  style={{
                    height: `${(students.length / 100) * 100}%`,
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(255, 105, 180, 0.6)",
                  }}
                ></div>
              </div>
              <p className="text-[#F4C63D] mt-1 text-sm font-semibold tracking-wide">
                Students
              </p>
            </div>

            {/* Instructors Bar */}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                {instructors.length}
              </span>
              <div className="w-12 bg-gray-800 h-20 flex items-end rounded-lg overflow-hidden shadow-lg">
                <div
                  className="bg-gradient-to-b from-[#F4C63D] to-[#FFD700] w-full transition-all duration-500 ease-in-out shadow-lg hover:scale-105"
                  style={{
                    height: `${(instructors.length / 10) * 100}%`,
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(255, 215, 0, 0.6)",
                  }}
                ></div>
              </div>
              <p className="text-[#F4C63D] mt-1 text-sm font-semibold tracking-wide">
                Instructors
              </p>
            </div>

            {/* Courses Bar */}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                {courses.length}
              </span>
              <div className="w-12 bg-gray-800 h-20 flex items-end rounded-lg overflow-hidden shadow-lg">
                <div
                  className="bg-gradient-to-b from-green-400 to-green-600 w-full transition-all duration-500 ease-in-out shadow-lg hover:scale-105"
                  style={{
                    height: `${(courses.length / 20) * 100}%`,
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0, 128, 0, 0.6)",
                  }}
                ></div>
              </div>
              <p className="text-[#F4C63D] mt-1 text-sm font-semibold tracking-wide">
                Courses
              </p>
            </div>
          </div>
        </div>

        {/* Department Head Box */}
        <div className="w-fit p-4 border border-gray-700 rounded-lg bg-[#2C2C2C] shadow-lg">
          <h2 className="text-3xl font-extrabold text-[#F4C63D] text-center tracking-wide drop-shadow-lg mb-4">
            Department Head Id
          </h2>
          <div className="flex flex-col items-center">
            {isEditing ? (
              <>
                <select
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="p-2 mb-2 rounded bg-gray-700 text-white"
                >
                  <option value="">Select Department Head</option>
                  {instructors.map((instructor) => (
                    <option
                      key={instructor.InstructorID}
                      value={instructor.InstructorName}
                    >
                      {instructor.InstructorName}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 mt-2 bg-[#F4C63D] text-black rounded-lg shadow-lg hover:bg-[#FFD700] transition duration-300"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                  {editedName}
                </span>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 mt-2 bg-[#F4C63D] text-black rounded-lg shadow-lg hover:bg-[#FFD700] transition duration-300"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showTables && (
        <div className="flex space-x-4 mt-12">
          {/* Instructor Table */}
          <div className="w-1/3 border rounded-lg p-4">
            <h2 className="text-lg font-bold text-[#F4C63D] mb-2">
              Instructors in the Department
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#2C2C2C]">
                <tr>
                  {["Instructor", "ID"].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 text-left text-sm font-semibold text-[#F4C63D]"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-[#2C2C2C]">
                {instructors.length > 0 ? (
                  instructors.map((instructor) => (
                    <tr
                      key={instructor.InstructorID}
                      className="transition-colors duration-300 hover:bg-[#3A3A3A] cursor-pointer"
                    >
                      <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-white">
                        {instructor.InstructorName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">
                        {instructor.InstructorID}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="whitespace-nowrap px-4 py-2 text-sm text-gray-300 text-center"
                    >
                      N/A
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Student Table */}
          <div className="w-1/3 border rounded-lg p-4">
            <h2 className="text-lg font-bold text-[#F4C63D] mb-2">
              Students in the Department
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#2C2C2C]">
                <tr>
                  {["Student", "ID"].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 text-left text-sm font-semibold text-[#F4C63D]"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-[#2C2C2C]">
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr
                      key={student.StudentID}
                      className="transition-colors duration-300 hover:bg-[#3A3A3A] cursor-pointer"
                    >
                      <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-white">
                        {student.StudentName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">
                        {student.StudentID}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="whitespace-nowrap px-4 py-2 text-sm text-gray-300 text-center"
                    >
                      N/A
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Course Table */}
          <div className="w-1/3 border rounded-lg p-4">
            <h2 className="text-lg font-bold text-[#F4C63D] mb-2">
              Courses in the Department
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#2C2C2C]">
                <tr>
                  {["Course", "ID"].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 text-left text-sm font-semibold text-[#F4C63D]"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-[#2C2C2C]">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <tr
                      key={course.CourseID}
                      className="transition-colors duration-300 hover:bg-[#3A3A3A] cursor-pointer"
                    >
                      <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-white">
                        {course.CourseName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">
                        {course.CourseID}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="whitespace-nowrap px-4 py-2 text-sm text-gray-300 text-center"
                    >
                      N/A
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentDisplay;
