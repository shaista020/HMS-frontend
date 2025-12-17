import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#3f4a38", color: "#fff" }}>
      
      {/* Newsletter Section */}
      <Container className="py-5 border-bottom border-light">
        <Row className="align-items-center">
        <Col md={6}>
            <h3 className="fw-semibold mb-3 mb-md-0">
            Subscribe to News and Resources
            </h3>
        </Col>

        <Col md={6} className="d-flex justify-content-md-end">
            <div
            className="d-flex align-items-center bg-white rounded-pill px-2"
            style={{ width: "360px", height: "56px" }}
            >
            <Form.Control
                type="email"
                placeholder="youremail@gmail.com"
                className="border-0 shadow-none bg-transparent ps-4"
            />

            <Button
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                backgroundColor: "#2f382a",
                border: "none",
                width: "40px",
                height: "40px"
                }}
            >
                →
            </Button>
            </div>
        </Col>
        </Row>

      </Container>

      {/* Bottom Footer */}
      <Container className="py-4">
        <Row className="align-items-center text-center text-md-start">

          {/* Logo */}
          <Col md={3} className="fw-semibold fs-5 mb-3 mb-md-0">
            GreenDoors
          </Col>

          {/* Links */}
        <Col md={6}>
        <ul className="list-unstyled d-flex justify-content-center gap-4 mb-3 mb-md-0">
            {[
            { name: "Home", path: "/" },
            { name: "Service", path: "/services" },
            { name: "Event", path: "/events" },
            { name: "About Us", path: "/about" }
            ].map((item) => (
            <li key={item.name}>
                <Link
                to={item.path}
                className="text-decoration-none text-light opacity-75 small"
                onMouseEnter={(e) => (e.target.style.opacity = "1")}
                onMouseLeave={(e) => (e.target.style.opacity = "0.75")}
                >
                {item.name}
                </Link>
            </li>
            ))}
        </ul>
        </Col>
          {/* Social Icons */}
        <Col md={3} className="text-md-end">
        {[
            { icon: "bi bi-globe", url: "https://yourwebsite.com" },
            { icon: "bi bi-instagram", url: "https://instagram.com/yourusername" },
            { icon: "bi bi-youtube", url: "https://youtube.com/@yourchannel" },
            { icon: "bi bi-twitter-x", url: "https://twitter.com/yourusername" }
        ].map((item, index) => (
            <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-light opacity-75 fs-6 ms-3 text-decoration-none"
            onMouseEnter={(e) => (e.target.style.opacity = "1")}
            onMouseLeave={(e) => (e.target.style.opacity = "0.75")}
            aria-label="social-link"
            >
            <i className={item.icon}></i>
            </a>
        ))}
        </Col>

        </Row>
      </Container>

    </footer>
  );
};

export default Footer;
