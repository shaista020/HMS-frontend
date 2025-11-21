import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";
import Booking from "./Booking";
// import roomImage from "./room.jpg"; // replace with your image

function LandingPage() {
  return (
    <div className="landing-section">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-5">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div className="logo-circle"></div>
            <h4 className="fw-bold mb-0 text-light">GreenDoors</h4>
          </div>

          <ul className="navbar-nav d-none d-lg-flex gap-4">
            <li className="nav-item">
              <a href="#home" className="nav-link active">Home</a>
            </li>
            <li className="nav-item">
              <a href="#service" className="nav-link">Service</a>
            </li>
            <li className="nav-item">
              <a href="#event" className="nav-link">Event</a>
            </li>
            <li className="nav-item">
              <a href="#blog" className="nav-link">Blog</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">About Us</a>
            </li>
          </ul>

          <div>
            <button className="btn btn-outline-light me-2 rounded-pill px-3">Signup</button>
            <button className="btn btn-light rounded-pill px-3 fw-semibold">LOGIN</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero container-fluid d-flex flex-column flex-lg-row align-items-center justify-content-between text-light px-5">
        <div className="hero-text col-lg-6 mt-5 mt-lg-0">
          <h1 className="display-5 fw-bold">
            Your Gateway <br /> to Comfort and <br /> Convenience.
          </h1>
          <p className="lead mt-3">Book now and get the best prices</p>
        </div>

        <div className="hero-image col-lg-5 position-relative text-center">
          <div className="image-frame mx-auto">
           {/*  <img src={roomImage} alt="Hotel room" className="img-fluid rounded-circle" /> */}
            <div className="circle-outline"></div>
            <div className="sparkle"></div>
          </div>
        </div>
      </div>

      {/* Booking Bar */}
      < Booking/>

      {/* Booking Bar 
      <div className="booking-bar container-fluid d-flex flex-wrap justify-content-between align-items-center px-5 py-3 shadow-lg rounded-pill">
        <div className="booking-item">
          <label>Place Hotel</label>
          <div>📍 Bali, Indonesia ⌄</div>
        </div>
        <div className="booking-item">
          <label>Arrival Date</label>
          <div>📅 24/06/23 ⌄</div>
        </div>
        <div className="booking-item">
          <label>Departure Date</label>
          <div>📅 26/06/23 ⌄</div>
        </div>
        <div className="booking-item">
          <label>Room & Guest</label>
          <div>🛏️ 1 Room, 2 Guests ⌄</div>
        </div>
        <button className="btn btn-dark rounded-pill px-4 py-2 fw-semibold">SEARCH</button>
      </div> */}

      {/* Partner Logos */}
      <div className="partner-logos d-flex justify-content-around align-items-center flex-wrap py-4">
        <p>🏨 Hotel Santika</p>
        <p>🏩 Tauzia</p>
        <p>🏠 Horison</p>
        <p>🛎️ Artotel</p>
        <p>🌍 Wyndham</p>
        <p>🏰 Shangrila</p>
        <p>🏨 IHG</p>
      </div>
    </div>
  );
}

export default LandingPage;
