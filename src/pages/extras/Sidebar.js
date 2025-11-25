import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaUserShield,
  FaHotel,
  FaBed,
  FaUsers,
  FaList,
  FaChartBar,
  FaCog,
  FaChevronDown,
  FaChevronRight,
  FaTimes
} from "react-icons/fa";
import { Collapse } from "react-bootstrap";
import "./Sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const [userMenu, setUserMenu] = useState(false);
  const [hotelMenu, setHotelMenu] = useState(false);
  const [roomMenu, setRoomMenu] = useState(false);
  const [deptMenu, setDeptMenu] = useState(false);
  const [auditMenu, setAuditMenu] = useState(false);
  const [reportMenu, setReportMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setSidebarOpen(false); // closed on mobile
        setIsMobile(true);
      } else {
        setSidebarOpen(true); // open on desktop
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
   {isMobile && !sidebarOpen && (
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
          <FaBars size={20} />
        </button>
      )}

       

      {/* 🚀 HAMBURGER BUTTON */}
      {/* <button className="hamburger-btn" onClick={() => setOpen(!open)}>
        <FaBars size={20} />
      </button> */}

      {/* 🚀 SIDEBAR */}
       <div className={`sidebar ${sidebarOpen ? "" : "closed"}`}>

        {/* Close button inside sidebar */}
        {isMobile && (
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        )}
        <div className="p-3 border-bottom">
          <h5 className="text-center fw-bold">HMS Admin Panel</h5>
        </div>
<div className="sidebar-scroll">
        <ul className="list-unstyled px-3">

          {/* 1. USER & ROLE MODULE */}
          <li>
            <button
              className="btn w-100 text-start d-flex justify-content-between text-white"
              onClick={() => setUserMenu(!userMenu)}
            >
              <span><FaUserShield className="me-2" /> User & Roles</span>
              {userMenu ? <FaChevronDown /> : <FaChevronRight />}
            </button>

            <Collapse in={userMenu}>
              <ul className="list-unstyled ps-4 tree-branch">
                <li className="tree-item"><a className="nav-link">Users</a></li>
                <li className="tree-item"><a className="nav-link">Roles</a></li>
                <li className="tree-item"><a className="nav-link">Permissions</a></li>
                <li className="tree-item"><a className="nav-link">Login History</a></li>
                <li className="tree-item"><a className="nav-link">Deactivated Users</a></li>
              </ul>
            </Collapse>
          </li>

          {/* 2. HOTEL CONFIGURATION */}
          <li>
            <button
              className="btn w-100 text-start d-flex justify-content-between text-white"
              onClick={() => setHotelMenu(!hotelMenu)}
            >
              <span><FaHotel className="me-2" /> Hotel Configuration</span>
              {hotelMenu ? <FaChevronDown /> : <FaChevronRight />}
            </button>

            <Collapse in={hotelMenu}>
              <ul className="list-unstyled ps-4 tree-branch">
                <li className="tree-item"><a className="nav-link">General Settings</a></li>
                <li className="tree-item"><a className="nav-link">Taxes & Charges</a></li>
                <li className="tree-item"><a className="nav-link">Check-in/Check-out</a></li>
                <li className="tree-item"><a className="nav-link">Security Policy</a></li>
              </ul>
            </Collapse>
          </li>

          {/* 3. ROOM MANAGEMENT */}
          <li>
            <button
              className="btn w-100 text-start d-flex justify-content-between text-white"
              onClick={() => setRoomMenu(!roomMenu)}
            >
              <span><FaBed className="me-2" /> Rooms Management</span>
              {roomMenu ? <FaChevronDown /> : <FaChevronRight />}
            </button>

            <Collapse in={roomMenu}>
              <ul className="list-unstyled ps-4 tree-branch">
                <li className="tree-item"><a className="nav-link">Room Types</a></li>
                <li className="tree-item"><a className="nav-link">Rooms</a></li>
                <li className="tree-item"><a className="nav-link">Amenities</a></li>
                <li className="tree-item"><a className="nav-link">Status</a></li>
              </ul>
            </Collapse>
          </li>

          {/* 4. DEPARTMENT */}
          <li>
            <button
              className="btn w-100 text-start d-flex justify-content-between text-white"
              onClick={() => setDeptMenu(!deptMenu)}
            >
              <span><FaUsers className="me-2" /> Departments</span>
              {deptMenu ? <FaChevronDown /> : <FaChevronRight />}
            </button>

            <Collapse in={deptMenu}>
              <ul className="list-unstyled ps-4 tree-branch">
                <li className="tree-item"><a className="nav-link">Departments</a></li>
                <li className="tree-item"><a className="nav-link">Assign Staff</a></li>
                <li className="tree-item"><a className="nav-link">Shifts</a></li>
              </ul>
            </Collapse>
          </li>

          {/* 5. AUDIT LOGS */}
          <li>
            <button
              className="btn w-100 text-start d-flex justify-content-between text-white"
              onClick={() => setAuditMenu(!auditMenu)}
            >
              <span><FaList className="me-2" /> Audit Logs</span>
              {auditMenu ? <FaChevronDown /> : <FaChevronRight />}
            </button>

            <Collapse in={auditMenu}>
              <ul className="list-unstyled ps-4 tree-branch">
                <li className="tree-item"><a className="nav-link">All Logs</a></li>
                <li className="tree-item"><a className="nav-link">Login Logs</a></li>
                <li className="tree-item"><a className="nav-link">Export</a></li>
              </ul>
            </Collapse>
          </li>

          {/* 6. REPORTS MODULE */}
          <li>
            <button
              className="btn w-100 text-start d-flex justify-content-between text-white"
              onClick={() => setReportMenu(!reportMenu)}
            >
              <span><FaChartBar className="me-2" /> Reports & Analytics</span>
              {reportMenu ? <FaChevronDown /> : <FaChevronRight />}
            </button>

            <Collapse in={reportMenu}>
              <ul className="list-unstyled ps-4 tree-branch">
                <li className="tree-item"><a className="nav-link">Revenue Report</a></li>
                <li className="tree-item"><a className="nav-link">Occupancy Report</a></li>
                <li className="tree-item"><a className="nav-link">Staff Report</a></li>
                <li className="tree-item"><a className="nav-link">Custom Reports</a></li>
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
