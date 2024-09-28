import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Components/Context/Authentication.context.jsx";

function Result() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentResult, setStudentResult] = useState("");
  const [studentAttendance, setStudentAttendance] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const token1 = useContext(AuthContext);
  const token = token1.token;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/students/results"
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Error fetching students");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/students/results", {
        StudentId: studentId,
        StudentName: studentName,
        StudentResult: studentResult,
        StudentAttendance: studentAttendance,
      });
      fetchStudents();
      clearForm();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Error adding student. Please try again.");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:8080/students/results/${id}`);
        fetchStudents();
        alert("Student deleted successfully!");
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Error deleting student. Please try again.");
      }
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setStudentId(student.StudentId);
    setStudentName(student.StudentName);
    setStudentResult(student.StudentResult);
    setStudentAttendance(student.StudentAttendance);
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/students/results/${studentId}`, {
        StudentName: studentName,
        StudentResult: studentResult,
        StudentAttendance: studentAttendance,
      });
      fetchStudents();
      clearForm();
      setEditingStudent(null);
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating student. Please try again.");
    }
  };

  const clearForm = () => {
    setStudentId("");
    setStudentName("");
    setStudentResult("");
    setStudentAttendance("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-900 min-h-screen">
      <section className="mx-auto w-full max-w-7xl px-4 py-8">
        <h1 className="text-4xl font-bold text-teal-400 text-center mb-10">
          Student Results
        </h1>
        {token ? (
          <form
            onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
            className="mb-6 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Student ID"
              required
              className="p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Student Name"
              required
              className="p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="text"
              value={studentResult}
              onChange={(e) => setStudentResult(e.target.value)}
              placeholder="Result (Pass/Fail)"
              required
              className="p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="number"
              value={studentAttendance}
              onChange={(e) => setStudentAttendance(e.target.value)}
              placeholder="Attendance (%)"
              required
              className="p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="submit"
              className="rounded-md bg-teal-400 px-5 py-3 text-sm font-semibold text-black transition-transform transform hover:scale-105 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              {editingStudent ? "Update Student" : "Add Student"}
            </button>
          </form>
        ) : (
          <p></p>
        )}

        <div className="overflow-hidden shadow-lg border border-gray-700 rounded-lg">
          <table className="min-w-full divide-y divide-gray-700 bg-gray-800 text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-400">
                  Student ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-400">
                  Student Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-400">
                  Result
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-400">
                  Attendance (%)
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-teal-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {students.map((student) => (
                <tr
                  key={student.StudentId}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="whitespace-nowrap px-4 py-4 text-sm">
                    {student.StudentId}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm">
                    {student.StudentName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm">
                    {student.StudentResult}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm">
                    {student.StudentAttendance}
                  </td>
                  {token ? (
                    <td className="whitespace-nowrap px-4 py-4 text-right space-x-3">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-teal-400 hover:text-teal-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.StudentId)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  ) : (
                    <p>No Authority</p>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Result;
