import React from "react";

const NavBar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{ backgroundColor: "#4a5546", height: "67px" }}
    >
      <a className="navbar-brand fw-bold" href="/">
        HMS
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link active" href="/">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/bookings">
              Bookings
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/rooms">
              Rooms
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/customers">
              Customers
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/staff">
              Staff
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
