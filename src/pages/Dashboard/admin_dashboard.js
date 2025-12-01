import React, { useState } from "react";
import BookingList from "../Admin/BookingList";
import AddBooking from "../Admin/AddBooking"

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([
    {
      guest: "Dawood",
      room: "001",
      checkIn: "2025-01-12",
      checkOut: "2025-01-15",
      status: "Confirmed",
    },
  ]);

  const addBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  const deleteBooking = (index) => {
    setBookings(bookings.filter((_, i) => i !== index));
  };

  const editBooking = (index, updatedData) => {
    const updated = [...bookings];
    updated[index] = { ...updated[index], ...updatedData };
    setBookings(updated);
  };

  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <div className="container my-4">

          {/* ADD BOOKING BUTTON HERE */}
          <AddBooking addBooking={AddBooking} />

          <BookingList
            bookings={bookings}
            deleteBooking={deleteBooking}
            editBooking={editBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
