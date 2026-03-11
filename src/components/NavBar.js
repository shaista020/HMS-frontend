import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import API from "./../api";

const NavBar = () => {

  const handleLogout = () => {
    API.post("logout/", {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/signin";
      })
      .catch(err => console.error("Logout error:", err));
  };


  return (
    <nav
      className="navbar shadow-sm px-4"
      style={{ backgroundColor: "#4a5546", height: "67px" }}
    >
      <div className="d-flex ms-auto align-items-center">


        {/* Search Bar Left Side */}
        <input
          type="text"
          placeholder="Search..."
          className="form-control search-box me-3"
          style={{
            maxWidth: "260px",
            backgroundColor: "transparent",
            border: "2px solid #d6d6d6",
            borderRadius: "8px",
            padding: "8px 14px",
            outline: "none",
            color: "white",
          }}
        />

        <div className="ms-auto d-flex align-items-center">

          {/* Bell Icon */}
          <i
            className="bi bi-bell-fill text-white fs-4 me-3"
            style={{ cursor: "pointer" }}
          ></i>

          {/* Profile Dropdown */}
          <div className="dropdown">
            <img
              src="https://i.pravatar.cc/150?img=26"
              alt="profile"
              width="40"
              height="40"
              className="rounded-circle dropdown-toggle"
              data-bs-toggle="dropdown"
              style={{ cursor: "pointer" }}
            />

            <ul
              className="dropdown-menu dropdown-menu-end mt-2 shadow-lg"
              style={{
                minWidth: "180px",
                borderRadius: "12px",
                padding: "0.5rem 0",
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                fontSize: "0.95rem",
              }}
            >
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="#"
                  style={{ color: "#4a5546", fontWeight: "500", padding: "10px 16px" }}
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="#"
                  style={{ color: "#4a5546", fontWeight: "500", padding: "10px 16px" }}
                >
                  Settings
                </a>
              </li>
              <li>
                <hr
                  className="dropdown-divider"
                  style={{ margin: "0.25rem 0", borderColor: "#e0e0e0" }}
                />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center text-danger"
                  onClick={handleLogout}
                  style={{
                    fontWeight: "500",
                    padding: "10px 16px",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#ffe5e5")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  Logout
                </a>
              </li>
            </ul>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
