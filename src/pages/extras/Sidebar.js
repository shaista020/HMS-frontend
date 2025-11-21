import React, { useState } from "react";

// --- ICON COMPONENTS REMOVED ---
// All const Icon... components have been deleted.

const customStyles = `
.sidebar-container {
    height: 100vh;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
    background-color: #fff;
    font-family: 'Inter', sans-serif;
}
.sidebar-icon-bar {
    width: 80px;
    background-color: #f7f7f9;
    border-right: 1px solid #eee;
}
.sidebar-icon-item {
    font-size: 1.25rem;
    color: #555;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sidebar-icon-item:hover {
    background-color: #e0e0e2;
}
.active-icon-item {
    background-color: #fff;
    color: #000;
    box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
.sidebar-menu-panel {
    width: 250px;
    min-width: 250px; /* Ensure it stays fixed */
}
.menu-item {
    font-size: 0.95rem;
    color: #333;
    cursor: pointer;
    padding-left: 0;
    transition: background-color 0.2s;
}
.menu-item:hover {
    color: #000;
}
.bookings-submenu {
    position: relative;
    padding-left: 1rem;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-in-out;
}
.bookings-submenu.open {
    max-height: 500px;
}
.submenu-item {
    font-size: 0.9rem;
    color: #555;
    cursor: pointer;
    position: relative;
    border-radius: 6px; 
}
.submenu-item:hover {
    color: #000;
    background-color: #f0f0f2;
}
.submenu-item.active {
    background-color: #f0f0f2;
    color: #000;
    font-weight: 600;
    padding-left: 1.5rem !important;
}
.active-dot {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background-color: #000;
    border-radius: 50%;
}
.vertical-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 1.4rem;
    width: 1px;
    background-color: #ddd;
    z-index: 0;
}
`;

