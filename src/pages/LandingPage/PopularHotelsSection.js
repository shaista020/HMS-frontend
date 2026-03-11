import React from "react";
import { Button, Card } from 'react-bootstrap';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./HighlightSection.css";
import bed3 from "../../assets/images/img/bed3.jpg";

function PopularHotelsSection() {
  const hotels = [
    {
      name: "Capital Business Hotel",
      location: "Bali, Indonesia",
      price: 1200,
       img: bed3
    },
    {
      name: "Hotel Super Winer 96",
      location: "Bali, Indonesia", 
      price: 1199,
       img: bed3 
    },
    {
      name: "Super Gotel Collection",
      location: "Tulungagung, Indonesia",
      price: 1099,
       img: bed3
    },
  ];

  // Data for the three arched images in the highlight section
 

  return (
    <div className="container my-5">
      
      {/* 1. Original Popular Hotels Section */}
      
      <div className="text-center mb-5">
        <h2 className="fw-bold">Our Popular Hotels We Recommend for You</h2>
        <p className="text-muted">
          We offer a curated selection of luxury hotels for unforgettable stays. Explore our top recommendations and find your perfect stay.
        </p>
      </div>

      <div className="row g-4">
        {hotels.map((hotel, idx) => (
          <div key={idx} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>

              <img
                src={hotel.img}
                className="card-img-top"
                alt={hotel.name}
              />
              <Card.Body>

                <Card.Title className="fw-bold">{hotel.name}</Card.Title>

                {/* Location + Price in one line */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center gap-1">
                    <LocationOnIcon style={{ fontSize: "24px", color: "#4a5546" }} />
                    <span>{hotel.location}</span>
                  </div>
                  <span className="fw-bold" style={{ color: "#4a5546" }}>${hotel.price} / night</span>
                </div>

                {/* Center Button */}
                <div className="text-center mt-3">
                  <Button 
                    className="btn btn-outline-custom mt-3 fw-bold"
                  >
                    Book Now
                  </Button>
                </div>

              </Card.Body>
            </div>
          </div>
        ))}
      </div>

      
      {/* 2. New Highlight & Statistics Section (Matching Image Design) */}

      

      {/* Top Text Section (Matching Image) */}
     
      
    </div>
  );
}

export default PopularHotelsSection;