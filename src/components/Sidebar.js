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
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Single state to track which menu is open
  const [openMenu, setOpenMenu] = useState(null);

  // Responsive handling
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

  // Function to toggle menus
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      {/* Mobile Hamburger */}
      {isMobile && !sidebarOpen && (
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
          <FaBars size={25} />
        </button>
      )}

      {/* Sidebar */}
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
                className="btn w-100 text-start d-flex justify-content-between text-white"
              >
                <span>
                  <FaTachometerAlt className="me-2" /> Dashboard
                </span>
              </Link>
            </li>

            {/* 1 — USER & ROLE MANAGEMENT */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("user")}
              >
                <span>
                  <FaUserShield className="me-2" /> User & Roles
                </span>
                {openMenu === "user" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "user"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link to="/user" className="nav-link">Users</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Roles</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Permissions</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Login History</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Deactivated Users</Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* 2 — HOTEL CONFIGURATION */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("hotel")}
              >
                <span>
                  <FaHotel className="me-2" /> Hotel Configuration
                </span>
                {openMenu === "hotel" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "hotel"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link className="nav-link">General Settings</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Taxes</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Timings</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Security Policy</Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* 3 — ROOM MANAGEMENT */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("room")}
              >
                <span>
                  <FaBed className="me-2" /> Room Management
                </span>
                {openMenu === "room" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "room"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link className="nav-link">Room Types</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Rooms</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Amenities</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Room Status</Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* 4 — GUEST MANAGEMENT */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("guest")}
              >
                <span>
                  <FaUserFriends className="me-2" /> Guest Management
                </span>
                {openMenu === "guest" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "guest"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link className="nav-link">Guests</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Documents</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Guest History</Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* 5 — BOOKING MANAGEMENT */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("booking")}
              >
                <span>
                  <FaClipboardList className="me-2" /> Booking Management
                </span>
                {openMenu === "booking" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "booking"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link to="/booking" className="nav-link">
                      Bookings
                    </Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Calendar View</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Invoices</Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* 6 — PAYMENTS & BILLING */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("payment")}
              >
                <span>
                  <FaMoneyBill className="me-2" /> Payments & Billing
                </span>
                {openMenu === "payment" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "payment"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link className="nav-link">Payments</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Refunds</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Discounts</Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* 7 — DEPARTMENT MANAGEMENT */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("dept")}
              >
                <span>
                  <FaUsers className="me-2" /> Departments
                </span>
                {openMenu === "dept" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "dept"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link className="nav-link">Departments</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Assign Staff</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Shift Schedule</Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* 8 — HOUSEKEEPING */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("housekeeping")}
              >
                <span>
                  <FaBroom className="me-2" /> Housekeeping
                </span>
                {openMenu === "housekeeping" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "housekeeping"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link className="nav-link">Tasks</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Performance</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Task History</Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* 9 — MAINTENANCE */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("maintenance")}
              >
                <span>
                  <FaTools className="me-2" /> Maintenance
                </span>
                {openMenu === "maintenance" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "maintenance"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link className="nav-link">Issues</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Repairs</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Maintenance Logs</Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* 10 — INVENTORY */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("inventory")}
              >
                <span>
                  <FaList className="me-2" /> Inventory
                </span>
                {openMenu === "inventory" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "inventory"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link className="nav-link">Items</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Suppliers</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Usage Logs</Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* 11 — NOTIFICATIONS */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("notification")}
              >
                <span>
                  <FaBell className="me-2" /> Notifications
                </span>
                {openMenu === "notification" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "notification"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link className="nav-link">System Alerts</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Email Alerts</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">SMS Alerts</Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* 12 — AUDIT LOGS */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("audit")}
              >
                <span>
                  <FaList className="me-2" /> Audit Logs
                </span>
                {openMenu === "audit" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "audit"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link className="nav-link">All Logs</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Login Logs</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Export Logs</Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* 13 — REPORTS & ANALYTICS */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("report")}
              >
                <span>
                  <FaChartBar className="me-2" /> Reports & Analytics
                </span>
                {openMenu === "report" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "report"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link className="nav-link">Revenue Report</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Occupancy Report</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Staff Report</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Custom Reports</Link>
                  </li>
                </ul>
              </Collapse>
            </li>

            {/* 14 — SUBSCRIPTION / PACKAGES */}
            <li className="mb-2">
              <button
                className="btn w-100 text-start d-flex justify-content-between text-white"
                onClick={() => toggleMenu("package")}
              >
                <span>
                  <FaCrown className="me-2" /> Packages
                </span>
                {openMenu === "package" ? <FaMinus /> : <FaPlus />}
              </button>
              <Collapse in={openMenu === "package"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  <li className="tree-item">
                    <Link className="nav-link">Plan List</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Upgrade</Link>
                  </li>
                  <li className="tree-item">
                    <Link className="nav-link">Billing History</Link>
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
