import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";
import Booking from "./Booking";
import PopularHotelsSection from "./PopularHotelsSection";
function LandingPage() {
  const [activeSection, setActiveSection] = useState(window.location.hash || "#home");

  useEffect(() => {
    const handleHashChange = () => setActiveSection(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
 const archImages = [
    "/assets/img/bed3.jpg",
   "/assets/img/bed3.jpg",
    "/assets/img/bed3.jpg"
  ];
  
  // Statistics updated to match the image content
  const statistics = [
    { value: "800+", label: "Cities" },
    { value: "35,000+", label: "Exclusive Hotels" },
    { value: "1.5M+", label: "Exclusive Rooms" },
  ];

  return (
    <div > {/* <-- added padding here */}
      <div className="landing-section overflow-hidden ">
<div className=" landing-page-wrapper px-3 px-lg-5">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-2">
          <div className="container-fluid d-flex align-items-center">
            {/* Logo */}
            <div className="d-flex align-items-center gap-2">
              <div className="logo-circle"></div>
              <h4 className="fw-bold mb-0 text-light">GreenDoors</h4>
            </div>

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
                  <a href="#home" className={`nav-link ${activeSection === "#home" ? "active" : ""}`}>Home</a>
                </li>
                <li className="nav-item">
                  <a href="#service" className={`nav-link ${activeSection === "#service" ? "active" : ""}`}>Service</a>
                </li>
                <li className="nav-item">
                  <a href="#event" className={`nav-link ${activeSection === "#event" ? "active" : ""}`}>Event</a>
                </li>
                <li className="nav-item">
                  <a href="#blog" className={`nav-link ${activeSection === "#blog" ? "active" : ""}`}>Blog</a>
                </li>
                <li className="nav-item">
                  <a href="#about" className={`nav-link ${activeSection === "#about" ? "active" : ""}`}>About Us</a>
                </li>
              </ul>

              {/* Buttons */}
             <div className="d-flex ms-lg-auto mt-3 mt-lg-0 gap-2">
      <Link to="/signup" className="btn btn-outline-light rounded-pill px-3">
        Signup
      </Link>
      <Link to="/signin" className="btn btn-light rounded-pill px-3 fw-semibold">
        LOGIN
      </Link>
    </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="hero container-fluid">
          <div className="hero-text col-12 col-lg-6">
            <h1 className="display-5 fw-bold">
              Your Gateway <br /> to Comfort and <br /> Convenience.
            </h1>
            <p className="lead mt-3">Book now and get the best prices</p>
          </div>
         <div className="hero-image col-12 col-lg-5 position-relative text-center">
  <div className="image-frame">
    <img
      src="/assets/img/lending_img.jpg"
      alt="Hero"
      className="img-fluid rounded"
    />
    <div className="circle-outline"></div>
    <div className="sparkle"></div>
  </div>
</div>

        </div>

        {/* Booking Bar */}
        <Booking />
</div>
        {/* Partner Logos */}
        <div className="partner-logos d-flex flex-wrap justify-content-around align-items-center py-4 gap-3">
          <p>🏨 Hotel Santika</p>
          <p>🏩 Tauzia</p>
          <p>🏠 Horison</p>
          <p>🛎️ Artotel</p>
          <p>🌍 Wyndham</p>
          <p>🏰 Shangrila</p>
          <p>🏨 IHG</p>
        </div>
      </div>

      {/* Additional content */}
      <PopularHotelsSection />
       <div className="highlight-section position-relative">
  {/* Top Text Section */}
  <div className="text-center pt-5">
    <h3 className="fw-bold mb-3 display-6">
      Unforgettable Memories<br />Unparalleled Comfort
    </h3>
    <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
      Experience ultimate travel comfort with our innovative hotel booking app. Explore a curated collection of exclusive hotels worldwide for an unforgettable accommodation experience.
    </p>
    <button className="btn btn-outline-custom mt-3 fw-bold">
      READ MORE
    </button>
  </div>

  {/* Image Cards Section */}
  <div className="d-flex justify-content-center flex-wrap gap-4 highlight-images mt-5">
    {archImages.map((img, idx) => (
      <div key={idx} className="highlight-img-card">
        <img src={img} alt={`Highlight ${idx}`} className="img-fluid rounded" />
      </div>
    ))}
  </div>

  {/* Green Statistics Block */}
 <div className="stats-block mt-4 w-100 position-relative">
  <div className="row g-0 align-items-center justify-content-center">
    
    {/* Left Text */}
    <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center text-white p-4 side-txt text-lg-start text-center">
      <h5 className="mb-2 txt">With Our Experience</h5>
      <h2 className="fw-bold mt-3 txt">We Will Serve You</h2>
      <div className="deco-circles mt-4 justify-content-lg-start justify-content-center">
        <div className="circle-deco"></div>
        <div className="circle-deco"></div>
        <div className="circle-deco"></div>
        <div className="circle-deco"></div>
      </div>
    </div>

    {/* Right Statistics */}
    <div className="col-lg-5 col-md-12 stats-right text-light text-center text-lg-start">
      <div className="row">
        <div className="col-4 stat-item">
          <h1 className="stat-number">800+</h1>
          <p className="stat-label">Cities</p>
        </div>
        <div className="col-4 stat-item">
          <h1 className="stat-number">35,000+</h1>
          <p className="stat-label">Exclusive Hotels</p>
        </div>
        <div className="col-4 stat-item">
          <h1 className="stat-number">1.5M+</h1>
          <p className="stat-label">Exclusive Rooms</p>
        </div>
      </div>
    </div>
  </div>

  {/* Divider line + sparkle */}
  <div className="divider-container">
    <div className="divider-line"></div>
    <div className="sparkle-icon-wrapper sparkle-large">
      <svg className="sparkle-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0C50 35 100 50 100 50C50 65 50 100 50 100C50 65 0 50 0 50C50 35 50 0 50 0Z" stroke="white" strokeWidth="2"/>
      </svg>
    </div>
  </div>
</div>

</div>

    </div>
  );
}

export default LandingPage;
