import React from "react";
import AddStudent from "./AddStudent.jsx";
import Department from "./Department.jsx";
import Instructor from "./Instructor.jsx";
import Student from "./Student.jsx";
import AddInstructor from "./AddInstructor.jsx";
import Course from "./Course.jsx";
import AddCourse from "./AddCourse.jsx";
import AddDepartment from "./AddDepartment.jsx";
import { Route, Routes } from "react-router-dom";
import Departmentdisplay from "./Departmentdisplay.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Result from "./Result.jsx";
import Resources from "./Resources.jsx";
import ExamScheduler from "./ExamScheduler.jsx";

function Display() {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen w-full">
      {/* Optional Title */}
      {/* <h1 className="text-3xl font-bold text-[#F4C63D] mb-6">
        College Management System
      </h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Department" element={<Department />} />
        <Route path="/Course" element={<Course />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/Instructor" element={<Instructor />} />
        <Route path="/AddStudent" element={<AddStudent />} />
        <Route path="/AddInstructor" element={<AddInstructor />} />
        <Route path="/AddCourse" element={<AddCourse />} />
        <Route path="/AddDepartment" element={<AddDepartment />} />
        <Route path="/DepartmentDisplay" element={<Departmentdisplay />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="/ExamSchedular" element={<ExamScheduler />} />
      </Routes>
    </div>
  );
}

export default Display;
