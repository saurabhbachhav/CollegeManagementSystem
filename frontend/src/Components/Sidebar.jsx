import React from "react";
import course from "../assets/course.jpg"
import student from "../assets/student.jpg"
import instructor from "../assets/instructor.jpg";
import department from "../assets/department.png"
import marks from "../assets/marks.png"
import books from "../assets/books.png"
import Home from "../assets/home.png"
import examSchedular from "../assets/examSchedule.jpg";
import { Link, useLocation } from "react-router-dom";
import ExamScheduler from "./ExamScheduler";

function Sidebar() {
  const linkClass =
    "text-white text-sm font-semibold hover:bg-blue-600 transition duration-300 ease-in-out rounded-lg px-4 py-2 my-2 w-full text-center";

  const activeLinkClass =
    "bg-blue-600 text-white text-sm font-semibold rounded-lg px-4 py-2 my-2 w-full text-center";

  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6  shadow-lg fixed">
      <nav className="flex flex-col space-y-4">
        <Link
          to="/"
          className={
            location.pathname === "/" ? activeLinkClass : linkClass
          }
        >
          {"  "}
          <div className="flex items-center space-x-3 ">
            <img
              src={Home}
              alt="Course Logo"
              className="h-8 w-8 bg-white" // Increased size for better visibility
            />
            <span className="text-lg font-medium">Home</span>{" "}
            {/* Adjust font size if needed */}
          </div>
        </Link>
        <Link
          to="/Department"
          className={
            location.pathname === "/Department" ? activeLinkClass : linkClass
          }
        >
          {"  "}
          <div className="flex items-center space-x-3">
            <img
              src={department}
              alt="Course Logo"
              className="h-8 w-8" // Increased size for better visibility
            />
            <span className="text-lg font-medium"> Department</span>{" "}
            {/* Adjust font size if needed */}
          </div>
        </Link>
        <Link
          to="/Instructor"
          className={
            location.pathname === "/Instructor" ? activeLinkClass : linkClass
          }
        >
          {"  "}
          <div className="flex items-center space-x-3">
            <img
              src={instructor}
              alt="Course Logo"
              className="h-8 w-8" // Increased size for better visibility
            />
            <span className="text-lg font-medium">Instructor</span>{" "}
            {/* Adjust font size if needed */}
          </div>
        </Link>
        <Link
          to="/Course"
          className={
            location.pathname === "/Course" ? activeLinkClass : linkClass
          }
        >
          <div className="flex items-center space-x-3">
            <img
              src={course}
              alt="Course Logo"
              className="h-8 w-8" // Increased size for better visibility
            />
            <span className="text-lg font-medium">Course</span>{" "}
            {/* Adjust font size if needed */}
          </div>
        </Link>
        <Link
          to="/Student"
          className={
            location.pathname === "/Student" ? activeLinkClass : linkClass
          }
        >
          {"  "}
          <div className="flex items-center space-x-3">
            <img
              src={student}
              alt="Course Logo"
              className="h-8 w-8" // Increased size for better visibility
            />
            <span className="text-lg font-medium"> Student</span>{" "}
            {/* Adjust font size if needed */}
          </div>
        </Link>
        <hr />
        <Link
          to="/Result"
          className={
            location.pathname === "/Result" ? activeLinkClass : linkClass
          }
        >
          {"  "}
          <div className="flex items-center space-x-3">
            <img
              src={marks}
              alt="Course Logo"
              className="h-8 w-8" // Increased size for better visibility
            />
            <span className="text-lg font-medium">Result</span>{" "}
            {/* Adjust font size if needed */}
          </div>
        </Link>
        <Link
          to="/ExamSchedular"
          className={
            location.pathname === "/ExamSchedular" ? activeLinkClass : linkClass
          }
        >
          {"  "}
          <div className="flex items-center space-x-3">
            <img
              src={examSchedular}
              alt="Course Logo"
              className="h-8 w-8" // Increased size for better visibility
            />
            <span className="text-lg font-medium">ExamSchedular</span>{" "}
            {/* Adjust font size if needed */}
          </div>
        </Link>
        <Link
          to="/Resources"
          className={
            location.pathname === "/Resources" ? activeLinkClass : linkClass
          }
        >
          {"  "}
          <div className="flex items-center space-x-3">
            <img
              src={books}
              alt="Course Logo"
              className="h-8 w-8" // Increased size for better visibility
            />
            <span className="text-lg font-medium">Resources</span>{" "}
            {/* Adjust font size if needed */}
          </div>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
