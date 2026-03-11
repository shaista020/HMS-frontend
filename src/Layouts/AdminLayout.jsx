// AdminLayout.jsx
import React, { useState } from "react";
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
// import "./AdminLayout.css"; // optional extra CSS

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 992);

  console.log("AdminLayout rendered. sidebarOpen =", sidebarOpen);

  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar at top */}
      <NavBar />

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <div
          className={`flex-grow-1 main-content ${sidebarOpen ? "" : "expanded"}`}
          style={{ marginTop: "60px" }} // offset for navbar
        >
          {children || <div>Admin Dashboard Content Here</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
