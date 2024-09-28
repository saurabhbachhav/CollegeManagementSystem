// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("jwtToken"));
  const navigate = useNavigate();

  useEffect(() => {
    // Update token state from localStorage when the component mounts
    const storedToken = localStorage.getItem("jwtToken");
    setToken(storedToken);
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("jwtToken", newToken);
    navigate("/"); // Redirect to home or dashboard after login
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("jwtToken");
    // navigate("/Login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
