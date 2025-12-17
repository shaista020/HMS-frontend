import React, { useEffect } from "react";
import LandNavbar from "./LandNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
// Importing icons for the contact info section
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

const Contact = () => {
  // --- SCROLL REVEAL ANIMATION LOGIC ---
  // (Identical to Services and Events components)
  useEffect(() => {
    const cards = document.querySelectorAll(".contact-card-reveal");
    const onScroll = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        // Trigger animation when element is near the bottom of the viewport
        if (rect.top < window.innerHeight - 50) {
          card.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    // Trigger once on load just in case they are already visible
    setTimeout(onScroll, 100);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Custom themed button style (Cream bg, Green text)
  const btnStyle = {
    backgroundColor: "#f1e7d0",
    color: "#4a5546",
    fontWeight: "600",
    border: "none",
  };

  // Accent color for icons so they match the theme
  const iconColor = "#4a5546";

  return (
    <div
      className="min-vh-100 text-light position-relative"
      style={{ backgroundColor: "#4a5546" }}
    >
      <LandNavbar />

      {/* Main Content Container */}
      <div className="container py-5 mt-4">
        
        {/* HEADER SECTION (Fade-in animation) */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 mb-3 fade-in">Get in Touch</h1>
          <p className="fs-5 text-light opacity-75 fade-in mx-auto" style={{ maxWidth: "700px" }}>
            We’d love to hear from you. Whether you have a question about events,
            services, or availability, our team is ready to help.
          </p>
        </div>

        <div className="row g-5">
          {/* --- LEFT COLUMN: Contact Information --- */}
          <div className="col-lg-5 col-md-12">
            {/* We add 'contact-card-reveal' to animate this whole block */}
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 h-100 p-4 contact-card-reveal">
              <div className="card-body d-flex flex-column gap-4">
                <h3 className="fw-bold h4 mb-3">Contact Information</h3>

                {/* Address Info Block */}
                <div className="d-flex align-items-start">
                  <FaMapMarkerAlt size={24} color={iconColor} className="me-3 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="fw-semibold mb-1">Our Location</h5>
                    <p className="mb-0 text-muted">
                      123 Greenwoods Avenue,<br />
                      Hospitality District, City 54000
                    </p>
                  </div>
                </div>

                {/* Phone Info Block */}
                <div className="d-flex align-items-start">
                  <FaPhoneAlt size={22} color={iconColor} className="me-3 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="fw-semibold mb-1">Phone Number</h5>
                    <p className="mb-0 text-muted">+1 (555) 123-4567</p>
                    <p className="mb-0 text-muted">+1 (555) 987-6543</p>
                  </div>
                </div>

                 {/* Email Info Block */}
                 <div className="d-flex align-items-start">
                  <FaEnvelope size={22} color={iconColor} className="me-3 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="fw-semibold mb-1">Email Address</h5>
                    <p className="mb-0 text-muted">info@greendoors.com</p>
                    <p className="mb-0 text-muted">events@greendoors.com</p>
                  </div>
                </div>

                {/* Hours Info Block */}
                <div className="d-flex align-items-start">
                  <FaClock size={22} color={iconColor} className="me-3 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="fw-semibold mb-1">Reception Hours</h5>
                    <p className="mb-0 text-muted">Mon - Sun: 24/7 Open</p>
                  </div>
                </div>

                {/* Simple Map Placeholder (Optional Visual) */}
                <div className="mt-auto pt-4 rounded-4 overflow-hidden" style={{height: '200px', background: '#ddd'}}>
                   {/* You would replace this iframe with a real Google Maps embed link */}
                   <iframe 
                     title="Map placeholder"
                     width="100%" 
                     height="100%" 
                     style={{border:0, filter: 'grayscale(30%) contrast(1.2) opacity(0.8)'}} 
                     loading="lazy" 
                     allowFullScreen 
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.985131!3d40.758896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes+Square!5e0!3m2!1sen!2sus!4v1510579767545">
                   </iframe>
                </div>

              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Contact Form --- */}
          <div className="col-lg-7 col-md-12">
             {/* The form card also gets the reveal animation class */}
            <div className="card bg-light text-dark border-0 shadow-sm rounded-4 p-4 contact-card-reveal">
              <h3 className="fw-bold h3 mb-4">Send us a Message</h3>
              <form>
                <div className="row g-3 col-16">
                  {/* Name Field */}
                  <div className="col-md-6">
                    <label htmlFor="nameInput" className="form-label fw-semibold">Your Name</label>
                    <input type="text" className="form-control form-control-lg rounded-3 bg-white border-light-subtle" id="nameInput" placeholder="John Doe" />
                  </div>
                  {/* Email Field */}
                  <div className="col-md-6">
                    <label htmlFor="emailInput" className="form-label fw-semibold">Your Email</label>
                    <input type="email" className="form-control form-control-lg rounded-3 bg-white border-light-subtle" id="emailInput" placeholder="name@example.com" />
                  </div>
                  {/* Subject Field */}
                  <div className="col-12">
                    <label htmlFor="subjectInput" className="form-label fw-semibold">Subject</label>
                    <input type="text" className="form-control form-control-lg rounded-3 bg-white border-light-subtle" id="subjectInput" placeholder="Event Inquiry..." />
                  </div>
                  {/* Message Textarea */}
                  <div className="col-12">
                    <label htmlFor="messageBox" className="form-label fw-semibold">Message</label>
                    <textarea className="form-control form-control-lg rounded-3 bg-white border-light-subtle" id="messageBox" rows="10" placeholder="How can we help you?"></textarea>
                  </div>
                  {/* Submit Button */}
                  <div className="col-12 mt-4">
                    <button type="button" className="btn btn-lg w-100 py-3 themed-btn" style={btnStyle}>
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* --- CSS STYLES --- */}
      <style>{`
        /* Header fade-in animation */
        .fade-in {
          opacity: 0;
          animation: fadeIn 1.2s forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Scroll Reveal Animation Classes */
        .contact-card-reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .contact-card-reveal.show {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hover effect for the main cards */
        .contact-card-reveal:hover {
           box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
        }

        /* Subtle hover effect for the themed button */
        .themed-btn:hover {
             opacity: 0.9;
             transform: scale(1.01);
             transition: all 0.2s ease;
        }

        /* Ensure form inputs look crisp on the light card background */
        .form-control:focus {
            border-color: #4a5546;
            box-shadow: 0 0 0 0.25rem rgba(74, 85, 70, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Contact;