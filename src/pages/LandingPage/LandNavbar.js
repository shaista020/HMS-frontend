import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/GreeenDoors.png"; // adjust the path as needed

const LandNavbar = ({ activeSection }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-2">
      <div className="container-fluid d-flex align-items-center">
        {/* Logo */}
        <Link to="/" className="text-decoration-none">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle overflow-hidden"
              style={{ width: "50px", height: "50px" }}
            >
              <img
                src={logo}
                alt="Logo"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
            <h4 className="fw-bold mb-0 text-light">GreenDoors</h4>
          </div>
        </Link>

        {/* Hamburger toggle */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar items */}
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-4 me-lg-4">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${activeSection === "#home" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
<<<<<<< HEAD
              <Link
                to="#service"
                className={`nav-link ${activeSection === "#service" ? "active" : ""}`}
              >
                Service
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="#event"
                className={`nav-link ${activeSection === "#event" ? "active" : ""}`}
              >
                Event
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="#blog"
                className={`nav-link ${activeSection === "#blog" ? "active" : ""}`}
              >
                Blog
              </Link>
            </li>
            <li className="nav-item">
=======
>>>>>>> dawood/lending_page/complete
              <Link
                to="/About"
                className={`nav-link ${activeSection === "/About" ? "active" : ""}`}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="/Services"
                className={`nav-link ${activeSection === "/Services" ? "active" : ""}`}
              >
                Service
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/Events"
                className={`nav-link ${activeSection === "/Events" ? "active" : ""}`}
              >
                Event
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/Contact"
                className={`nav-link ${activeSection === "/Contact" ? "active" : ""}`}
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Buttons */}
          <div className="d-flex ms-lg-auto mt-3 mt-lg-0 gap-2">
            <Link
              to="/signup"
              className="btn btn-outline-light rounded-pill px-3"
            >
              Signup
            </Link>
            <Link
              to="/signin"
              className="btn btn-light rounded-pill px-3 fw-semibold"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandNavbar;
