import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HotelSetupList = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/hms_admin/hotel_setup/")
      .then((response) => {
        console.log("API response:", response.data);
        setHotels(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong while fetching Hotel Setup.");
      });
  }, []);

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

  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <div className="container my-4">
          <div className={`main-content-config ${sidebarOpen ? "" : "expanded"}`}>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-bold">Hotel Setup List</h3>

              <button
                className="btn"
                onClick={() => navigate("/add-setup")}
                style={{
                  color: "#4a5546",
                  borderColor: "#4a5546",
                  fontWeight: "bold",
                }}
              >
                + Add Setup
              </button>
            </div>

            {/* TABLE */}
            <div className="table-wrapper">
              <table className="table table-hover table-bordered shadow-sm">
                <thead style={{ backgroundColor: "#4a5546", color: "white" }}>
                  <tr>
                    <th>ID</th>
                    <th>Logo</th>
                    <th>Hotel Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Website</th>
                    <th>Currency</th>
                    <th>Created By</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                      <tr key={hotel.hotel_id}>
                        <td>{hotel.hotel_id}</td>

                        <td>
                          {hotel.logo ? (
                            <img
                              src={hotel.logo}
                              alt="logo"
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                          ) : (
                            "No Logo"
                          )}
                        </td>

                        <td>{hotel.hotel_name}</td>
                        <td>{hotel.email}</td>
                        <td>{hotel.contact_no}</td>
                        <td>{hotel.website}</td>
                        <td>{hotel.currency}</td>
                        <td>{hotel.created_by}</td>
                        <td>{hotel.is_active ? "Yes" : "No"}</td>

                        <td>
                          <button className="btn btn-warning btn-sm">Edit</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No hotel setup found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSetupList;
