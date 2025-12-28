import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaConciergeBell, FaUtensils, FaSwimmer, FaWifi, FaSpa, FaCar } from "react-icons/fa";
import LandNavbar from "./LandNavbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const services = [
  {
    bg: "/assets/img/bed.jpeg",
    icon: <FaConciergeBell size={40} />,
    title: "24/7 Room Service",
    description: "Our concierge is ready to assist with any request.",
    list: ["Tour Bookings", "Restaurant Reservations", "Emergency Assistance", "City Guides"],
  },
  {
    bg: "/assets/img/chairs.jpeg",
    icon: <FaUtensils size={40} />,
    title: "Fine Dining",
    description: "Savor exquisite dishes prepared by our expert chefs.",
    list: ["Breakfast Buffet", "Lunch Menu", "Dinner Specials", "Private Dining"],
  },
  {
    bg: "/assets/img/pool.jpeg",
    icon: <FaSwimmer size={40} />,
    title: "Swimming Pool",
    description: "Relax and unwind in our luxurious pool area.",
    list: ["Indoor & Outdoor Pools", "Poolside Bar", "Swimming Lessons", "Family Friendly"],
  },
  {
    bg: "/assets/img/door.jpeg",
    icon: <FaWifi size={40} />,
    title: "Free High-Speed Wi-Fi",
    description: "Stay connected anytime with seamless internet access.",
    list: ["Lobby Wi-Fi", "In-Room Wi-Fi", "Conference Areas", "Outdoor Zones"],
  },
  {
    bg: "/assets/img/yoga.webp",
    icon: <FaSpa size={40} />,
    title: "Spa & Wellness",
    description: "Relax, refresh and rejuvenate your body and mind.",
    list: ["Massages", "Sauna & Steam", "Beauty Treatments", "Yoga Sessions"],
  },
  {
    bg: "/assets/img/airport.jpeg",
    icon: <FaCar size={40} />,
    title: "Airport Shuttle",
    description: "Comfortable and reliable transportation services.",
    list: ["Pick-up & Drop-off", "Private Transfers", "Group Transport", "24/7 Service"],
  },
];

const OurServices = () => {
  const cardRefs = useRef([]);
 
  useEffect(() => {
    const cards = document.querySelectorAll(".service-card");
    const onScroll = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();

        if (rect.top < window.innerHeight - 50) {
          card.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    setTimeout(onScroll, 100);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-vh-100 text-dark bg-light">
      <LandNavbar />

      <section style={{ padding: "80px 0" }}>
        <Container>
          <h1 className="text-center fw-bold mb-4 fade-in" style={{ color: "#4a5546" }}>
            Our Services
          </h1>
          <p className="text-center mb-5 fs-5 fade-in">
            At <strong>GreenDoors</strong>, we provide world-class hospitality with
            modern facilities and dedicated service to ensure a memorable and
            comfortable stay for every guest.
          </p>

          <Row className="g-4">
            {services.map((service, index) => (
              <Col key={index} md={4}>
                <Card
                  ref={el => cardRefs.current[index] = el}
                  className="service-card text-center shadow-sm border-0 h-100"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    backgroundImage: `url(${service.bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    background: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)) url(${service.bg})`,
                    position: "relative",
                    color: "#fff",
                    height: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0,0,0,0.4)",
                    }}
                  />
                  <div style={{ position: "relative", padding: "20px" }}>
                    <div className="mb-3">{service.icon}</div>
                    <Card.Title style={{ fontWeight: "600" }}>{service.title}</Card.Title>

                    <Card.Text className="text-start">
                      <p>{service.description}</p>
                      <ul>
                        {service.list.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </Card.Text>

                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Footer />

      <style>{`
        /* Fade-in for section heading and paragraph */
        .fade-in {
          opacity: 0;
          animation: fadeIn 1.2s forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Service Card Animations */
        .service-card {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .service-card.show {
          opacity: 1;
          transform: translateY(0);
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .service-card ul {
          padding-left: 20px;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default OurServices;
