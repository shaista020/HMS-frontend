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
    <div className="container-fluid my-4 px-5 py-3">
      <div className="booking-bar row g-3 p-3 align-items-center">

        {/* Place */}
        <div className="form col-12 col-md-2 d-flex flex-column">
          <label className="form-label small fw-semibold text-secondary">
            Place Hotel
          </label>
          <div className="input-group">
            <span className="input-group-text bg-white border-0">
              <PlaceIcon />
            </span>
            <select
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="form-select border-0 fw-semibold"
            >
              <option>Bali, Indonesia</option>
              <option>Jakarta, Indonesia</option>
              <option>Bangkok, Thailand</option>
              <option>Dubai, UAE</option>
            </select>
          </div>
        </div>

        {/* Arrival Date */}
        <div className="col-6 col-md-2 d-flex flex-column">
          <label className="form-label small fw-semibold text-secondary">
            Arrival Date
          </label>
          <div className="input-group">
            <span className="input-group-text bg-white border-0">
              <CalendarTodayIcon />
            
            <DatePicker
              selected={arrivalDate}
              onChange={(date) => setArrivalDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control border-0 fw-semibold date-input"
            />
            </span>
          </div>
        </div>

        {/* Departure Date */}
        <div className="col-6 col-md-2 d-flex flex-column">
          <label className="form-label small fw-semibold text-secondary">
            Departure Date
          </label>
          <div className="input-group date-group">
  <span className="input-group-text bg-white border-0">
    <CalendarTodayIcon />
 
  <DatePicker
    selected={arrivalDate}
    onChange={(date) => setArrivalDate(date)}
    dateFormat="dd/MM/yyyy"
    className="form-control border-0 fw-semibold date-input"
  />
   </span>

</div>

        </div>

        {/* Rooms & Guests */}
        <div className="col-12 col-md-3 d-flex flex-column">
          <label className="form-label small fw-semibold text-secondary">
            Room & Guest
          </label>
          <div className="d-flex gap-2">
            <div className="input-group">
              <span className="input-group-text bg-white border-0">
                <HotelIcon />
              </span>
              <select
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="form-select border-0 fw-semibold"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>

            <div className="input-group">
              <span className="input-group-text bg-white border-0">
                <PeopleIcon />
              </span>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="form-select border-0 fw-semibold"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="col-12 col-md-2 d-flex align-items-end">
          <button className="btn btn-dark w-100 fw-semibold rounded-pill py-2">
            SEARCH
          </button>
        </div>

      </div>
    </div>
  );
}

export default Booking;
