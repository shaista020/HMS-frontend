import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// pages
import "./LandingPage.css";
import Booking from "./Booking";
import PopularHotelsSection from "./PopularHotelsSection";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
 
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

//logo
import logo from "../assets/images/GreeenDoors.png";
 
import LandNavbar from "./LandNavbar";

function LandingPage() {
  
  const archImages = [
    "/assets/img/bed1.jpg",
    "/assets/img/bed3.jpg",
    "/assets/img/bed2.jpg",
  ];

  // Statistics updated to match the image content
  const statistics = [
    { value: "800+", label: "Cities" },
    { value: "35,000+", label: "Exclusive Hotels" },
    { value: "1.5M+", label: "Exclusive Rooms" },
  ];
  const mainImage = "/assets/img/bed1.jpg";
  const img1 = "/assets/img/bed3.jpg";
  const img2 = "/assets/img/bed2.jpg";
  const img3 = "/assets/img/bed1.jpg";

  const smallArticles = [
    {
      title: "Hotels Go Beyond Accommodation",
      summary:
        "Discover how modern hotels are creating truly memorable experiences by focusing on personalized services, unique amenities, and immersive local culture.",
      image: img1,
    },
    {
      title: "Luxury Reimagined",
      summary:
        "Iconic hotels around the world are undergoing stunning renovations to blend heritage with contemporary luxury. ",
      image: img2,
    },
    {
      title: "Preserving History",
      summary:
        "Heritage hotels are not just places to stay—they are living museums. Learn how these hotels preserve architectural beauty, historical artifacts, and cultural traditions while offering modern comforts to their guests.",
      image: img3,
    },
  ];

  return (
    <div>
      {" "}
      {/* <-- added padding here */}
      <div className="landing-section overflow-hidden ">
        <div className=" landing-page-wrapper px-3 px-lg-5">
          
          {/* Navbar */}
          <LandNavbar />

          {/* Hero Section */}
          <div className="hero container-fluid">
            <div className="hero-text col-12 col-lg-6">
              <h1 className="display-5 fw-bold">
                Your Gateway <br /> to Comfort and <br /> Convenience.
              </h1>
              <p className="lead mt-3">Book now and get the best prices</p>
            </div>
            <div className="hero-image col-12 col-lg-5 position-relative text-center">
              <div className="image-frame">
                <img
                  src="/assets/img/lending_img.jpg"
                  alt="Hero"
                  className="img-fluid rounded"
                />
                <div className="circle-outline"></div>
                <div className="sparkle"></div>
              </div>
            </div>
          </div>

          {/* Booking Bar */}
          <Booking />
        </div>
        {/* Partner Logos */}
        <div className="partner-logos d-flex flex-wrap justify-content-around align-items-center py-4 gap-3">
          <p>🏨 Hotel Santika</p>
          <p>🏩 Tauzia</p>
          <p>🏠 Horison</p>
          <p>🛎️ Artotel</p>
          <p>🌍 Wyndham</p>
          <p>🏰 Shangrila</p>
          <p>🏨 IHG</p>
        </div> 
      </div>
      {/* Additional content */}
      <PopularHotelsSection />
      {/* =============================== highlight-section======================================= */}
      <div className="highlight-section position-relative">
        <div className="text-center pt-5">
          <h3 className="fw-bold mb-3 display-6">
            Unforgettable Memories
            <br />
            Unparalleled Comfort
          </h3>
          <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
            Experience ultimate travel comfort with our innovative hotel booking
            app. Explore a curated collection of exclusive hotels worldwide for
            an unforgettable accommodation experience.
          </p>
          <button className="btn btn-outline-custom mt-3 fw-bold">
            READ MORE
          </button>
        </div>

        {/* Image Cards Section */}
        <div className="d-flex justify-content-center flex-wrap gap-5 highlight-images mt-5">
          {archImages.map((img, idx) => (
            <div
              key={idx}
              className={`highlight-img-card ${
                idx === Math.floor(archImages.length / 2) ? "center-card" : ""
              }`}
            >
              <img
                src={img}
                alt={`Highlight ${idx}`}
                className="img-fluid rounded"
              />
            </div>
          ))}
        </div>

        {/* Green Statistics Block */}
        <div className="stats-block mt-4 w-100 position-relative">
          <div className="row g-0 align-items-center justify-content-center">
            {/* Left Text */}
            <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center text-white p-4 side-txt text-lg-start text-center">
              <h5 className="mb-2 txt">With Our Experience</h5>
              <h2 className="fw-bold mt-3 txt">We Will Serve You</h2>
              <div className="deco-circles mt-4 justify-content-lg-start justify-content-center">
                <div className="circle-deco"></div>
                <div className="circle-deco"></div>
                <div className="circle-deco"></div>
                <div className="circle-deco"></div>
              </div>
            </div>

            {/* Right Statistics */}
            <div className="col-lg-5 col-md-12 stats-right text-light text-center text-lg-start">
              <div className="row">
                <div className="col-4 stat-item">
                  <h1 className="stat-number">800+</h1>
                  <p className="stat-label">Cities</p>
                </div>
                <div className="col-4 stat-item">
                  <h1 className="stat-number">35,000+</h1>
                  <p className="stat-label">Exclusive Hotels</p>
                </div>
                <div className="col-4 stat-item">
                  <h1 className="stat-number">1.5M+</h1>
                  <p className="stat-label">Exclusive Rooms</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider line + sparkle */}
          <div className="divider-container">
            <div className="divider-line"></div>
            <div className="sparkle-icon-wrapper sparkle-large">
              <svg
                className="sparkle-svg"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 0C50 35 100 50 100 50C50 65 50 100 50 100C50 65 0 50 0 50C50 35 50 0 50 0Z"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* =====================news-section=================================== */}
      <Container className="news-section mb-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title">Our Hot News</h2>
          <a href="/events" className="show-more-link">
            SHOW MORE <span className="arrow">→</span>
          </a>
        </div>

        <Row className="align-items-stretch">
          {/* Main Article */}
          <Col lg={7} className="mb-4 mb-lg-0">
            <Card className="main-article h-100">
              <Card.Img src={mainImage} className="main-img" />

              <Card.Body className="d-flex flex-column">
                <div className="article-meta text-muted small mb-2 d-flex justify-content-between">
                  <span className="d-flex align-items-center">
                    <AccessTimeIcon fontSize="small" className="me-1" /> 4 min
                    read
                  </span>

                  <span className="d-flex align-items-center">
                    <CalendarMonthIcon fontSize="small" className="me-1" /> 25
                    Nov 2025
                  </span>
                </div>

                <Card.Title className="main-title">
                  The Rise of Boutique Hotels: Personalized Hospitality
                </Card.Title>

                <Card.Text className="main-summary">
                  Explore the growing trend of boutique hotels offering unique
                  experiences...
                </Card.Text>

                <Link
                  to="#"
                  className="read-more-link mt-auto d-flex justify-content-end"
                >
                  Read More <span className="arrow">→</span>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Small Articles */}
          <Col lg={5}>
            {smallArticles.map((item, index) => (
              <div className="mini-article d-flex mb-4" key={index}>
                <img src={item.image} className="mini-img me-2" />

                <div className="d-flex flex-column flex-grow-1">
                  <h5 className="mini-title">{item.title}</h5>
                  <p className="mini-summary">{item.summary}</p>

                  <Link
                    to="#"
                    className="read-more-link mt-auto d-flex justify-content-end"
                  >
                    Read More <span className="arrow">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>


    <Testimonials/>

    <Footer />

    </div>

       
  );
}

export default LandingPage;
