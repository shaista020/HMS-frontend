import React, { useEffect, useState } from "react";
import {
  FaBed,
  FaUsers,
  FaDollarSign,
  FaCalendarAlt,
  FaBroom,
  FaTools,
  FaUserTie,
  FaClipboardList,
} from "react-icons/fa";
import './dashboard.css';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [filter, setFilter] = useState("7days");  
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

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

  
  const kpis = [
    { title: "Total Users", value: "84", icon: <FaUsers />, color: "#4a5546" },
    { title: "Total Rooms", value: "120", icon: <FaBed />, color: "#4a5546" },
    { title: "Occupied Rooms", value: "78", icon: <FaBed />, color: "#4a5546" },
    { title: "Available Rooms", value: "42", icon: <FaBed />, color: "#4a5546" },
    { title: "Today Bookings", value: "18", icon: <FaCalendarAlt />, color: "#4a5546" },
    { title: "Today Revenue", value: "$3,250", icon: <FaDollarSign />, color: "#4a5546" },
  ];

  const hexToRGB = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  /* ================= CHART DATA (DUMMY) ================= */
  const occupancyData = [
    { name: "Available", rooms: 42 },
    { name: "Occupied", rooms: 78 },
  ];

  const revenueData = [
    { day: "Mon", revenue: 1200 },
    { day: "Tue", revenue: 1800 },
    { day: "Wed", revenue: 1500 },
    { day: "Thu", revenue: 2200 },
    { day: "Fri", revenue: 2600 },
    { day: "Sat", revenue: 3000 },
    { day: "Sun", revenue: 3250 },
  ];

  const bookingStatusData = [
    { status: "Confirmed", count: 35 },
    { status: "Pending", count: 10 },
    { status: "Cancelled", count: 5 },
  ];

  /* ================= RECENT BOOKINGS ================= */
  const recentBookings = [
    { id: 1, guest: "John Doe", room: "101", date: "2025-12-02", status: "Checked In" },
    { id: 2, guest: "Sara Ali", room: "204", date: "2025-12-02", status: "Reserved" },
    { id: 3, guest: "Alex Smith", room: "305", date: "2025-12-01", status: "Checked Out" },
    { id: 4, guest: "Mary Jane", room: "410", date: "2025-12-03", status: "Reserved" },
  ];

  /* ================= SYSTEM SNAPSHOT ================= */
  const systemStats = [
    { title: "Rooms to Clean", value: 7, icon: <FaBroom /> },
    { title: "Maintenance Issues", value: 3, icon: <FaTools /> },
    { title: "On-Duty Staff", value: 22, icon: <FaUserTie /> },
    { title: "Departments", value: 6, icon: <FaClipboardList /> },
  ];

  /* ================= AUDIT LOGS ================= */
  const auditLogs = [
    { id: 1, user: "Admin", action: "Added Room", module: "Rooms", time: "2025-12-02T10:30:00" },
    { id: 2, user: "Manager", action: "Updated Booking", module: "Bookings", time: "2025-12-01T11:00:00" },
    { id: 3, user: "Admin", action: "Created User", module: "Users", time: "2025-12-01T12:10:00" },
    { id: 4, user: "Staff", action: "Completed Task", module: "Housekeeping", time: "2025-11-30T01:00:00" },
  ];

  /* ================= FILTER LOGIC ================= */
  const filterOptions = {
    "24h": 1,
    "7days": 7,
    "15days": 15,
    "1month": 30,
  };

  useEffect(() => {
    const now = new Date();
    const daysAgo = (days) => new Date(now.setDate(now.getDate() - days));

    const filteredB = recentBookings.filter(b => {
      const bDate = new Date(b.date);
      if (filter === "24h") {
        return bDate >= new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      } else {
        return bDate >= daysAgo(filterOptions[filter]);
      }
    });

    const filteredL = auditLogs.filter(log => {
      const logDate = new Date(log.time);
      if (filter === "24h") {
        return logDate >= new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      } else {
        return logDate >= daysAgo(filterOptions[filter]);
      }
    });

    setFilteredBookings(filteredB);
    setFilteredLogs(filteredL);
  }, [filter]);

  return (
    <div className={`main-content ${sidebarOpen ? "" : "expanded"}`}>
      <div className="p-4">
        {/* ===== HEADER WITH FILTER DROPDOWN ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
  <h3>Admin Dashboard</h3>

  <div className="d-flex align-items-center gap-2">
    <span className="fw-semibold text-secondary" style={{ fontSize: "1.1rem" }}>
      Filter:
    </span>
    <select
      className="form-select w-auto"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      style={{ minWidth: "150px" }}
    >
      <option value="24h">Last 24 Hours</option>
      <option value="7days">Last 7 Days</option>
      <option value="15days">Last 15 Days</option>
      <option value="1month">Last 1 Month</option>
    </select>
  </div>
</div>


 
       {/* ===== KPI CARDS ===== */}
<div className="row g-4 kpi-container-unique">
  {kpis.map((item, index) => (
    <div className="col-xl-2 col-lg-4 col-md-6" key={index}>
      <div
        className="kpi-card-unique p-3 position-relative"
        style={{
          "--accent-color": item.color,
          "--accent-color-soft": `rgba(${hexToRGB(item.color)}, 0.12)`,
          borderLeft: `4px solid ${item.color}`
        }}
      >
        <div className="d-flex align-items-center mb-2">
          <div className="kpi-icon-wrapper me-2" style={{ fontSize: "1.5rem" }}>
            {item.icon}
          </div>
          <div>
            <div className="kpi-title-new fw-semibold">{item.title}</div>
            <div className="kpi-value-new fs-5">
              {item.value} 
              <span className="kpi-trend-tag ms-1">Live</span>
            </div>
          </div>
        </div>

        {/* Mini Trend / Percentage */}
        <div className="kpi-trend mt-2 mb-3" style={{ fontSize: "0.85rem", color: item.color }}>
          ▲ 12% from last week
        </div>

        {/* View Button */}
      <button
  className="btn btn-view w-100 mt-auto"  
  onClick={() => alert(`View details for ${item.title }`)}
>
  View
</button>


      </div>
    </div>
  ))}
</div>


        {/* ================= CHARTS SECTION ================= */}
        <div className="row mb-4">
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header fw-semibold">Room Occupancy</div>
              <div className="card-body" style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rooms" fill="#4a5546" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header fw-semibold">Weekly Revenue</div>
              <div className="card-body" style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#4a5546" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header fw-semibold">Booking Status</div>
              <div className="card-body" style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookingStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6c757d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RECENT BOOKINGS + SNAPSHOT ================= */}
        <div className="row mb-4">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header fw-semibold">Recent Bookings</div>
              <table className="table mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.id}>
                      <td>{b.guest}</td>
                      <td>{b.room}</td>
                      <td>{b.date}</td>
                      <td><span className="badge bg-secondary">{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header fw-semibold">Operational Snapshot</div>
              <div className="card-body">
                {systemStats.map((stat, idx) => (
                  <div key={idx} className="d-flex justify-content-between mb-2">
                    <span>{stat.icon} {stat.title}</span>
                    <strong>{stat.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= AUDIT LOGS ================= */}
        <div className="card shadow-sm">
          <div className="card-header fw-semibold">Recent Audit Logs</div>
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Module</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.user}</td>
                  <td>{log.action}</td>
                  <td>{log.module}</td>
                  <td>{new Date(log.time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
