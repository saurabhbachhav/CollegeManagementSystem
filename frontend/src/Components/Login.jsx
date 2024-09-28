import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Components/Context/Authentication.context"; // Adjust the path according to your file structure
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [userpass, setUserPass] = useState("");
  const [message, setMessage] = useState(""); // State for success or error message

  const { login } = useContext(AuthContext); // Access the login function from context
   
  const navigation = useNavigate();
  const handleOnSubmit = async (event) => {
    event.preventDefault();
   
    const user = {
      Username: username,
      Userpass: userpass,
    };

    try {
      const response = await axios.post("http://localhost:8080/Login", user);
      const { message, token } = response.data;
      setMessage(message);

      // Use the login function from context to set the token
      login(token); // This will set the token in context and localStorage

      console.log("User Logged In Successfully");
      navigation("/");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      console.error("Unable To Proceed", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1E1E1E]">
      <form
        onSubmit={handleOnSubmit}
        className="bg-[#2C2C2C] shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-[#F4C63D] text-center mb-6">
          Login
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="text-sm font-semibold text-white"
            >
              Username
            </label>
            <input
              id="username"
              className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-semibold text-white"
            >
              Password
            </label>
            <input
              id="password"
              className="w-full border border-[#FF6F61] rounded-md px-3 py-2 bg-[#333333] text-white placeholder-gray-400 focus:border-[#F4C63D] focus:ring-2 focus:ring-[#F4C63D] focus:ring-opacity-50"
              type="password"
              placeholder="Enter Password"
              value={userpass}
              onChange={(e) => setUserPass(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          className="w-full py-3 bg-[#F4C63D] text-black font-bold rounded-md shadow-lg hover:bg-[#FF6F61] transition-colors"
          type="submit"
        >
          Login
        </button>
        {message && (
          <div
            className={`mt-4 p-3 text-center rounded-md ${
              message.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
