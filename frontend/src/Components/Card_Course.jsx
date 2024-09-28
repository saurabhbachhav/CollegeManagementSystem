import React, { useContext, useState } from "react";
import course from "../assets/course.jpg";
import { useNavigate } from "react-router-dom";


function Card_Course(props) {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleCardClick = () => {
    navigate("/DepartmentDisplay", {
      state: { departmentId: props.id, departmentName: props.name },
    });
  };

  return (
    <div>
      <div
        className="w-60 m-4 rounded-xl overflow-hidden shadow-lg bg-[#2C2C2C] hover:bg-[#3a3a3a] hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        onClick={handleCardClick}
      >
        <img src={course} alt="..." className="w-full h-fit object-cover" />
        <div className="px-3 py-1">
          <h5 className="text-xl font-bold m-2 text-[#F4C63D] ">
            {props.name}
          </h5>
          <span className="text-base text-white">
            <h1>Department Id :{props.id}</h1>
            <h1>Department Head : {props.head}</h1>
          </span>
          {/* <button className="rounded-md m-4 bg-[#0bf42e] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#F4C63D] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:bg-[#0bf42e] focus:ring-offset-2">
            Update
          </button>
          <button className="rounded-md m-4 bg-[#FF6F61] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#F4C63D] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:bg-[#FF6F61] focus:ring-offset-2">
            Delete
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Card_Course;
