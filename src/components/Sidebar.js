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
  FaUserFriends,
} from "react-icons/fa";
import { Collapse } from "react-bootstrap";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const location = useLocation();
  const currentPath = location.pathname;

 
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
 
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const toggleSubMenu = (submenu) => {
    setOpenSubMenu(openSubMenu === submenu ? null : submenu);
  };

  const isActive = (path) => (currentPath === path ? "active-link" : "");

  const menuPaths = {
    user: ["/user", "/roles"],
    hotel: ["/hotel-setup/add", "/hotel-setup/list"],

    room: [
      "/room-types",
      "/room-types/add",
      "/room-types/list",
      "/rooms",
      "/rooms/add",
      "/rooms/list",
    ],

    guest: ["/guest/list", "/guest/add"],
    booking: ["/booking", "/booking/add"],
    payment: ["/payments"],
    report: ["/report"],
  };

  const isParentActive = (menu) => menuPaths[menu]?.includes(currentPath);

  // Auto-open parent menu on refresh
  useEffect(() => {
    const pathMap = {
      "/user": "user",
      "/roles": "user",

      "/hotel-setup/list": "hotel",
      "/hotel-setup/add": "hotel",

      "/room-types": "room",
      "/room-types/add": "room",
      "/room-types/list": "room",

      "/rooms": "room",
      "/rooms/add": "room",
      "/rooms/list": "room",

      "/guest/add": "guest",
      "/guest/list": "guest",

      "/booking": "booking",
      "/booking/add":"booking",
      "/payments": "payment",
      "/report": "report",
    };

    setOpenMenu(pathMap[currentPath] || null);
  }, [currentPath]);

  return (
    <>
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
            {/* DASHBOARD */}
            <li className="mb-2">
              <Link
                to="/admin_dashboard"
                className={`btn w-100 text-start text-white ${isActive(
                  "/admin_dashboard"
                )}`}
              >
                <FaTachometerAlt className="me-2" /> Dashboard
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
                  <li className={`tree-item ${isActive("/hotel-setup/add")}`}>
                    <Link to="/hotel-setup/add" className="nav-link">
                      Add Setup
                    </Link>
                  </li>
                  <li className={`tree-item ${isActive("/hotel-setup/list")}`}>
                    <Link to="/hotel-setup/list" className="nav-link">
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
                  openMenu === "room" ? "active-parent" : ""
                }`}
                onClick={() => toggleMenu("room")}
              >
                <span>
                  <FaBed className="me-2" /> Room Management
                </span>
                {openMenu === "room" ? <FaMinus /> : <FaPlus />}
              </button>

              {/* Main Room Menu */}
              <Collapse in={openMenu === "room"}>
                <ul className="list-unstyled ps-4 tree-branch">
                  {/* Room Types */}
                  <li>
                    <button
                      className="btn w-100 text-start d-flex justify-content-between text-white"
                      onClick={() => toggleSubMenu("roomType")}
                    >
                      <span>Room Types</span>
                      {openSubMenu === "roomType" ? <FaMinus /> : <FaPlus />}
                    </button>

                    <Collapse in={openSubMenu === "roomType"}>
                      <ul className="list-unstyled ps-4 sub-branch">
                        <li
                          className={`tree-item ${isActive("/room-types/add")}`}
                        >
                          <Link to="/room-types/add" className="nav-link">
                            Add Room Type
                          </Link>
                        </li>
                        <li
                          className={`tree-item ${isActive("/room-types/list")}`}
                        >
                          <Link to="/room-types/list" className="nav-link">
                            Room Type List
                          </Link>
                        </li>
                      </ul>
                    </Collapse>
                  </li>

                  {/* Rooms */}
                  <li className="mt-2">
                    <button
                      className="btn w-100 text-start d-flex justify-content-between text-white"
                      onClick={() => toggleSubMenu("rooms")}
                    >
                      <span>Rooms</span>
                      {openSubMenu === "rooms" ? <FaMinus /> : <FaPlus />}
                    </button>

                    <Collapse in={openSubMenu === "rooms"}>
                      <ul className="list-unstyled ps-4 sub-branch">
                        <li className={`tree-item ${isActive("/rooms/add")}`}>
                          <Link to="/rooms/add" className="nav-link">
                            Add Room
                          </Link>
                        </li>
                        <li className={`tree-item ${isActive("/rooms/list")}`}>
                          <Link to="/rooms/list" className="nav-link">
                            Room List
                          </Link>
                        </li>
                      </ul>
                    </Collapse>
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
                  <li className={`tree-item ${isActive("/guest/add")}`}>
                    <Link to="/guest/add" className="nav-link">
                      Add Guest
                    </Link>
                  </li>

                  <li className={`tree-item ${isActive("/guest/list")}`}>
                    <Link to="/guest/list" className="nav-link">
                      List Guest
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
                  <li className={`tree-item ${isActive("/booking/add")}`}>
                    <Link to="/booking/add" className="nav-link">
                     Add Bookings  
                    </Link>
                  </li>
                  <li className={`tree-item ${isActive("/booking")}`}>
                    <Link to="/booking" className="nav-link">
                      Bookings List
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li>
 
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
