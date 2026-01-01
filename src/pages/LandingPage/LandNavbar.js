import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/LOGO.png";
  
const LandNavbar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.pathname);

  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top px-2" style={{ backgroundColor: "#4a5546" }}>
      <div className="container-fluid d-flex align-items-center">

        <Link to="/" className="text-decoration-none">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle overflow-hidden"
              style={{ width: "60px", height: "60px" , marginLeft:"20px"}}
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
                className={`nav-link ${activeSection === "/" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/About"
                className={`nav-link ${activeSection === "/About" ? "active" : ""}`}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Services"
                className={`nav-link ${activeSection === "/Services" ? "active" : ""}`}
              >
                Service
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Events"
                className={`nav-link ${activeSection === "/Events" ? "active" : ""}`}
              >
                Event
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Contact"
                className={`nav-link ${activeSection === "/Contact" ? "active" : ""}`}
              >
                Contact
              </Link>
            </li>
          </ul>

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

      <style>{`
        body {
          padding-top: 50px; 
        }
      `}</style>
    </nav>
  );
};

export default LandNavbar;
