import React, { useState, useEffect } from "react";
import AddBooking from "./AddBooking";
import axios from "axios"

const BookingList = () => {
  const bookings = [
    { guest: "Ali Khan", room: "101", checkIn: "2025-01-10", checkOut: "2025-01-12", status: "Confirmed" },
    { guest: "Sara Ahmed", room: "102", checkIn: "2025-01-11", checkOut: "2025-01-13", status: "Pending" },
    { guest: "Bilal Raza", room: "201", checkIn: "2025-01-12", checkOut: "2025-01-15", status: "Checked-In" },
    { guest: "Hina Shah", room: "202", checkIn: "2025-01-14", checkOut: "2025-01-16", status: "Cancelled" },
    { guest: "Dawood Ali", room: "301", checkIn: "2025-01-15", checkOut: "2025-01-18", status: "Confirmed" },
    { guest: "Fatima Noor", room: "303", checkIn: "2025-01-16", checkOut: "2025-01-19", status: "Pending" },
    { guest: "Usman Tariq", room: "304", checkIn: "2025-01-17", checkOut: "2025-01-20", status: "Confirmed" },
    { guest: "Haris Khan", room: "305", checkIn: "2025-01-18", checkOut: "2025-01-21", status: "Checked-In" },
    { guest: "Ali Khan", room: "101", checkIn: "2025-01-10", checkOut: "2025-01-12", status: "Confirmed" },
    { guest: "Sara Ahmed", room: "102", checkIn: "2025-01-11", checkOut: "2025-01-13", status: "Pending" },
    { guest: "Bilal Raza", room: "201", checkIn: "2025-01-12", checkOut: "2025-01-15", status: "Checked-In" },
    { guest: "Hina Shah", room: "202", checkIn: "2025-01-14", checkOut: "2025-01-16", status: "Cancelled" },
     
  ];
 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
const [users, setUsers] = useState([]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setSidebarOpen(false);  
        setIsMobile(true);
      } else {
        setSidebarOpen(true);
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 const addBooking = (userData) => {
    axios
      .post("http://localhost:8000/hms_admin/add_user", userData)
      .then((res) => {
        if (res.data.status === "success") {
          setUsers([...users, res.data.user]); // update user list
        }
      })
      .catch((err) => console.error(err));
  };
  return (
   <div className="d-flex">
  <div className="flex-grow-1">
    <div className="container my-4">
      <div className={`main-content ${sidebarOpen ? "" : "expanded"}`}>
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

       <div className="table-wrapper">
  <table className="table table-hover table-bordered shadow-sm">
    <thead style={{ backgroundColor: "#4a5546", color: "white" }}>
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
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
        >
          <td style={{ color: "#000" }}>{index + 1}</td>
          <td style={{ color: "#000" }}>{booking.guest}</td>
          <td style={{ color: "#000" }}>{booking.room}</td>
          <td style={{ color: "#000" }}>{booking.checkIn}</td>
          <td style={{ color: "#000" }}>{booking.checkOut}</td>
          <td style={{ color: "#000" }}>{booking.status}</td>
          <td>
            <button
              className="btn btn-secondary btn-sm me-2"
              // onClick={() => handleViewDetails(booking)}
            >
              View Detail
            </button>
            <button
              className="btn btn-warning btn-sm"
              // onClick={() => handleEditBooking(booking)}
            >
              Edit
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
 <AddBooking addBooking={addBooking} />

      </div>
    </div>
  </div>
</div>

  );
};

export default BookingList;
