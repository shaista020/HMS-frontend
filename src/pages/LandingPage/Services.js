import React, { useEffect } from "react";
import LandNavbar from "./LandNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBed,
  FaUtensils,
  FaSwimmer,
  FaBroom,
  FaBuilding,
  FaCar,
  FaConciergeBell,
  FaShieldAlt,
  FaLaptopCode
} from "react-icons/fa";

const Services = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".service-card");
    const onScroll = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          card.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-vh-100 text-light"
      style={{ backgroundColor: "#4a5546" }}
    >
      <LandNavbar />

      <div className="container py-5 mt-4">
        <h1 className="text-center fw-bold mb-4 fade-in">Our Services</h1>

        <p className="text-center mb-5 fs-5 fade-in">
          At <strong>GreenDoors</strong>, we provide world-class hospitality with
          modern facilities and dedicated service to ensure a memorable and
          comfortable stay for every guest.
        </p>

        {/* SERVICES GRID */}
        <div className="row g-4">

          {/* Luxury Rooms */}
          <div className="col-lg-4 col-md-6">
            <div className="card service-card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <FaBed size={40} className="text-secondary mb-3" />
              <h3 className="fw-semibold mb-3">Luxury Accommodation</h3>
              <p>Relax in beautifully furnished rooms designed for comfort.</p>
              <ul>
                <li>High-speed WiFi</li>
                <li>Smart TV & Workspace</li>
                <li>Daily Room Service</li>
                <li>Complimentary Toiletries</li>
              </ul>
            </div>
          </div>

          {/* Fine Dining */}
          <div className="col-lg-4 col-md-6">
            <div className="card service-card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <FaUtensils size={40} className="text-secondary mb-3" />
              <h3 className="fw-semibold mb-3">Fine Dining & Room Service</h3>
              <p>Indulge in a diverse menu crafted by expert chefs.</p>
              <ul>
                <li>Continental & Local Cuisine</li>
                <li>Buffet Breakfast</li>
                <li>24/7 Room Service</li>
              </ul>
            </div>
          </div>

          {/* Wellness */}
          <div className="col-lg-4 col-md-6">
            <div className="card service-card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <FaSwimmer size={40} className="text-secondary mb-3" />
              <h3 className="fw-semibold mb-3">Wellness & Recreation</h3>
              <p>Unwind with gym, pool, spa, and wellness activities.</p>
              <ul>
                <li>Outdoor Swimming Pool</li>
                <li>Fully Equipped Gym</li>
                <li>Spa & Massage Therapy</li>
              </ul>
            </div>
          </div>

          {/* Housekeeping */}
          <div className="col-lg-4 col-md-6">
            <div className="card service-card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <FaBroom size={40} className="text-secondary mb-3" />
              <h3 className="fw-semibold mb-3">Housekeeping & Laundry</h3>
              <p>Enjoy a spotless environment maintained daily.</p>
              <ul>
                <li>Daily Housekeeping</li>
                <li>Express Laundry</li>
                <li>Linen Replacement</li>
              </ul>
            </div>
          </div>

          {/* Events */}
          <div className="col-lg-4 col-md-6">
            <div className="card service-card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <FaBuilding size={40} className="text-secondary mb-3" />
              <h3 className="fw-semibold mb-3">Events & Banquets</h3>
              <p>Perfect venues for weddings, meetings, and celebrations.</p>
              <ul>
                <li>Banquet & Wedding Hall</li>
                <li>Conference Rooms</li>
                <li>Event Management</li>
                <li>Audio/Visual Support</li>
              </ul>
            </div>
          </div>

          {/* Transportation */}
          <div className="col-lg-4 col-md-6">
            <div className="card service-card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <FaCar size={40} className="text-secondary mb-3" />
              <h3 className="fw-semibold mb-3">Transportation Services</h3>
              <p>Comfortable pickup and travel services anytime.</p>
              <ul>
                <li>Airport Shuttle</li>
                <li>Car Rentals</li>
                <li>24/7 Taxi Service</li>
              </ul>
            </div>
          </div>

          {/* Concierge */}
          <div className="col-lg-4 col-md-6">
            <div className="card service-card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <FaConciergeBell size={40} className="text-secondary mb-3" />
              <h3 className="fw-semibold mb-3">Concierge Assistance</h3>
              <p>Our concierge is ready to assist with any request.</p>
              <ul>
                <li>Tour Bookings</li>
                <li>Restaurant Reservations</li>
                <li>Emergency Assistance</li>
                <li>City Guides</li>
              </ul>
            </div>
          </div>

          {/* NEW — Business Center */}
          <div className="col-lg-4 col-md-6">
            <div className="card service-card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <FaLaptopCode size={40} className="text-secondary mb-3" />
              <h3 className="fw-semibold mb-3">Business Center & Workspace</h3>
              <p>Professional workspaces designed for productivity.</p>
              <ul>
                <li>High-Speed Internet</li>
                <li>Private Workstations</li>
                <li>Printing & Scanning</li>
                <li>Meeting Rooms</li>
              </ul>
            </div>
          </div>

          {/* NEW — Security Services */}
          <div className="col-lg-4 col-md-6">
            <div className="card service-card bg-light text-dark border-0 shadow-sm rounded-4 p-4 h-100">
              <FaShieldAlt size={40} className="text-secondary mb-3" />
              <h3 className="fw-semibold mb-3">Security & Safety</h3>
              <p>Your safety is our highest priority.</p>
              <ul>
                <li>24/7 Surveillance</li>
                <li>Secure Room Locks</li>
                <li>Fire Safety Systems</li>
                <li>Emergency Response Team</li>
              </ul>
            </div>
          </div>

        </div>
        {/* END GRID */}
      </div>

      {/* Animation Styles */}
      <style>{`
        .fade-in {
          opacity: 0;
          animation: fadeIn 1.2s forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .service-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.4s ease-in-out;
        }

        .service-card.show {
          opacity: 1;
          transform: translateY(0);
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 15px 30px rgba(0,0,0,0.25);
        }
      `}</style>
    </div>
  );
};

export default Services;
