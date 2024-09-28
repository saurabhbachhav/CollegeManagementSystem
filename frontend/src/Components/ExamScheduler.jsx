import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Components/Context/Authentication.context.jsx";

const ExamScheduler = () => {
  const [exams, setExams] = useState([]);
  const [examID, setExamID] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token1 = useContext(AuthContext);
  const token = token1.token;

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("http://localhost:8080/exams");
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
        setError("Error fetching exams.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleAddExam = async (e) => {
    e.preventDefault();

    if (examID && subjectName && examDate && examTime) {
      setLoading(true); // Start loading state
      try {
        await axios.post("http://localhost:8080/exams", {
          ExamID: examID,
          SubjectName: subjectName,
          ExamDate: examDate,
          ExamTime: examTime,
        });
        setExams((prevExams) => [
          ...prevExams,
          {
            ExamID: examID,
            SubjectName: subjectName,
            ExamDate: examDate,
            ExamTime: examTime,
          },
        ]);
        setExamID("");
        setSubjectName("");
        setExamDate("");
        setExamTime("");
        alert("Exam scheduled successfully!");
      } catch (error) {
        console.error("Error scheduling exam:", error);
        alert("Error scheduling exam. Please try again.");
      } finally {
        setLoading(false); // End loading state
      }
    } else {
      alert("Please fill in all fields (Exam ID, Subject, Date, and Time).");
    }
  };

  const handleDeleteExam = async (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await axios.delete(`http://localhost:8080/exams/${id}`);
        setExams((prevExams) => prevExams.filter((exam) => exam.ExamID !== id));
        alert("Exam deleted successfully!");
      } catch (error) {
        console.error("Error deleting exam:", error);
        alert("Error deleting exam. Please try again.");
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-6 bg-gray-900 rounded-lg shadow-lg">
      {token ? (
        <>
          <h2 className="text-3xl font-bold text-[#F4C63D] mb-6 text-center">
            Exam Scheduler
          </h2>
          <form onSubmit={handleAddExam} className="space-y-6 mb-8">
            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-gray-300 mb-1"
                htmlFor="examID"
              >
                Exam ID
              </label>
              <input
                id="examID"
                type="text"
                value={examID}
                onChange={(e) => setExamID(e.target.value)}
                className="p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#F4C63D] transition"
                placeholder="Enter Exam ID"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-gray-300 mb-1"
                htmlFor="subjectName"
              >
                Subject Name
              </label>
              <input
                id="subjectName"
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#F4C63D] transition"
                placeholder="Enter Subject"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-gray-300 mb-1"
                htmlFor="examDate"
              >
                Exam Date
              </label>
              <input
                id="examDate"
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#F4C63D] transition"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-gray-300 mb-1"
                htmlFor="examTime"
              >
                Exam Time
              </label>
              <input
                id="examTime"
                type="time"
                value={examTime}
                onChange={(e) => setExamTime(e.target.value)}
                className="p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#F4C63D] transition"
                required
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-[#F4C63D] m-4 px-4 py-2 text-sm font-semibold text-black transition transform hover:scale-105 hover:bg-green-600 hover:shadow-[0_4px_20px_rgba(255,111,97,0.8)] focus:outline-none focus:ring-2 focus:ring-[#F4C63D] focus:ring-offset-2"
            >
              {loading ? "Scheduling..." : "Schedule Exam"}
            </button>
          </form>
        </>
      ) : (
        <p className="text-red-500 text-center">
          Please log in to schedule exams.
        </p>
      )}

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-[#F4C63D] mb-4 text-center">
          Scheduled Exams
        </h3>
        {loading ? (
          <p className="text-gray-300 text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-4 text-left">Exam ID</th>
                <th className="p-4 text-left">Subject Name</th>
                <th className="p-4 text-left">Exam Date</th>
                <th className="p-4 text-left">Exam Time</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr
                  key={exam.ExamID}
                  className="border-b border-gray-700 hover:bg-gray-600"
                >
                  <td className="p-4">{exam.ExamID}</td>
                  <td className="p-4">{exam.SubjectName}</td>
                  <td className="p-4">{exam.ExamDate.split("T")[0]}</td>
                  <td className="p-4">{exam.ExamTime}</td>
                  {token ? (
                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteExam(exam.ExamID)}
                        className="rounded-md bg-[#F4C63D] px-4 py-2 text-sm font-semibold text-black transition transform hover:scale-105 hover:bg-[#FF6F61] hover:shadow-[0_4px_20px_rgba(255,111,97,0.8)] focus:outline-none focus:ring-2 focus:ring-[#F4C63D] focus:ring-offset-2"
                      >
                        Delete
                      </button>
                    </td>
                  ) : (
                    <p className="text-red-500 text-center">
                     No Authority
                    </p>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExamScheduler;
