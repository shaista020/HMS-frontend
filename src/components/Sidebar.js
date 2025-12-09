import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaUserShield,
  FaHotel,
  FaBed,
  FaUsers,
  FaList,
  FaChartBar,
  FaPlus,
  FaMinus,
  FaTimes,
  FaTachometerAlt,
  FaClipboardList,
  FaMoneyBill,
  FaBroom,
  FaTools,
  FaBell,
  FaCrown,
  FaUserFriends,
} from "react-icons/fa";
import { Collapse } from "react-bootstrap";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Track open menu
  const [openMenu, setOpenMenu] = useState(null);

  // Get current route
  const location = useLocation();
  const currentPath = location.pathname;

  // Sidebar responsive
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

  // Toggle menu
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Check if child link is active
  const isActive = (path) => (currentPath === path ? "active-link" : "");

  // Check if parent menu should be active
  const isParentActive = (menu) => {
    const menuPaths = {
      hotel: ["/hotel-setup", "/add-setup"],
      user: ["/user", "/roles"],
      room: ["/room-types", "/rooms"],
      guest: ["/guests"],
      booking: ["/booking"],
      payment: ["/payments"],
      report: ["/report"],
    };
    return menuPaths[menu]?.includes(currentPath);
  };

  // Set initial open menu based on current path
  useEffect(() => {
    const pathMap = {
      "/user": "user",
      "/roles": "user",
      "/admin_dashboard": null,
      "/hotel-setup": "hotel",
      "/add-setup": "hotel",
      "/booking": "booking",
      "/rooms": "room",
      "/room-types": "room",
      "/guests": "guest",
      "/payments": "payment",
    };
    const detectedMenu = pathMap[currentPath] || null;
    setOpenMenu(detectedMenu);
  }, [currentPath]);

  return (
    <>
      {/* Mobile Hamburger */}
      {isMobile && !sidebarOpen && (
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
          <FaBars size={25} />
        </button>
      )}

      <div
        className={`d-flex flex-column vh-100 border-end sidebar ${
          sidebarOpen ? "" : "closed"
        }`}
      >
        {/* Mobile close button */}
        {isMobile && (
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        )}

        <div className="p-3 border-bottom">
          <h5 className="text-center fw-bold text-white">HMS Admin Panel</h5>
        </div>

        <div className="sidebar-scroll">
          <ul className="list-unstyled px-2">
            {/* Dashboard */}
            <li className="mb-2">
              <Link
                to="/admin_dashboard"
                className={`btn w-100 text-start d-flex justify-content-between text-white ${
                  isActive("/admin_dashboard")
                }`}
              >
                <span>
                  <FaTachometerAlt className="me-2" /> Dashboard
                </span>
              </Link>
            </li>

            {/* USER & ROLES */}
            <li className="mb-2">
              <button
                className={`btn w-100 text-start d-flex justify-content-between text-white ${
                  openMenu === "user" || isParentActive("user")
                    ? "active-parent"
                    : ""
                }`}
                onClick={() => toggleMenu("user")}
              >
                <span>
                  <FaUserShield className="me-2" /> User & Roles
                </span>
                {openMenu === "user" ? <FaMinus /> : <FaPlus />}
              </button>

              <Collapse in={openMenu === "user"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className={`tree-item ${isActive("/user")}`}>
                    <Link to="/user" className="nav-link">
                      Users
                    </Link>
                  </li>
                  <li className={`tree-item ${isActive("/roles")}`}>
                    <Link to="/roles" className="nav-link">
                      Roles
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* HOTEL CONFIGURATION */}
            <li className="mb-2">
              <button
                className={`btn w-100 text-start d-flex justify-content-between text-white ${
                  openMenu === "hotel" || isParentActive("hotel")
                    ? "active-parent"
                    : ""
                }`}
                onClick={() => toggleMenu("hotel")}
              >
                <span>
                  <FaHotel className="me-2" /> Hotel Configuration
                </span>
                {openMenu === "hotel" ? <FaMinus /> : <FaPlus />}
              </button>

              <Collapse in={openMenu === "hotel"}>
                <ul className="list-unstyled ps-4 tree-branch">
                   <li className={`tree-item ${isActive("/add-setup")}`}>
                    <Link to="/add-setup" className="nav-link">
                      Add Setup
                    </Link>
                  </li>
                  <li className={`tree-item ${isActive("/hotel-setup")}`}>
                    <Link to="/hotel-setup" className="nav-link">
                      List Setup
                    </Link>
                  </li>
                 
                </ul>
              </Collapse>
            </li>

            {/* ROOM MANAGEMENT */}
            <li className="mb-2">
              <button
                className={`btn w-100 text-start d-flex justify-content-between text-white ${
                  openMenu === "room" || isParentActive("room")
                    ? "active-parent"
                    : ""
                }`}
                onClick={() => toggleMenu("room")}
              >
                <span>
                  <FaBed className="me-2" /> Room Management
                </span>
                {openMenu === "room" ? <FaMinus /> : <FaPlus />}
              </button>

              <Collapse in={openMenu === "room"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className={`tree-item ${isActive("/room-types")}`}>
                    <Link to="/room-types" className="nav-link">
                      Room Types
                    </Link>
                  </li>
                  <li className={`tree-item ${isActive("/rooms")}`}>
                    <Link to="/rooms" className="nav-link">
                      Rooms
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* GUEST MANAGEMENT */}
            <li className="mb-2">
              <button
                className={`btn w-100 text-start d-flex justify-content-between text-white ${
                  openMenu === "guest" || isParentActive("guest")
                    ? "active-parent"
                    : ""
                }`}
                onClick={() => toggleMenu("guest")}
              >
                <span>
                  <FaUserFriends className="me-2" /> Guest Management
                </span>
                {openMenu === "guest" ? <FaMinus /> : <FaPlus />}
              </button>

              <Collapse in={openMenu === "guest"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className={`tree-item ${isActive("/guests")}`}>
                    <Link to="/guests" className="nav-link">
                      Guests
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* BOOKING */}
            <li className="mb-2">
              <button
                className={`btn w-100 text-start d-flex justify-content-between text-white ${
                  openMenu === "booking" || isParentActive("booking")
                    ? "active-parent"
                    : ""
                }`}
                onClick={() => toggleMenu("booking")}
              >
                <span>
                  <FaClipboardList className="me-2" /> Booking Management
                </span>
                {openMenu === "booking" ? <FaMinus /> : <FaPlus />}
              </button>

              <Collapse in={openMenu === "booking"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className={`tree-item ${isActive("/booking")}`}>
                    <Link to="/booking" className="nav-link">
                      Bookings
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* PAYMENTS */}
            <li className="mb-2">
              <button
                className={`btn w-100 text-start d-flex justify-content-between text-white ${
                  openMenu === "payment" || isParentActive("payment")
                    ? "active-parent"
                    : ""
                }`}
                onClick={() => toggleMenu("payment")}
              >
                <span>
                  <FaMoneyBill className="me-2" /> Payments & Billing
                </span>
                {openMenu === "payment" ? <FaMinus /> : <FaPlus />}
              </button>

              <Collapse in={openMenu === "payment"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className={`tree-item ${isActive("/payments")}`}>
                    <Link to="/payments" className="nav-link">
                      Payments
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* REPORTS */}
            <li className="mb-2">
              <button
                className={`btn w-100 text-start d-flex justify-content-between text-white ${
                  openMenu === "report" || isParentActive("report")
                    ? "active-parent"
                    : ""
                }`}
                onClick={() => toggleMenu("report")}
              >
                <span>
                  <FaChartBar className="me-2" /> Reports
                </span>
                {openMenu === "report" ? <FaMinus /> : <FaPlus />}
              </button>

              <Collapse in={openMenu === "report"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className={`tree-item ${isActive("/report")}`}>
                    Revenue Report
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
