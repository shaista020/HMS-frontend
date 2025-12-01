import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const NavBar = () => {
  return (
    <nav
      className="navbar shadow-sm px-4"
      style={{ backgroundColor: "#4a5546", height: "67px" }}
    >
      <div className="d-flex ms-auto align-items-center">
         
        <input
          type="text"
          placeholder="Search..."
          className="form-control me-3"
          style={{ maxWidth: "200px" }}
        />
 
        <i className="bi bi-bell-fill text-white fs-4 me-3" style={{ cursor: "pointer" }}></i>
 
        <div className="dropdown">
          <img
            src="https://i.pravatar.cc/150?img=12"    
            alt="profile"
            width="40"
            height="40"
            className="rounded-circle dropdown-toggle"
            data-bs-toggle="dropdown"
            style={{ cursor: "pointer" }}
          />

          <ul className="dropdown-menu dropdown-menu-end mt-2">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item text-danger" href="#">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
