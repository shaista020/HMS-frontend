import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#2d362a", color: "#fff", fontFamily: 'serif' }}>

      <div style={{ backgroundColor: "#272e23ff", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <Container className="py-5">
          <Row className="align-items-center">
            <Col md={7}>

              <h2 className="display-6 mb-0" style={{ fontFamily: "'Crimson Text', serif", fontWeight: "400" }}>
                Subscribe to News and Resources
              </h2>
            </Col>

            <Col md={5} className="d-flex justify-content-md-end mt-4 mt-md-0">
              <div
                className="d-flex align-items-center bg-white rounded-pill px-2 shadow-sm"
                style={{ width: "100%", maxWidth: "400px", height: "55px" }}
              >
                <Form.Control
                  type="email"
                  placeholder="youremail@gmail.com"
                  className="border-0 shadow-none bg-transparent ps-4"
                  style={{ color: "#666" }}
                />
                <Button
                  className="rounded-circle d-flex align-items-center justify-content-center p-0"
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "none",
                    width: "42px",
                    height: "42px"
                  }}
                >
                  <i
                    className="bi bi-arrow-up-right text-white"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "900",

                      transform: "scale(1.2)"
                    }}
                  ></i>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div style={{ backgroundColor: "#354033" }}>
        <Container className="py-4">
          <Row className="align-items-center">

            <Col md={3} className="d-flex align-items-center mb-3 mb-md-0">
              <div className="me-2" style={{ width: "30px", height: "30px", border: "2px solid #fff", borderRadius: "50%", display: "grid", placeItems: "center" }}>
                <div style={{ width: "12px", height: "12px", backgroundColor: "#fff", borderRadius: "2px" }}></div>
              </div>
              <span className="fw-bold fs-5" style={{ fontFamily: "sans-serif", letterSpacing: "0.5px" }}>GreenDoors</span>
            </Col>

            <Col md={6}>
              <ul className="list-unstyled d-flex justify-content-center gap-4 mb-3 mb-md-0">
                {[
                  { name: "Home", path: "/" },
                  { name: "About Us", path: "/about" },
                  { name: "Service", path: "/services" },
                  { name: "Event", path: "/events" },
                  { name: "Contact Us", path: "/contact" }, 
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-decoration-none text-light opacity-75 small"
                      style={{ transition: "0.3s", fontFamily: "sans-serif" }}
                      onMouseEnter={(e) => (e.target.style.opacity = "1")}
                      onMouseLeave={(e) => (e.target.style.opacity = "0.75")}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>

            <Col md={3} className="text-md-end text-center d-flex align-items-center justify-content-md-end justify-content-center">
              {[
                { icon: "bi bi-facebook", url: "#" },
                { icon: "bi bi-instagram", url: "#" },
                { icon: "bi bi-youtube", url: "#" },
                { icon: "bi bi-twitter-x", url: "#" }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="text-decoration-none d-inline-flex align-items-center justify-content-center"
                  style={{
                    transition: "all 0.3s ease",
                    color: "rgba(255, 255, 255, 0.6)",
                    marginLeft: "24px",
                    fontSize: "18px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(245, 240, 240, 1)";
                    e.currentTarget.style.transform = "translateY(0px)";
                  }}
                  aria-label={`social-link-${index}`}
                >
                  <i className={item.icon}></i>
                </a>
              ))}
            </Col>

          </Row>
        </Container>
      </div>

    </footer>
  );
};

export default Footer;