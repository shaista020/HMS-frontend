import React, { useState } from "react";

const AddBooking = ({ addBooking }) => {
  const [booking, setBooking] = useState({
    guest: "",
    room: "",
    checkIn: "",
    checkOut: "",
    status: "Confirmed",
  });

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    addBooking(booking);
    setBooking({ guest: "", room: "", checkIn: "", checkOut: "", status: "Confirmed" });
    window.bootstrap.Modal.getInstance(document.getElementById("addBookingModal")).hide();
  };

  return (
    <div className="modal fade" id="addBookingModal" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <div className="modal-header text-white" style={{
            backgroundColor: "#4a5536"
          }}>
            <h5 className="modal-title">Add New Booking</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label fw-bold">Guest Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="guest"
                  value={booking.guest}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Room Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="room"
                  value={booking.room}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Check-In</label>
                <input
                  type="date"
                  className="form-control"
                  name="checkIn"
                  value={booking.checkIn}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Check-Out</label>
                <input
                  type="date"
                  className="form-control"
                  name="checkOut"
                  value={booking.checkOut}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-bold">Booking Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={booking.status}
                  onChange={handleChange}
                >
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>

            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button className="btn" onClick={handleSubmit} style={{ borderColor: "#4a5536"}}>Save Booking</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddBooking;
