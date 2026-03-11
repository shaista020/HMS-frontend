import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaConciergeBell,
  FaUtensils,
  FaSwimmer,
  FaWifi,
  FaSpa,
  FaCar,
} from "react-icons/fa";
import LandNavbar from "./LandNavbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import yoga from "../../assets/images/img/yoga.webp";
import pool from "../../assets/images/img/pool.jpeg";

const services = [
  {
    bg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    icon: <FaConciergeBell size={40} />,
    title: "24/7 Room Service",
    description: "Our concierge is ready to assist with any request.",
    list: ["Tour Bookings", "Restaurant Reservations", "Emergency Assistance", "City Guides"],
  },
  {
    bg: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
    icon: <FaUtensils size={40} />,
    title: "Fine Dining",
    description: "Savor exquisite dishes prepared by our expert chefs.",
    list: ["Breakfast Buffet", "Lunch Menu", "Dinner Specials", "Private Dining"],
  },
  {
    
   bg:pool,
    icon: <FaSwimmer size={40} />,
    title: "Swimming Pool",
    description: "Relax and unwind in our luxurious pool area.",
    list: ["Indoor & Outdoor Pools", "Poolside Bar", "Swimming Lessons", "Family Friendly"],
  },
  {
    bg: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    icon: <FaWifi size={40} />,
    title: "Free High-Speed Wi-Fi",
    description: "Stay connected anytime with seamless internet access.",
    list: ["Lobby Wi-Fi", "In-Room Wi-Fi", "Conference Areas", "Outdoor Zones"],
  },
  { 
    bg: yoga,
    icon: <FaSpa size={40} />,
    title: "Spa & Wellness",
    description: "Relax, refresh and rejuvenate your body and mind.",
    list: ["Massages", "Sauna & Steam", "Beauty Treatments", "Yoga Sessions"],
  },
  {
    bg: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop",
    icon: <FaCar size={40} />,
    title: "Airport Shuttle",
    description: "Comfortable and reliable transportation services.",
    list: ["Pick-up & Drop-off", "Private Transfers", "Group Transport", "24/7 Service"],
  },
];

const OurServices = () => {
  const cardRefs = useRef([]);

  /* Scroll animation */
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

  /* Lazy load background images */
  useEffect(() => {
    const bgElements = document.querySelectorAll(".service-bg");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bg = entry.target.getAttribute("data-bg");
            entry.target.style.backgroundImage = `url(${bg})`;
            entry.target.classList.add("loaded");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    bgElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      <LandNavbar />

      <section style={{ padding: "80px 0" }}>
        <Container>
          <h1 className="text-center fw-bold mb-4 fade-in" style={{ color: "#4a5546" }}>
            Our Services
          </h1>
          <p className="text-center mb-5 fs-5 fade-in">
            At <strong>GreenDoors</strong>, we provide world-class hospitality with modern
            facilities and dedicated service.
          </p>

          <Row className="g-4">
            {services.map((service, index) => (
              <Col key={index} md={4}>
                <Card
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="service-card border-0 h-100 text-center"
                >
                  <div className="service-bg" data-bg={service.bg}></div>
                  <div className="service-overlay"></div>

                  <div className="service-content">
                    <div className="mb-3">{service.icon}</div>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text className="text-start">
                      <p>{service.description}</p>
                      <ul>
                        {service.list.map((item, i) => (
                          <li key={i}>{item}</li>
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
        .fade-in {
          opacity: 0;
          animation: fadeIn 1.2s forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .service-card {
          position: relative;
          height: 400px;
          border-radius: 16px;
          overflow: hidden;
          color: #fff;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.6s ease;
        }

        .service-card.show {
          opacity: 1;
          transform: translateY(0);
        }

        .service-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: blur(10px);
          transform: scale(1.1);
          opacity: 0;
          transition: opacity 0.6s ease;
          z-index: 1;
        }

        .service-bg.loaded {
          opacity: 1;
        }

        .service-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 2;
        }

        .service-content {
          position: relative;
          z-index: 3;
          padding: 20px;
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.35);
        }
      `}</style>
    </div>
  );
};

export default OurServices;
