import React from "react";
import { useNavigate } from "react-router-dom";  // react-router hook
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
        <a className="navbar-brand fw-bold text-success fs-3" href="#">
          🏨 HotelEase
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav me-4">
            <li className="nav-item mx-2">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#">Rooms</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
          
          {/* 🔹 Navigate on click */}
          <button
            className="btn btn-success rounded-pill px-4 login-btn"
            onClick={() => navigate("/signin")}
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section (same as before) */}
      <section className="container d-flex flex-column flex-lg-row align-items-center py-5">
        <div className="col-lg-6 text-center text-lg-start">
          <h1 className="fw-bold display-4">
            Experience Luxury with <span className="text-success">HotelEase</span>
          </h1>
          <p className="mt-3 fs-5 text-muted">
            Manage bookings, rooms, staff, and guests with our professional Hotel
            Management System. Simple, fast, and reliable.
          </p>
          <div className="mt-4">
            <button className="btn btn-success rounded-pill px-4 me-3">
              Get Started
            </button>
            <button className="btn btn-outline-success rounded-pill px-4">
              Learn More
            </button>
          </div>
        </div>

        <div className="col-lg-6 text-center mt-5 mt-lg-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            alt="Hotel"
            className="img-fluid rounded-4 shadow-lg hero-img"
          />
        </div>
      </section>
    </div>
  );
}
