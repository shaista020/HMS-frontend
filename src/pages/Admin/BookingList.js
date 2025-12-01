import React from "react";

const BookingList = ({ bookings }) => {
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">Bookings List</h3>

        <button
            className="btn"  
            data-bs-toggle="modal"
            data-bs-target="#addBookingModal"
            style={{
                color: "#4a5546", 
                borderColor: "#4a5546", 
                fontWeight: "bold",
            }}
            >
            + Add Booking
            </button>

      </div>

        <table className="table table-hover table-bordered shadow-sm">
  <thead
    style={{
      backgroundColor: "#4a5546",
      color: "white",
    }}
  >
    <tr>
      <th>#</th>
      <th>Guest Name</th>
      <th>Room</th>
      <th>Check-In</th>
      <th>Check-Out</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {bookings.map((booking, index) => (
      <tr
        key={index}
        style={{ transition: "background-color 0.3s" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#4a5546")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "white")
        }
      >
        <td style={{ color: "#000" }}>{index + 1}</td>
        <td style={{ color: "#000" }}>{booking.guest}</td>
        <td style={{ color: "#000" }}>{booking.room}</td>
        <td style={{ color: "#000" }}>{booking.checkIn}</td>
        <td style={{ color: "#000" }}>{booking.checkOut}</td>
        <td style={{ color: "#000" }}>{booking.status}</td>

        <td>
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#4a5546",
              color: "white",
              marginRight: "6px",
              border: "none"
            }}
            onClick={booking.onEdit}
          >
            Edit
          </button>

          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#c0392b",
              color: "white",
              border: "none"
            }}
            onClick={booking.onDelete}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default BookingList;
