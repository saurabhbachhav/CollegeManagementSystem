import React from "react";
import "./index.css"; // Ensure Tailwind CSS is imported here
import Navbar from "./Components/Navbar.jsx";
import Display from "./Components/Display.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import { AuthProvider } from "./Components/Context/Authentication.context.jsx"; // Adjust the path to where your AuthProvider is located

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap your components with AuthProvider */}
      
        {/* Navbar at the top */}
        <Navbar />

        <div className="flex flex-1">
          {/* Sidebar on the left side */}
          <Sidebar />
        </div>
        {/* Main display area */}
        <div className="flex-1 ml-64">
          <Display />
        </div>
    </AuthProvider>
  );
}

export default App;
