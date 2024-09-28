// Navbar.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/Context/Authentication.context"; // Adjust the path accordingly

function Navbar() {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext); // Get token and logout function from context

  const handleClick = () => {
    if (token) {
      logout(); // Call logout function from context
    } else {
      navigate("/Login"); // Navigate to login page if not logged in
    }
  };

  return (
    <div className="bg-[#003366] text-white shadow-lg sticky-top top-0 z-50">
      {/* Top Section: Logo and Institute Name */}
      <div className="flex items-center justify-between p-4">
        {/* Logo Image */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFhSyfwyIP9MOzQLVh04CNLsQdLvtEZ08e6A&s"
          alt="IIIT Nagpur Logo"
          className="h-12 w-12 object-contain"
        />
        {/* Institute Name */}
        <h1 className="text-2xl font-extrabold tracking-wide text-center flex-grow">
          Indian Institute Of Information Technology Nagpur
        </h1>

        {/* Login Button */}
        <div className="text-sm font-medium">
          <button
            className="p-2 m-1 border-2 border-[#0066CC] hover:bg-[#0066CC] hover:text-white transition duration-300 ease-in-out rounded"
            onClick={handleClick}
          >
            {token ? "Logout" : "Login"} {/* Conditional button text */}
          </button>
        </div>
      </div>

      {/* Bottom Section: Scrolling Text */}
      <div className="bg-[#002244]">
        <marquee direction="left" className="text-sm">
          <span className="text-[#F4C63D]">
            भारतीय सूचना प्रौद्योगिकी संस्थान, नागपुर (Indian Institute of
            Information Technology Nagpur)
          </span>
          {token ? (
            <span className="text-green-500 ml-11">
              You Are Logged In as an Admin
            </span>
          ) : (
            <span className="text-red-500 ml-11">
              Site is on view-only Mode (only Admins and Instructors can Login)
            </span>
          )}
        </marquee>
      </div>
    </div>
  );
}

export default Navbar;
