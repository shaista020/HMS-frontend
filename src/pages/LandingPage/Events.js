import React, { useEffect } from "react";
import LandNavbar from "./LandNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
const Events = () => {
  // Data with the image added to the last card
  const events = [
    {
      title: "Corporate Conference 2025",
      date: "March 18, 2025",
      description:
        "Experience a professional environment with state-of-the-art conference halls, premium catering, and full technical support.",
      img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1950&q=80",
    },
    {
      title: "Wedding Ceremony",
      date: "April 2, 2025",
      description:
        "Celebrate your special day in our luxurious banquet hall with elegant décor and premium event arrangements.",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1950&q=80",
    },
    {
      title: "Music Night Event",
      date: "May 20, 2025",
      description:
        "Enjoy an unforgettable night with live performances, themed lighting, and a breathtaking ambiance.",
      img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1950&q=80",
    },
    {
      title: "Birthday Party",
      date: "July 10, 2025",
      description:
        "A stylish and joyful setup tailored to make your birthday celebration truly memorable.",
      img: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1950&q=80",
    },
    {
      title: "Private Dinner Night",
      date: "August 15, 2025",
      description:
        "Enjoy a romantic candlelight dinner with premium cuisine and a luxurious ambiance.",
      img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1950&q=80",
    },
    {
      title: "Annual Charity Gala",
      date: "September 25, 2025",
      description:
        "A sophisticated evening of fundraising, fine dining, and entertainment in our grand ballroom.",
      // --- IMAGE ADDED HERE ---
      img: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    },
  ];
 
  useEffect(() => {
    const cards = document.querySelectorAll(".event-card");
    const onScroll = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        
        if (rect.top < window.innerHeight - 50) {
          card.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    // Trigger once on load in case elements are already in view
    setTimeout(onScroll, 100);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Custom button colors from the original draft
  const btnStyle = {
    backgroundColor: "#4a5546",
    color: "#fff",
    fontWeight: "600",
    border: "none",
  };

  return (
    <div
      className="min-vh-100 text-light"
       
    >
      <LandNavbar />

      <div className="container py-5 mt-4">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 mb-3 fade-in" style={{ color: "#4a5546" }}>Our Events</h1>
          <p className="fs-5 text-dark opacity-75 fade-in">
            Hosting unforgettable moments with elegance, comfort, and premium
            hospitality.
          </p>
        </div>

        {/* EVENTS GRID */}
        <div className="row g-4">
          {events.map((event, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              {/* Using the same card structure style as Services:
                  bg-light, text-dark, rounded-4, shadow-sm.
                  Added 'overflow-hidden' so the image corners match the border radius.
              */}
              <div className="card event-card bg-light text-dark border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                {/* Image Container */}
                <div style={{ height: "220px", overflow: "hidden" }}>
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-100 h-100 object-fit-cover"
                    // Adding a slight zoom effect on hover just for the image 
                    style={{ transition: "transform 0.5s ease" }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                  />
                </div>

                {/* Card Body */}
                <div className="card-body p-4 d-flex flex-column">
                  <div className="mb-auto">
                    <h3 className="fw-bold h4 mb-1">{event.title}</h3>
                    <p className="text-muted small mb-3 fw-semibold">
                      {event.date}
                    </p>
                    <p className="card-text">{event.description}</p>
                  </div>

                  <button
                    className="btn mt-4 w-100 py-2"
                    style={btnStyle}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section (Adapted from draft to Bootstrap) */}
        <div className="row mt-5 pt-5 justify-content-center">
            <div className="col-lg-8 text-center fade-in">
                 <div className="p-5 rounded-4 shadow-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
                    <h2 className="fw-bold mb-3" style={{ color: "#4a5546" }}>Plan Your Next Event With Us</h2>
                    <p className="fs-5 mb-4 opacity-75 text-dark">From weddings to conferences, we bring excellence and elegance to every occasion.</p>
                    <a href="/contact" className="btn btn-lg px-5" style={btnStyle}>Contact Us</a>
                 </div>
            </div>
        </div>
      </div>

      {/* CSS Animations (Copied and adapted from Services component) */}
      <style>{`
        .fade-in {
          opacity: 0;
          animation: fadeIn 1.2s forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Renamed from .service-card to .event-card */
        .event-card {
          opacity: 0;
          transform: translateY(50px); /* Starts a bit lower for dramatic effect */
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .event-card.show {
          opacity: 1;
          transform: translateY(0);
        }

        .event-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3) !important; /* stronger shadow on hover */
        }

        /* Subtle hover effect for the button */
        .event-card button:hover, a[href="/contact"]:hover {
             opacity: 0.9;
             transform: scale(1.02);
             transition: all 0.2s ease;
        }
      `}</style>
       <Footer />
    </div>
  );
};

export default Events;