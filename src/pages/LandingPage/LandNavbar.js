import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/LOGO.png";
import './Navbar.css';

const LandNavbar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.pathname);

  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location.pathname]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top px-2" style={{ backgroundColor: "#4a5546" }}>
        <div className="container-fluid d-flex align-items-center">

          <Link to="/" className="text-decoration-none">
            <div className="d-flex align-items-center gap-2">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle overflow-hidden"
                style={{ width: "60px", height: "60px", marginLeft: "20px" }}
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

          {/* Hamburger toggle for small/medium screens */}
          <button
            className="navbar-toggler ms-auto d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar items for large screens */}
          <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarResponsive">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-4 me-lg-4">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${activeSection === "/" ? "active" : ""}`}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/About" className={`nav-link ${activeSection === "/About" ? "active" : ""}`}>About Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/Services" className={`nav-link ${activeSection === "/Services" ? "active" : ""}`}>Service</Link>
              </li>
              <li className="nav-item">
                <Link to="/Events" className={`nav-link ${activeSection === "/Events" ? "active" : ""}`}>Event</Link>
              </li>
              <li className="nav-item">
                <Link to="/Contact" className={`nav-link ${activeSection === "/Contact" ? "active" : ""}`}>Contact</Link>
              </li>
            </ul>

            <div className="d-flex ms-lg-auto gap-2">
              <Link to="/signup" className="btn btn-outline-light rounded-pill px-3">Signup</Link>
              <Link to="/signin" className="btn btn-light rounded-pill px-3 fw-semibold">LOGIN</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* OFFCANVAS SIDEBAR */}
      <div className="offcanvas offcanvas-start" style={{ backgroundColor: "#4a5546",width: "260px" }} tabIndex="-1" id="mobileSidebar" aria-labelledby="mobileSidebarLabel">
        <div className="offcanvas-header">
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
            <h5 className="mb-0 text-light">GreenDoors</h5>
          </div>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div className="offcanvas-body p-0">
          <ul className="navbar-nav flex-column gap-3 p-3">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${activeSection === "/" ? "active" : ""}`}  >Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/About" className={`nav-link ${activeSection === "/About" ? "active" : ""}`}  >About Us</Link>
            </li>
            <li className="nav-item">
              <Link to="/Services" className={`nav-link ${activeSection === "/Services" ? "active" : ""}`}  >Service</Link>
            </li>
            <li className="nav-item">
              <Link to="/Events" className={`nav-link ${activeSection === "/Events" ? "active" : ""}`}  >Event</Link>
            </li>
            <li className="nav-item">
              <Link to="/Contact" className={`nav-link ${activeSection === "/Contact" ? "active" : ""}`}  >Contact</Link>
            </li>
          </ul>

          <div className="d-flex flex-column p-3 gap-2">
            <Link to="/signup" className="btn btn-outline-light rounded-pill px-3"  >Signup</Link>
            <Link to="/signin" className="btn btn-light rounded-pill px-3 fw-semibold"  >LOGIN</Link>
          </div>
        </div>
      </div>

      <style>{`
        body {
          padding-top: 70px; /* adjust for navbar height */
        }
      `}</style>
    </>
  );
};

export default LandNavbar;
