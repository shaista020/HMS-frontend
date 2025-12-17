import React from "react";
import LandNavbar from "./LandNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div
      className="min-vh-100 text-light"
      style={{ backgroundColor: "#4a5546" }}
    >
      <LandNavbar />

      <div className="container py-5 mt-4">
        <h1 className="text-center fw-bold mb-4">About Us – Green Doors</h1>

        <p className="text-center mb-5 fs-5">
          Welcome to <strong>GreenDoors</strong>, where comfort meets class.
          Our mission is to provide guests with a seamless, luxurious, and
          memorable stay, supported by modern technology and exceptional hospitality.
        </p>

        {/* GRID START */}
        <div className="row g-4">

          {/* Who We Are */}
          <div className="col-lg-4 col-md-6">
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <h3 className="fw-semibold mb-3">Who We Are</h3>
              <p>
                GreenDoors is a premium hospitality brand designed to redefine
                the guest experience. We offer elegant rooms, fine dining, and 
                modern amenities designed for absolute comfort.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="col-lg-4 col-md-6">
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <h3 className="fw-semibold mb-3">Our Mission</h3>
              <p>
                To deliver <strong>comfort, reliability, and excellence</strong>{" "}
                in every aspect of a guest’s stay, supported by smart hotel
                management systems and dedicated service.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="col-lg-4 col-md-6">
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <h3 className="fw-semibold mb-3">Our Vision</h3>
              <ul>
                <li>Outstanding guest experience</li>
                <li>Exceptional service quality</li>
                <li>Clean, modern accommodation</li>
                <li>Technology-driven operations</li>
                <li>Safe & peaceful environment</li>
              </ul>
            </div>
          </div>

          {/* What We Offer */}
          <div className="col-lg-4 col-md-6">
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <h3 className="fw-semibold mb-3">What We Offer</h3>
              <ul>
                <li>Comfortable & stylish rooms</li>
                <li>Fast & easy booking</li>
                <li>24/7 customer support</li>
                <li>Modern facilities (Wi-Fi, dining, lounges)</li>
                <li>Clean & hygienic environment</li>
              </ul>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="col-lg-4 col-md-6">
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <h3 className="fw-semibold mb-3">Why Choose Us?</h3>
              <ul>
                <li>Professional, friendly staff</li>
                <li>Advanced hotel management system</li>
                <li>Quick check-in & check-out</li>
                <li>Transparent pricing</li>
                <li>Personalized guest service</li>
                <li>Peaceful & well-maintained property</li>
              </ul>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="col-lg-4 col-md-6">
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <h3 className="fw-semibold mb-3">Our Commitment</h3>
              <p>
                At GreenDoors, we don’t just provide a room—we provide 
                a <strong>premium experience</strong> where every guest feels 
                valued, respected, and completely at home.
              </p>
            </div>
          </div>

          {/* OUR STORY */}
          <div className="col-lg-4 col-md-6">
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <h3 className="fw-semibold mb-3">Our Story</h3>
              <p>
                GreenDoors began with a vision to create a space where guests 
                could enjoy comfort without complexity. Today, we are proud to 
                be a trusted name in hospitality known for reliability and warmth.
              </p>
            </div>
          </div>

          {/* OUR VALUES */}
          <div className="col-lg-4 col-md-6">
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <h3 className="fw-semibold mb-3">Our Values</h3>
              <ul>
                <li>Integrity & honesty</li>
                <li>Respect for every guest</li>
                <li>Commitment to excellence</li>
                <li>Innovation & improvement</li>
                <li>Eco-friendly operations</li>
              </ul>
            </div>
          </div>

          {/* SUSTAINABILITY */}
          <div className="col-lg-4 col-md-6">
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <h3 className="fw-semibold mb-3">Sustainability Practices</h3>
              <ul>
                <li>Energy-efficient lighting</li>
                <li>Waste management systems</li>
                <li>Eco-friendly toiletries</li>
                <li>Water conservation</li>
                <li>Locally sourced food ingredients</li>
              </ul>
            </div>
          </div>

          {/* TEAM */}
          <div className="col-lg-4 col-md-6">
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <h3 className="fw-semibold mb-3">Our Team</h3>
              <p>
                Our experienced staff—including managers, chefs, 
                housekeeping, and support teams—work 24/7 to 
                ensure every guest enjoys a comfortable and smooth stay.
              </p>
            </div>
          </div>

          {/* GUEST TRUST */}
          <div className="col-lg-4 col-md-6">
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <h3 className="fw-semibold mb-3">Guest Trust & Reviews</h3>
              <ul>
                <li>4.8★ rating across major platforms</li>
                <li>95% guest satisfaction</li>
                <li>Trusted for trips, vacations & events</li>
                <li>High repeat-guest ratio</li>
              </ul>
            </div>
          </div>

          {/* TECHNOLOGY */}
          <div className="col-lg-4 col-md-6">
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <h3 className="fw-semibold mb-3">Modern Technology</h3>
              <ul>
                <li>Smart digital booking</li>
                <li>Contactless check-in/out</li>
                <li>Smart room access</li>
                <li>Real-time room availability</li>
                <li>Automated housekeeping alerts</li>
              </ul>
            </div>
          </div>

        </div>
        {/* GRID END */}
      </div>
    </div>
  );
};

export default About;
