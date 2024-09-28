import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card_Course from "./Card_Course";
import {AuthContext} from "../Components/Context/Authentication.context.jsx"

function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token1 = useContext(AuthContext);
  const token = token1.token;

  useEffect(() => {
    // Fetch courses
    axios
      .get("http://localhost:8080/courses")
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setErrorMessage("Error fetching courses. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleOnDelete = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      axios
        .delete(`http://localhost:8080/courses/${courseId}`)
        .then(() => {
          setCourses(courses.filter((course) => course.CourseId !== courseId));
          setSuccessMessage("Course deleted successfully!");
          setErrorMessage(""); // Clear any previous errors
        })
        .catch((error) => {
          console.error("Error deleting course:", error);
          setErrorMessage("Error deleting course. Please try again.");
        });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* <div className="flex flex-wrap">
        {courses.map((course, index) => (
          <Card_Course
            key={index}
            name={course.CourseName}
            id={course.CourseId}
            head={course.InstructorID}
          />
        ))}
      </div> */}
      <section className="mx-auto w-full max-w-7xl px-4 py-4 flex-1 flex flex-col">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-3xl font-semibold text-[#F4C63D]">Courses</h2>
            <p className="mt-1 text-sm text-gray-300">
              This is a list of all courses. You can add new courses, edit, or
              delete existing ones.
            </p>
          </div>
          <div>
            {token ? (
              <Link
                to="/AddCourse"
                className="rounded-md bg-[#F4C63D] m-48 px-4 py-2 text-sm font-semibold text-black transition transform hover:scale-105 hover:bg-[#FF6F61] hover:shadow-[0_4px_20px_rgba(255,111,97,0.8)] focus:outline-none focus:ring-2 focus:ring-[#F4C63D] focus:ring-offset-2"
              >
                Add New Course
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Display Success or Error Messages */}
        {successMessage && (
          <p className="mt-4 p-2 bg-green-100 text-green-700 border border-green-400 rounded">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="mt-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
            {errorMessage}
          </p>
        )}

        {/* Table */}
        <div className="mt-6">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-700">
                    <tr className="divide-x divide-gray-200">
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold text-[#F4C63D]"
                      >
                        Course ID
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-semibold text-[#F4C63D]"
                      >
                        Course Name
                      </th>
                      {token ? (
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-left text-sm font-semibold text-[#F4C63D]"
                        >
                          Actions
                        </th>
                      ) : (
                        ""
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-gray-900">
                    {loading ? (
                      <tr>
                        <td
                          colSpan="3"
                          className="text-center py-4 text-gray-300"
                        >
                          Loading courses...
                        </td>
                      </tr>
                    ) : (
                      courses.map((course) => (
                        <tr
                          key={course.CourseId}
                          className="hover:bg-[#3A3A3A] transition duration-200 divide-x divide-gray-200"
                        >
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-sm font-medium text-white">
                              {course.CourseId}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                            {course.CourseName}
                          </td>
                          {token ? (
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                              <button
                                onClick={() => handleOnDelete(course.CourseId)}
                                className="text-[#FF6F61] hover:text-[#F4C63D] m-4 transition duration-200"
                              >
                                Delete
                              </button>
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      ))
                    )}
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

export default Course;
