import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaConciergeBell, FaUtensils, FaSwimmer, FaWifi, FaSpa, FaCar } from "react-icons/fa";
import LandNavbar from "./LandNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
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
}
,
  {
    bg: "/assets/img/airport.jpeg",
    icon: <FaCar size={40} />,
    title: "Airport Shuttle",
    description: "Comfortable and reliable transportation services.",
    list: ["Pick-up & Drop-off", "Private Transfers", "Group Transport", "24/7 Service"],
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
  className="shadow-sm text-center  border-0 h-100 service-card"
  style={{
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    backgroundImage: `url(${service.bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    background:`linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)) url(${service.bg})`,
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
      backgroundColor: "rgba(0,0,0,0.5)",  
    }}
  />
 
  <div style={{ position: "relative", padding: "20px" }}>
    <div className="mb-3" style={{ color: "#fff" }}>
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
  </div>
</Card>

            </Col>
          ))}
        </Row>
      </Container>
 
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
