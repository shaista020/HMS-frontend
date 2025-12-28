import React, { useEffect } from "react";
import LandNavbar from "./LandNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaUser,
  FaPhone,
  // IoMdCall  ,
} from "react-icons/fa";
import { IoMdCall } from "react-icons/io";

import Footer from "./Footer";
const Contact = () => {
  const navyBlue = "#4a5546";

  useEffect(() => {
    const cards = document.querySelectorAll(".contact-card-reveal");
    const onScroll = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          card.classList.add("show");
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    setTimeout(onScroll, 100);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      <LandNavbar />

      <div className="container py-5 mt-4">
         
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 mb-3 fade-in">Get in Touch</h1>
          <p className="fs-5 text-dark opacity-75 fade-in mx-auto" style={{ maxWidth: "700px" }}>
            We’d love to hear from you. Whether you have a question about events,
            services, or availability, our team is ready to help.
</p>
        <div className="row g-0 shadow-lg rounded overflow-hidden">
          
          {/* ================= LEFT SECTION ================= */}
          <div className="col-md-6 bg-white border-end">
            <div
              className="text-center py-4 text-white"
              style={{ backgroundColor: navyBlue }}
            >
              <h4 className="fw-bold mb-0">Get In Touch With Us Now!</h4>
            </div>

            <div className="row g-0 text-center">
              
              <div className="col-6 p-4 border-bottom border-end" style={{ minHeight: "220px" }}>
                <IoMdCall Alt size={34} color={navyBlue} className="mb-3" />
                <h5 className="fw-bold" style={{ color: navyBlue }}>Phone Number</h5>
                <p className="text-muted">+91 80004 36640</p>
              </div>

              {/* Email */}
              <div className="col-6 p-4 border-bottom" style={{ minHeight: "220px" }}>
                <FaEnvelope size={34} color={navyBlue} className="mb-3" />
                <h5 className="fw-bold" style={{ color: navyBlue }}>Email</h5>
                <p className="text-muted mb-1">info@expertwebdesigning.com</p>
                <p className="text-muted">sales@expertwebdesigning.com</p>
              </div>

              {/* Location */}
              <div className="col-6 p-4 border-end" style={{ minHeight: "220px" }}>
                <FaMapMarkerAlt size={34} color={navyBlue} className="mb-3" />
                <h5 className="fw-bold" style={{ color: navyBlue }}>Location</h5>
                <p className="text-muted">
                  518, Rhythm Plaza, Amar Javan Circle,
                  <br />Nikol, Ahmedabad – 382350
                </p>
              </div>

              {/* Hours */}
              <div className="col-6 p-4" style={{ minHeight: "220px" }}>
                <FaClock size={34} color={navyBlue} className="mb-3" />
                <h5 className="fw-bold" style={{ color: navyBlue }}>Working Hours</h5>
                <p className="text-muted mb-1">Monday – Saturday</p>
                <p className="text-muted">09:00 AM – 06:00 PM</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SECTION ================= */}
        <div className="col-md-6 shadow-sm" style={{ backgroundColor: "#dcdcdc", borderRadius: "8px", overflow: "hidden" }}>
      {/* Header */}
      <div
        className="text-center py-4 text-white"
        style={{ backgroundColor: navyBlue }}
      >
        <h4 className="fw-bold mb-0" style={{ letterSpacing: "1px" }}>Contact Us</h4>
      </div>

      {/* Form */}
      <div className="p-4">
        <form className="container py-2">
          <div className="row g-4">
            
            {/* First Name */}
            <div className="col-12 col-md-6">
              <div className="input-group border-0   rounded-3 overflow-hidden">
                <span className="input-group-text bg-white border-0 pe-0 ps-3">
                  <FaUser size={14} color="#333" />
                </span>
                <input
                  type="text"
                  className="form-control border-0 py-2 ps-2 fw-semibold"
                  placeholder="First Name *"
                  required
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="col-12 col-md-6">
              <div className="input-group border-0 shadow-sm rounded-3 overflow-hidden">
                <span className="input-group-text bg-white border-0 pe-0 ps-3">
                  <FaUser size={14} color="#333" />
                </span>
                <input
                  type="text"
                  className="form-control border-0 py-2 ps-2 fw-semibold"
                  placeholder="Last Name"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>

            {/* Mobile */}
            <div className="col-12 col-md-6">
              <div className="input-group border-0 shadow-sm rounded-3 overflow-hidden">
                <span className="input-group-text bg-white border-0 pe-0 ps-3">
                  <IoMdCall  size={18} color="#333" />
                </span>
                <input
                  type="text"
                  className="form-control border-0 py-2 ps-2 fw-semibold"
                  placeholder="Mobile No *"
                  required
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="col-12 col-md-6">
              <div className="input-group border-0 shadow-sm rounded-3 overflow-hidden">
                <span className="input-group-text bg-white border-0 pe-0 ps-3">
                  <FaEnvelope size={14} color="#333" />
                </span>
                <input
                  type="email"
                  className="form-control border-0 py-2 ps-2 fw-semibold"
                  placeholder="Email ID *"
                  required
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>

            {/* Message */}
            <div className="col-12">
              <textarea
                className="form-control border-0 shadow-sm rounded-3 py-3 fw-semibold"
                rows="4"
                placeholder="Message"
                style={{ fontSize: "14px", resize: "none" }}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="col-12 text-center pt-2">
              <button
                type="submit"
                className="btn px-5 py-2 text-white fw-bold rounded-pill shadow-sm"
                style={{ backgroundColor: navyBlue, transition: "0.3s" }}
              >
                Submit <FaPaperPlane className="ms-2" size={14} />
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>

</div>

        </div>
      </div>
       <Footer />
    </div>
    
  );
};

export default Contact;
