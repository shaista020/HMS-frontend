import React, { useEffect } from "react";
import LandNavbar from "./LandNavbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

import {
  FaEnvelope,
  FaPaperPlane,
  FaUser,
} from "react-icons/fa";
import { IoMdCall } from "react-icons/io";

const Contact = () => {
  const themeColor = "#4a5546";

  useEffect(() => {
    const cards = document.querySelectorAll(".fade-up");
    const onScroll = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          card.classList.add("fade-visible");
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-light min-vh-100">
      <LandNavbar />

      <div className="container py-5 mt-4">
        {/* Heading */}
        <div className="text-center mb-5 fade-up">
          <h1 className="fw-bold display-5">Get in Touch</h1>
          <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "720px" }}>
            We’d love to hear from you. Whether you have a question or need
            support, our team is always ready to help.
          </p>
        </div>

        {/* Main Card */}
        <div className="row g-0 shadow-lg rounded-1 overflow-hidden fade-up contact-container">

          {/* LEFT FORM */}
          <div className="col-md-6   border-end">
            <div
              className="text-center py-4 text-white"
              style={{ backgroundColor: themeColor }}
            >
              <h5 className="fw-bold mb-0">Contact Us</h5>
            </div>

            <div className="p-4">
              <form className="container-fluid">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-input-box">
                      <FaUser className="form-input-icon" />
                      <input type="text" placeholder="First Name *" required />
                    </div>
                  </div>


                  <div className="col-md-6">
                    <div className="form-input-box">
                      <FaUser />
                      <input type="text" placeholder="Last Name" />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-input-box">
                      <IoMdCall />
                      <input type="text" placeholder="Mobile No *" required />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-input-box">
                      <FaEnvelope />
                      <input type="email" placeholder="Email ID *" required />
                    </div>
                  </div>

                  <div className="col-12">
                    <textarea 
                      rows="5"
                      placeholder="Your Message"
                      className="form-message-box"
                    ></textarea>
                  </div>

                  <div className="col-12 text-center">
                    <button className="form-submit-btn" type="submit">
                      Send Message <FaPaperPlane />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT MAP */}
          {/* ================= RIGHT SECTION (STYLISH MAP) ================= */}
          <div className="col-md-6 shadow-sm" style={{ backgroundColor: "#dcdcdc", overflow: "hidden" }}>
            {/* Header */}
            <div
              className="text-center py-4 text-white"
              style={{ backgroundColor: themeColor }}
            >
              <h4 className="fw-bold mb-0" style={{ letterSpacing: "1px", height: "25px" }}>Our Location</h4>

            </div>

            {/* Map Wrapper */}
            <div
              className="flex-grow-1 position-relative"
              style={{
                borderRadius: "0 0 12px 0",
                overflow: "hidden",
              }}
            >
              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=Gulberg+III,+Lahore,+Punjab,+Pakistan&z=17&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  minHeight: "450px",
                  filter: "grayscale(10%) contrast(105%)",
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Overlay Card */}
              <div
                className="position-absolute bottom-0 start-0 m-3 p-3 bg-white shadow rounded-3"
                style={{ maxWidth: "260px" }}
              >
                <h6 className="fw-bold mb-1">
                  📍 Head Office
                </h6>

                <p className="mb-1 small text-muted">
                  Gulberg III, Lahore
                </p>

                <p className="mb-2 small fw-semibold">
                  Mon – Sat : 9:00 AM – 6:00 PM
                </p>


                {/* <p className="mb-1 small d-flex align-items-center gap-2 fw-semibold">
    <IoMdCall size={16} style={{ color: "#4a5546" }} />
    <a
      href="tel:+923001234567"
      className="text-decoration-none"
      style={{ color: "#4a5546" }}
    >
      +92 300 1234567
    </a>
  </p>
 
  <p className="mb-0 small d-flex align-items-center gap-2 fw-semibold">
    <FaEnvelope size={14} style={{ color: "#4a5546" }} />
    <a
      href="mailto:info@yourcompany.com"
      className="text-decoration-none"
      style={{ color: "#4a5546" }}
    >
      info@yourcompany.com
    </a>
  </p> */}
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
