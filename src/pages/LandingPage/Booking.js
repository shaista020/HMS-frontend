import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Booking.css";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HotelIcon from "@mui/icons-material/Hotel";
import PeopleIcon from "@mui/icons-material/People";

function Booking() {
  const [place, setPlace] = useState("Bali, Indonesia");
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  return (
    <div className="booking-bar container-fluid d-flex flex-wrap justify-content-between align-items-center shadow-lg px-5 py-3 rounded-pill">
      
      {/* Place */}
      <div className="booking-item d-flex flex-column">
        <label className="large fw-semibold text-secondary">Place Hotel</label>
        <div className="d-flex align-items-center">
          <PlaceIcon style={{ color: "#4a5546", marginRight: "5px" }} />
          <select
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="form-select border-0 fw-semibold custom-select"
          >
            <option>Bali, Indonesia</option>
            <option>Jakarta, Indonesia</option>
            <option>Bangkok, Thailand</option>
            <option>Dubai, UAE</option>
          </select>
        </div>
      </div>

      {/* Arrival Date */}
      <div className="booking-item d-flex flex-column">
        <label className="small fw-semibold text-secondary">Arrival Date</label>
        <div className="d-flex align-items-center">
          <CalendarTodayIcon style={{ color: "#4a5546", marginRight: "5px" }} />
          <DatePicker
            selected={arrivalDate}
            onChange={(date) => setArrivalDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control border-0 fw-semibold custom-date"
          />
        </div>
      </div>

      {/* Departure Date */}
      <div className="booking-item d-flex flex-column">
        <label className="small fw-semibold text-secondary">Departure Date</label>
        <div className="d-flex align-items-center">
          <CalendarTodayIcon style={{ color: "#4a5546", marginRight: "5px" }} />
          <DatePicker
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control border-0 fw-semibold custom-date"
          />
        </div>
      </div>

      {/* Room & Guests */}
     <div className="booking-item d-flex flex-column">
  <label className="small fw-semibold text-secondary">Room & Guest</label>
  <div className="d-flex align-items-center" style={{ gap: "8px" }}>
    <HotelIcon style={{ color: "#4a5546", fontSize: "20px" }} />
    <select
      value={rooms}
      onChange={(e) => setRooms(e.target.value)}
      className="form-select border-0 fw-semibold custom-select"
      style={{ maxWidth: "60px", padding: "4px" }}
    >
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>

    <PeopleIcon style={{ color: "#4a5546", fontSize: "20px" }} />
    <select
      value={guests}
      onChange={(e) => setGuests(e.target.value)}
      className="form-select border-0 fw-semibold custom-select"
      style={{ maxWidth: "60px", padding: "4px" }}
    >
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
    </select>
  </div>
</div>


      {/* Button */}
      <button
        className="rounded-pill px-4 py-2 fw-semibold button"
         
      >
        SEARCH
      </button>
    </div>
  );
}

export default Booking;
