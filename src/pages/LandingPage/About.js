import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import LandNavbar from "./LandNavbar";
import Footer from "./Footer";
import "./About.css";
import { Target, Eye, Flag } from 'lucide-react';
import { FaBullseye, FaLightbulb, FaBalanceScale } from "react-icons/fa";
const teamMembers = [
  { name: "Ameer Dawood", role: "Hotel Manager", image: "/assets/img/boy.png" },
  { name: "Shaista Tabbasum", role: "Head Chef", image: "/assets/img/woman.png" },
  { name: "Lalain Fatima", role: "Front Desk Manager", image: "/assets/img/women.png" },
];


const data = [
  {
    id: "01",
    title: "MISSION",
    text: "To provide seamless hotel operations through innovative management tools, enhancing guest experiences and staff efficiency.",
    color: "#18471fff",
    icon: <FaBullseye className="react-icon-style" />
  },
  {
    id: "02",
    title: "VISION",
    text: "To become the leading hotel management platform, delivering clarity, automation, and excellence to hospitality businesses worldwide.",
    color: "#18471fff",
    icon: <FaLightbulb className="react-icon-style" />
  },
  {
    id: "03",
    title: "VALUES",
    text: "Integrity, innovation, and customer focus guide all our solutions, ensuring trust, efficiency, and satisfaction for every hotel we serve.",
    color: "#18471fff",
    icon: <FaBalanceScale className="react-icon-style" />
  }
];


const getRoleDescription = (role) => {
  switch (role) {
    case "Hotel Manager":
      return "Oversees hotel operations, manages staff, ensures guest satisfaction, and maintains high service standards.";
    case "Front Desk Manager":
      return "Supervises front desk activities, handles guest check-ins and check-outs, and ensures smooth reception service.";
    case "Housekeeping Supervisor":
      return "Oversees housekeeping staff, ensures cleanliness, manages schedules, and maintains high standards for guest comfort.";
    case "IT & System Administrator":
      return "Manages hotel systems, ensures data security, maintains technical infrastructure, and supports operational efficiency.";
    case "Head Chef":
      return "Leads kitchen operations, maintains food quality, oversees menu execution, and ensures exceptional dining experiences.";
    case "Operations Manager":
      return "Coordinates daily hotel operations, manages inter-department workflows, and ensures efficiency across all services.";
    default:
      return "A dedicated hospitality professional delivering quality service, enhancing guest experiences, and supporting hotel operations.";
  }
};


const AboutUs = () => {
  return (
    <div style={{ backgroundColor: "#fff" }}>

      <LandNavbar />
      <section
        style={{
          color: "#4A5546",
          padding: "80px 0",
          background: "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('/assets/img/about_bg.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Container>
          <Row className="align-items-center">

            {/* Text Column */}
            <Col md={6}>
              <h1
                style={{
                  fontWeight: 700,
                  fontSize: "3rem",
                  marginBottom: "20px",
                  lineHeight: "1.2",
                  transition: "all 0.4s ease",
                }}
              >
                About Our Hotel
              </h1>
              <p
                style={{
                  fontSize: "1.2rem",
                  margin: "20px 0",
                  lineHeight: "1.8",
                  color: "#555",
                }}
              >
                Welcome to <strong>GreenDoors</strong>, where timeless elegance meets modern comfort.
                Nestled in a serene environment, GreenDoors is designed to offer a refined hospitality
                experience that blends luxury, warmth, and personalized service. From beautifully
                crafted interiors to thoughtfully curated amenities, every detail is created to make
                your stay relaxing and memorable.

              </p>

              <button
                className="btn"
                style={{
                  backgroundColor: "#4A5546",
                  color: "#fff",
                  fontWeight: 600,
                  padding: "12px 30px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 6px 15px rgba(74,85,70,0.3)",
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#507550"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#4A5546"}
              >
                Learn More
              </button>
            </Col>

            <Col md={6}>
              <img
                src="/assets/img/about_bg.avif"
                alt="GreenDoors Hotel"
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  objectFit: "cover",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
            </Col>

          </Row>
        </Container>
      </section>
      <section className="infographic-section">
        <Container>
          {/* Section Heading */}
          <div className="section-header text-center mb-5">
            <h2 className="text-center  " style={{
              fontWeight: "700",
              color: "#4A5546",
              fontSize: "42px",
              letterSpacing: "1px"
            }}>Our Mission, Vision & Values</h2>
            <p>Guiding principles that shape GreenDoors Hotel Management System, driving excellence in hospitality and operational efficiency.</p>
          </div>


          <Row className="justify-content-center py-5">
            {data.map((item, index) => (
              <Col lg={4} key={index}>
                <div className="card-wrapper">

                  {/* Visual Line Elements */}
                  <div className="design-line" style={{ borderColor: item.color }}>
                    <div className="line-start" style={{ backgroundColor: item.color }}></div>
                    <div className="line-end-stub" style={{ backgroundColor: item.color }}></div>
                  </div>

                  {/* The Floating Number Circle */}
                  <div className="step-circle" style={{ borderColor: item.color, color: item.color }}>
                    {item.id}
                  </div>

                  {/* Text Content */}
                  <div className="content-area text-center">
                    <div className="icon-box" style={{ color: item.color }}>
                      {item.icon}
                    </div>
                    <h4 className="step-title" style={{ color: item.color }}>{item.title}</h4>
                    <p className="step-desc">{item.text}</p>
                  </div>

                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>





      {/* Team Section */}
      <section style={{ backgroundColor: "#fdfdfd", padding: "80px 0" }}>
        <Container>
          <h2 className="text-center mb-5" style={{
            fontWeight: "800",
            color: "#4A5546",
            fontSize: "42px",
            letterSpacing: "1px"
          }}>
            Our Team
          </h2>

          <Row className="g-4">
            {teamMembers.map((member, index) => (
              <Col lg={4} md={6} key={index}>
                <Card className="team-card text-center">
                  {/* Frame with Image */}
                  <div className="team-img-wrapper">
                    <img src={member.image} alt={member.name} />
                  </div>

                  <Card.Body className="p-0">
                    <h4 className="team-name">{member.name}</h4>
                    <span className="team-role">{member.role}</span>

                    <p className="team-desc text-muted">
                      {getRoleDescription(member.role)}
                    </p>

                    <div className="team-social mt-3">
                      <i className="bi bi-facebook"></i>
                      <i className="bi bi-twitter"></i>
                      <i className="bi bi-linkedin"></i>
                    </div>
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
