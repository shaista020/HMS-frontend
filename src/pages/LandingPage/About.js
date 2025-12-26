import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import LandNavbar from "./LandNavbar";
import Footer from "./Footer";

const teamMembers = [
  { name: "John Doe", role: "Hotel Manager", image: "/assets/img/boy.png" },
  { name: "Jane Smith", role: "Head Chef", image: "/assets/img/woman.png" },
  { name: "Michael Lee", role: "Receptionist", image: "/assets/img/women.png" },
];

const AboutUs = () => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <LandNavbar />

      <section style={{ color: "#4A5546", padding: "80px 0" }}>
        <Container>
          <Row className="align-items-center">

            <Col md={6}>
              <h1 style={{ fontWeight: "700", fontSize: "3rem" }}>About Our Hotel</h1>
              <p style={{ fontSize: "1.2rem", margin: "20px 0" }}>
                Welcome to GreenDoors! Experience premium hospitality with modern amenities, comfort, and unforgettable service designed for every guest.
              </p>
              <button
                className="btn"
                style={{
                  backgroundColor: "#4A5546",
                  color: "#fff",
                  fontWeight: "600",
                  padding: "10px 25px",
                  borderRadius: "8px"
                }}
                size="lg"
              >
                Learn More
              </button>
            </Col>

            <Col md={6}>
              <img
                src="/assets/img/about_bg.avif"
                alt="GreenDoors Hotel"
                style={{ width: "100%", borderRadius: "15px", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: "80px 0" }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 style={{ fontWeight: "700", color: "#333" }}>Our Mission & Vision</h2>
              <p style={{ color: "#555", maxWidth: "700px", margin: "10px auto" }}>
                We strive to provide exceptional hospitality with comfort, luxury, and memorable experiences.
              </p>
            </Col>
          </Row>
          <Row className="text-center g-4">
            {/* Mission Card */}
            <Col md={4}>
              <Card className="p-4 shadow-sm h-100 mission-card" style={{ borderRadius: "15px", transition: "all 0.3s" }}>
                <h4 style={{ fontWeight: "600" }}>Our Mission</h4>
                <p style={{ color: "#555" }}>
                  Deliver exceptional hospitality through high-quality services, comfortable accommodations, and unforgettable experiences.
                </p>
              </Card>
            </Col>

            {/* Vision Card */}
            <Col md={4}>
              <Card className="p-4 shadow-sm h-100 mission-card" style={{ borderRadius: "15px", transition: "all 0.3s" }}>
                <h4 style={{ fontWeight: "600" }}>Our Vision</h4>
                <p style={{ color: "#555" }}>
                  To be the most preferred hotel recognized for excellence, comfort, and guest satisfaction.
                </p>
              </Card>
            </Col>

            {/* Goals Card */}
            <Col md={4}>
              <Card className="p-4 shadow-sm h-100 mission-card" style={{ borderRadius: "15px", transition: "all 0.3s" }}>
                <h4 style={{ fontWeight: "600" }}>Our Goals</h4>
                <p style={{ color: "#555" }}>
                  Ensure seamless booking experiences, maintain eco-friendly operations, and consistently exceed guest expectations at GreenDoors.
                </p>
              </Card>
            </Col>
          </Row>

        </Container>
      </section>

      {/* Team Section */}
      <section style={{ backgroundColor: "#f8f9fa", padding: "80px 0" }}>
        <Container>
          <h2 className="text-center mb-5" style={{ fontWeight: "700", color: "#333" }}>Meet Our Team</h2>
          <Row className="g-4 justify-content-center">
            {teamMembers.map((member, index) => (
              <Col md={4} key={index}>
                <Card className="text-center border-0 shadow team-card" style={{ borderRadius: "15px", transition: "all 0.3s" }}>
                  <Card.Img
                    variant="top"
                    src={member.image}
                    alt={member.name}
                    style={{
                      borderRadius: "50%",
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      margin: "20px auto 10px",
                      border: "4px solid #4A5E46",
                      transition: "transform 0.3s",
                    }}
                  />
                  <Card.Body>
                    <Card.Title style={{ fontWeight: "600", color: "#333" }}>{member.name}</Card.Title>
                    <Card.Text style={{ color: "#555" }}>{member.role}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Footer />

      <style>{`
        .mission-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .team-card:hover img {
          transform: scale(1.1);
        }
        .team-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
