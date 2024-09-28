import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../Components/Context/Authentication.context.jsx";

function Student() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedMobile, setEditedMobile] = useState("");

  const token1 = useContext(AuthContext);
  const token = token1.token;

  useEffect(() => {
    const fetchStudentsAndDepartments = async () => {
      try {
        const [studentsResponse, departmentsResponse] = await Promise.all([
          axios.get("http://localhost:8080/students"),
          axios.get("http://localhost:8080/departments"),
        ]);
        setStudents(studentsResponse.data);
        setDepartments(departmentsResponse.data);
      } catch (err) {
        setError("Error fetching data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsAndDepartments();
  }, []);

  const handleDelete = (studentID) => {
    axios
      .delete(`http://localhost:8080/students/${studentID}`)
      .then(() => {
        setStudents((prev) =>
          prev.filter((student) => student.StudentID !== studentID)
        );
        alert("Student deleted successfully!");
      })
      .catch((error) => console.error("Error deleting student:", error));
  };

  const handleEdit = (studentID) => {
    const studentToEdit = students.find((std) => std.StudentID === studentID);
    if (studentToEdit) {
      setEditingStudent(studentToEdit);
      setEditedName(studentToEdit.StudentName);
      setEditedEmail(studentToEdit.email);
      setEditedMobile(studentToEdit.mobile);
    }
  };

  const handleSave = (studentID) => {
    const updatedStudent = {
      ...editingStudent,
      StudentName: editedName,
      email: editedEmail,
      mobile: editedMobile,
    };
    axios
      .put(`http://localhost:8080/students/${studentID}`, updatedStudent)
      .then(() => {
        // Update the students state with the modified student data
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.StudentID === studentID ? updatedStudent : student
          )
        );
        setEditingStudent(null); // Clear the editing state
        alert("Student updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating student:", error);
        alert("Error updating student. Please try again.");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800  to-black min-h-screen w-full">
      <section className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-[#F4C63D]">Students</h2>
            <p className="mt-1 text-sm text-gray-300">
              Manage all students. You can add, edit, or delete student records.
            </p>
          </div>
          <div>
            {token ? (
              <Link
                to="/AddStudent"
                className="rounded-md bg-[#F4C63D]  px-4 py-2 text-sm font-semibold text-black transition transform hover:scale-105 hover:bg-[#FF6F61] hover:shadow-[0_4px_20px_rgba(255,111,97,0.8)] focus:outline-none focus:ring-2 focus:ring-[#F4C63D] focus:ring-offset-2"
              >
                Add New Student
              </Link>
            ) : (
              <p className="text-red-600">You are logged out</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-fit py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow border border-gray-200 md:rounded-lg">
                <table className="min-w-fit divide-y divide-gray-200 bg-gray-900 m-4">
                  <thead className="bg-gray-700">
                    <tr className="divide-x divide-gray-200">
                      <th className="px-4 py-3.5 text-left text-sm font-semibold text-[#F4C63D]">
                        Student Name
                      </th>
                      <th className="px-12 py-3.5 text-left text-sm font-semibold text-[#F4C63D]">
                        Roll Number
                      </th>
                      <th className="px-12 py-3.5 text-left text-sm font-semibold text-[#F4C63D]">
                        Department
                      </th>
                      <th className="px-12 py-3.5 text-left text-sm font-semibold text-[#F4C63D]">
                        Gender
                      </th>
                      {token && (
                        <>
                          <th className="px-12 py-3.5 text-left text-sm font-semibold text-[#F4C63D]">
                            E-mail
                          </th>
                          <th className="px-12 py-3.5 text-left text-sm font-semibold text-[#F4C63D]">
                            Mobile
                          </th>
                          <th className="px-12 py-3.5 text-left text-sm font-semibold text-[#F4C63D]">
                            Actions
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-gray-900">
                    {students.map((student) => (
                      <tr
                        key={student.StudentID}
                        className="transition-colors duration-300 hover:bg-[#3A3A3A] cursor-pointer divide-x divide-gray-200"
                      >
                        <td className="whitespace-nowrap px-4 py-4">
                          {editingStudent &&
                          editingStudent.StudentID === student.StudentID ? (
                            <input
                              type="text"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                              className="mt-1 block w-full rounded-md bg-gray-800 text-white"
                            />
                          ) : (
                            <div className="text-sm font-medium text-white">
                              {student.StudentName}
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {student.StudentNumber}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {departments.find(
                            (dept) => dept.DepartmentId === student.DepartmentId
                          )?.DepartmentName || "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {student.gender}
                        </td>
                        {token && (
                          <>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                              {editingStudent &&
                              editingStudent.StudentID === student.StudentID ? (
                                <input
                                  type="email"
                                  value={editedEmail}
                                  onChange={(e) =>
                                    setEditedEmail(e.target.value)
                                  }
                                  className="mt-1 block w-full rounded-md bg-gray-800 text-white"
                                />
                              ) : (
                                student.email || "N/A"
                              )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                              {editingStudent &&
                              editingStudent.StudentID === student.StudentID ? (
                                <input
                                  type="tel"
                                  value={editedMobile}
                                  onChange={(e) =>
                                    setEditedMobile(e.target.value)
                                  }
                                  className="mt-1 block w-full rounded-md bg-gray-800 text-white"
                                />
                              ) : (
                                student.mobile || "N/A"
                              )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                              {!editingStudent ? (
                                <button
                                  onClick={() => handleEdit(student.StudentID)}
                                  className="text-[#4ae92a] hover:text-[#F4C63D] m-4 transition-colors duration-200"
                                >
                                  Edit
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleSave(student.StudentID)}
                                  className="text-[#4ae92a] hover:text-[#F4C63D] m-4 transition-colors duration-200"
                                >
                                  Save
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(student.StudentID)}
                                className="text-[#FF6F61] hover:text-[#F4C63D] m-4 transition-colors duration-200"
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Student;
