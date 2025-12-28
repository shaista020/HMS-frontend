import React, { useState, useEffect } from "react";
import { FaBed, FaUsers, FaDollarSign, FaCalendarAlt } from "react-icons/fa";

const AdminDashboard = () => {
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
 
  const stats = [
    { title: "Total Bookings", value: 45, icon: <FaCalendarAlt />, color: "#4a5546" },
    { title: "Available Rooms", value: 120, icon: <FaBed />, color: "#4a5546" },
    { title: "Guests Today", value: 32, icon: <FaUsers />, color: "#4a5546" },
    { title: "Revenue ($)", value: 1280, icon: <FaDollarSign />, color: "#4a5546" },
  ];

  const recentBookings = [
    { id: 1, guest: "John Doe", room: "101", checkIn: "2025-12-01", status: "Checked In" },
    { id: 2, guest: "Mary Jane", room: "102", checkIn: "2025-12-02", status: "Reserved" },
    { id: 3, guest: "Alex Smith", room: "103", checkIn: "2025-12-02", status: "Checked Out" },
    { id: 4, guest: "Sara Ali", room: "104", checkIn: "2025-12-03", status: "Reserved" },
  ];

  return (
     <div className={`main-content ${sidebarOpen ? "" : "expanded"}`}>
        
    <div className="d-flex">
      
         
        
     

      <div className="flex-grow-1 p-4">
        <h3>Admin Dashboard</h3>
 
        <div className="d-flex flex-wrap gap-3 my-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: stat.color,
                color: "#fff",
                padding: "20px",
                borderRadius: "10px",
                flex: "1 1 200px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div style={{ fontSize: "30px" }}>{stat.icon}</div>
              <div>
                <h5>{stat.title}</h5>
                <h3>{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>
 
        <div>
          <h4>Recent Bookings</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room</th>
                <th>Check-In</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.guest}</td>
                  <td>{booking.room}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <button className="btn mt-3" style={{ backgroundColor: '#4a5546', color: 'white' }}>Add Booking</button>
      </div>
       </div>
    </div>
  );
};

export default AdminDashboard;
