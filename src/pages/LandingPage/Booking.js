import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Booking.css";

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

      {/* Arrival Date */}
      <div className="booking-item d-flex flex-column">
        <label className="small fw-semibold text-secondary">Arrival Date</label>
        <DatePicker
          selected={arrivalDate}
          onChange={(date) => setArrivalDate(date)}
          dateFormat="dd/MM/yyyy"
          className="form-control border-0 fw-semibold custom-date"
        />
      </div>

      {/* Departure Date */}
      <div className="booking-item d-flex flex-column">
        <label className="small fw-semibold text-secondary">Departure Date</label>
        <DatePicker
          selected={departureDate}
          onChange={(date) => setDepartureDate(date)}
          dateFormat="dd/MM/yyyy"
          className="form-control border-0 fw-semibold custom-date"
        />
      </div>

      {/* Room & Guests */}
      <div className="booking-item d-flex flex-column">
        <label className="small fw-semibold text-secondary">Room & Guest</label>
        <div className="d-flex gap-2 align-items-center">
          <select
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            className="form-select border-0 fw-semibold custom-select"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <span>Room</span>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="form-select border-0 fw-semibold custom-select"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          <span>Guests</span>
        </div>
      </div>

      {/* Button */}
      <button className="btn btn-dark rounded-pill px-4 py-2 fw-semibold">
        SEARCH
      </button>
    </div>
  );
}

export default Booking;
