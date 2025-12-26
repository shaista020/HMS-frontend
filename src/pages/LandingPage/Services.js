import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaConciergeBell, FaUtensils, FaSwimmer, FaWifi, FaSpa, FaCar } from "react-icons/fa";
import LandNavbar from "./LandNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
const services = [
  {
    icon: <FaConciergeBell size={40} />,
    title: "24/7 Room Service",
    description: "Our concierge is ready to assist with any request.",
    list: ["Tour Bookings", "Restaurant Reservations", "Emergency Assistance", "City Guides"],
  },
  {
    icon: <FaUtensils size={40} />,
    title: "Fine Dining",
    description: "Savor exquisite dishes prepared by our expert chefs.",
    list: ["Breakfast Buffet", "Lunch Menu", "Dinner Specials", "Private Dining"],
  },
  {
    icon: <FaSwimmer size={40} />,
    title: "Swimming Pool",
    description: "Relax and unwind in our luxurious pool area.",
    list: ["Indoor & Outdoor Pools", "Poolside Bar", "Swimming Lessons", "Family Friendly"],
  },
  {
    icon: <FaWifi size={40} />,
    title: "Free Wi-Fi",
    description: "Stay connected with high-speed internet in all areas.",
    list: ["Lobby Wi-Fi", "Rooms Wi-Fi", "Conference Wi-Fi", "Outdoor Wi-Fi Zones"],
  },
  {
    icon: <FaSpa size={40} />,
    title: "Spa & Wellness",
    description: "Rejuvenate yourself at our world-class spa.",
    list: ["Massages", "Sauna & Steam", "Beauty Treatments", "Yoga Classes"],
  },
  {
    icon: <FaCar size={40} />,
    title: "Airport Shuttle",
    description: "Convenient transportation to and from the airport.",
    list: ["Pick-up & Drop-off", "Private Cars", "Group Transfers", "24/7 Availability"],
  },
];

const OurServices = () => {
  return (
     <div
      className="min-vh-100 text-light"
     
    >
      <LandNavbar />

      <div className="container mt-4"> 
    <section style={{ padding: "80px 0" }}>
      <Container>
         <h1 className="text-center fw-bold mb-4 fade-in" style={{ color: "#4a5546" }}>Our Services</h1>

        <p className="text-center mb-5 fs-5 fade-in text-dark">
          At <strong>GreenDoors</strong>, we provide world-class hospitality with
          modern facilities and dedicated service to ensure a memorable and
          comfortable stay for every guest.
        </p>
        <Row className="g-4">
          {services.map((service, index) => (
            <Col key={index} md={4}>
              <Card
                className="text-center p-4 shadow-sm border-0 h-100 service-card"
                style={{ transition: "transform 0.3s", cursor: "pointer", backgroundColor: "#e8ebe8ff" }}
              >
                <div className="mb-3" style={{ color: "#4a5546" }}>
                  {service.icon}
                </div>
                <Card.Title style={{ fontWeight: "600" }}>{service.title}</Card.Title>
                <Card.Text className="text-start">
                  <p>{service.description}</p>
                  <ul>
                    {service.list.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Inline CSS for hover effect */}
      <style>{`
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
    </div>
     <Footer />
    </div>
  );
};

export default OurServices;
