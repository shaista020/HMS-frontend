import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const testimonials = [
  {
    text: `The app has a user-friendly interface, so I was quickly able to find
    hotels that fit our needs. I can see photos of the room, available amenities,
    and reviews from previous guests, which helps me make an informed decision.`,
    name: "Khomarun Balman",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    text: `Booking was smooth and hassle-free. The detailed listings and clear
    pricing made planning our stay very easy and stress-free.`,
    name: "Daniel Robert",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4
  }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const next = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
      setFade(true);
    }, 300);
  };

  const prev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[index];

  return (
    <section style={{ backgroundColor: "#f8f8f8", padding: "80px 0" }}>
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={12} md={10}>
 
            {/* <h2 className="fw-semibold mb-5">
               <span className="opacity-25 fs-1">“</span> 
               What Our <br /> Customers Say 
               <span className="opacity-25 fs-1"><i>"</i></span> </h2> */}


            {/* Heading */}
            <Row className="justify-content-center mb-4 position-relative" style={{ zIndex: 1 }}>
              <Col md={8}>
                <h2 style={{ 
                  fontFamily: "'Crimson Text', serif", 
                  fontSize: "2.5rem", 
                  fontWeight: "600",
                  color: "#1a1a1a" 
                }}>
                  What Our <br /> Customer Says
                </h2>
              </Col>
            </Row>

            {/* Flex wrapper for arrows + testimonial */}
            <div className="d-flex align-items-center justify-content-center" style={{ gap: "60px" }}>

              {/* Previous Arrow */}
              <Button
                variant="outline-dark"
                className="rounded-circle flex-shrink-0"
                onClick={prev}
                style={{ height: "45px", width: "45px" }}
              >
                <i className="bi bi-arrow-left"></i>
              </Button>

              {/* Testimonial Content */}
              <div className="text-center" style={{ maxWidth: "700px", zIndex: 1 }}>
                <p
                  className={`fs-5 text-muted mb-4 mx-auto ${fade ? "opacity-100" : "opacity-0"}`}
                  style={{ transition: "opacity 0.3s ease", lineHeight: "1.7" }}
                >
                  {t.text}
                </p>

                <div className="d-flex flex-column align-items-center mt-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="rounded-circle mb-2"
                    width="70"
                    height="70"
                    style={{ objectFit: "cover" }}
                  />
                  <strong>{t.name}</strong>

                  <div className="text-warning mt-1">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi ${i < t.rating ? "bi-star-fill" : "bi-star"}`}
                      ></i>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next Arrow */}
              <Button
                variant="outline-dark"
                className="rounded-circle flex-shrink-0"
                onClick={next}
                style={{ height: "45px", width: "45px" }}
              >
                <i className="bi bi-arrow-right"></i>
              </Button>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
