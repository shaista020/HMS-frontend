import React from "react";

const UserSidebar = () => {
  return (
    <div
      className="text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
        backgroundColor: "#4a5546",
      }}
    >
      <h5 className="fw-bold mb-4">Dashboard</h5>

      <ul className="list-unstyled">
        <li className="p-2 mb-2 rounded bg-secondary">Home</li>
        <li className="p-2 mb-2 rounded">My Bookings</li>
        <li className="p-2 mb-2 rounded">Book Room</li>
        <li className="p-2 mb-2 rounded">Payments</li>
        <li className="p-2 mb-2 rounded">Profile</li>
        <li className="p-2 mb-2 rounded">Support</li>
      </ul>
    </div>
  );
};

export default UserSidebar;