const Sidebar = () => {
  // State to handle the expansion/collapse of the "Bookings" submenu
  const [isBookingsOpen, setIsBookingsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("All Bookings"); // State to manage which item is currently active

  // Function to toggle the 'Bookings' submenu
  const toggleBookings = () => setIsBookingsOpen(!isBookingsOpen);

  // --- MODIFIED: Icons are now string paths ---
  const primaryMenuItems = [
    { icon: "/icons/home.png", label: "Dashboard", link: "/dashboard" },
    { icon: "/icons/chart-bar.png", label: "Overview", link: "/overview" },
    {
      icon: "/icons/list-alt.png",
      label: "Bookings",
      hasSubmenu: true,
      onClick: toggleBookings,
      isOpen: isBookingsOpen,
    },
    { icon: "/icons/plus.png", label: "New Booking", link: "/bookings/new" },
    { icon: "/icons/store.png", label: "Rooms", link: "/rooms" },
    { icon: "/icons/users.png", label: "Guests", link: "/guests" },
    { icon: "/icons/comment-dots.png", label: "Messages", link: "/messages" },
  ];

  const bookingsSubmenuItems = [
    { label: "All Bookings", link: "/bookings/all" },
    { label: "Calendar", link: "/bookings/calendar" },
    { label: "Check-ins", link: "/bookings/check-ins" },
    { label: "Check-outs", link: "/bookings/check-outs" },
    { label: "Payments", link: "/bookings/payments" },
    { label: "Tasks", link: "/bookings/tasks" },
  ];

  // --- MODIFIED: Icons are now string paths ---
  const bottomMenuItems = [
    { icon: "/icons/envelope.png", label: "Inbox", link: "/inbox" },
    { icon: "/icons/file-alt.png", label: "Reports", link: "/reports" },
    { icon: "/icons/magic.png", label: "Housekeeping", link: "/housekeeping" },
    { icon: "/icons/cog.png", label: "Settings", link: "/settings-bottom" },
  ];

  // Dummy navigation handler
  const handleNavigate = (link, label) => {
    if (label) {
      setActiveItem(label);
    }
  };

  // --- MODIFIED: Renders <img> tag ---
  const renderIconMenu = (items) => (
    <div className="d-flex flex-column align-items-center mb-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`sidebar-icon-item p-3 mb-2 rounded ${
            item.label === "Bookings" ? "active-icon-item" : ""
          }`}
          onClick={
            item.onClick || (() => handleNavigate(item.link, item.label))
          }
        >
          {/* Use <img> tag */}
          <img src={item.icon} alt={item.label} width="20" height="20" />
        </div>
      ))}
    </div>
  );

  // --- MODIFIED: Renders <img> tag ---
  const renderTextMenu = (items) => (
    <ul className="list-unstyled mb-4">
      {items.map((item, index) => (
        <li
          key={index}
          className="d-flex justify-content-between align-items-center py-2 menu-item"
          onClick={() => handleNavigate(item.link, item.label)}
        >
          <span className="d-flex align-items-center">
            {/* Use <img> tag */}
            {item.icon && (
              <img
                src={item.icon}
                alt={item.label}
                width="20"
                height="20"
                className="me-2"
              />
            )}
            {item.label}
          </span>
          {item.label !== "Overview" && item.label !== "Store" && (
            <span className="text-muted">+</span>
          )}
        </li>
      ))}
    </ul>
  );

  const renderBookingsSubmenu = () => (
    <div className={`bookings-submenu ${isBookingsOpen ? "open" : "closed"}`}>
      {bookingsSubmenuItems.map((item, index) => (
        <div
          key={index}
          className={`submenu-item py-2 ps-4 pe-3 ${
            item.label === activeItem ? "active" : ""
          }`}
          onClick={() => handleNavigate(item.link, item.label)}
        >
          {item.label === activeItem && <span className="active-dot"></span>}
          {item.label}
        </div>
      ))}
      <div className="vertical-line"></div>
    </div>
  );

  return (
    <div className="d-flex sidebar-container">
      {/* Inject the custom styles */}
      <style>{customStyles}</style>

      {/* Left Icon Bar */}
      <div className="sidebar-icon-bar p-3 d-flex flex-column justify-content-between">
        {/* Top Icons */}
        <div>
          {renderIconMenu(primaryMenuItems.slice(0, 3))}
          <div className="my-3"></div>
          {renderIconMenu(primaryMenuItems.slice(3, 7))}
        </div>
        {/* Bottom Icon --- MODIFIED: Uses <img> tag --- */}
        <div>
          <div className="sidebar-icon-item p-3 mb-2 rounded">
            {/* Hardcoded icon replaced */}
            <img src="/icons/cog.png" alt="Settings" width="20" height="20" />
          </div>
        </div>
      </div>

      {/* Main Menu Panel */}
      <div className="sidebar-menu-panel p-4">
        <h4 className="mb-4">Hotel Eaze</h4>

        {/* Overview & Bookings */}
        <ul className="list-unstyled mb-0">
          {/* --- MODIFIED: Uses <img> tag --- */}
          <li
            className="d-flex justify-content-between align-items-center py-2 menu-item"
            onClick={() => handleNavigate("/overview", "Overview")}
          >
            <span className="d-flex align-items-center">
              {/* Hardcoded icon replaced */}
              <img
                src="/icons/chart-bar.png"
                alt="Overview"
                width="20"
                height="20"
                className="me-2"
              />
              Overview
            </span>
          </li>
          {/* --- MODIFIED: Uses <img> tag --- */}
          <li
            className={`d-flex justify-content-between align-items-center py-2 menu-item fw-bold ${
              isBookingsOpen ? "active" : ""
            }`}
            onClick={toggleBookings}
            style={{ userSelect: "none" }}
          >
            <span className="d-flex align-items-center">
              {/* Hardcoded icon replaced */}
              <img
                src="/icons/list-alt.png"
                alt="Bookings"
                width="20"
                height="20"
                className="me-2"
              />
              Bookings
            </span>
            <span className="fs-5" style={{ cursor: "pointer" }}>
              {isBookingsOpen ? "–" : "+"}
            </span>
          </li>
        </ul>

        {/* Submenu and the custom line */}
        {renderBookingsSubmenu()}

        {/* Separator */}
        <hr className="my-3" />

        {/* Bottom Menu Items */}
        <div className="mt-4">{renderTextMenu(bottomMenuItems)}</div>
      </div>
    </div>
  );
};

export default Sidebar;