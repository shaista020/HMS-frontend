import React, { useEffect, useState } from "react";
import API from "../../../api";
import { useNavigate } from "react-router-dom";
 
const HotelSetupList = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);


  
  const fetchHotels = async () => {
    try {
      const response = await API.get("hms_admin/hotel_setup/");
      console.log("API response:", response.data);
      setHotels(response.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        
        navigate("/signin");  
      } else {
        setError("Something went wrong while fetching Hotel Setup.");
      }
    }
  };

  useEffect(() => {
    fetchHotels();
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
                style={{ color: "#4a5546", borderColor: "#4a5546", fontWeight: "bold" }}
              >
                + Add Setup
              </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

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
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                      <tr key={hotel.hotel_id}>
                        <td><b>{hotel.hotel_id}</b></td>
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
                        <td>{hotel.is_active ? "Active" : "In Active"}</td>
                        <td>
                          {/* Edit Button */}
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => navigate(`/hotel-setup/edit/${hotel.hotel_id}`)}
                            title="Edit Hotel"
                          >
                            <i className="fas fa-edit"></i>  
                          </button>
 
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => {
                              setSelectedHotel(hotel);
                              setShowModal(true);
                            }}
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>  
                          </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        {error ? error : "No hotel setup found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {showModal && selectedHotel && (
                <div
                  className="modal fade show"
                  style={{
                    display: "block",
                    background: "rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content shadow-lg border-0 rounded-3">

                      {/* HEADER */}
                      <div
                        className="modal-header d-flex justify-content-between align-items-center"
                        style={{ backgroundColor: "#4a5546", color: "white" }}
                      >
                        {selectedHotel.logo && (
                          <img
                            src={selectedHotel.logo}
                            alt="logo"
                            style={{
                              width: "65px",
                              height: "65px",
                              objectFit: "cover",
                              borderRadius: "50%",
                              border: "2px solid white",

                            }}
                          />
                        )}
                        <h4 className="fw-bold m-0 text-center" style={{ flexGrow: 1}}>
                          Hotel Details — {selectedHotel.hotel_name}
                        </h4>



                        <button
                          type="button"
                          className="btn-close btn-close-white"
                          onClick={() => setShowModal(false)}
                        ></button>
                      </div>

                      {/* BODY */}
                      <div className="modal-body">

                        <table className="table table-striped table-hover">
                          <tbody>

                            <tr>
                              <th>Hotel ID</th>
                              <td>{selectedHotel.hotel_id}</td>
                            </tr>

                            <tr>
                              <th>Email</th>
                              <td>{selectedHotel.email}</td>
                            </tr>

                            <tr>
                              <th>Contact</th>
                              <td>{selectedHotel.contact_no}</td>
                            </tr>

                            <tr>
                              <th>Address</th>
                              <td>{selectedHotel.address}</td>
                            </tr>

                            <tr>
                              <th>Website</th>
                              <td>{selectedHotel.website}</td>
                            </tr>

                            <tr>
                              <th>Currency</th>
                              <td>{selectedHotel.currency}</td>
                            </tr>



                            <tr>
                              <th>Status</th>
                              <td>{selectedHotel.is_active ? "Active" : "In Active"}</td>
                            </tr>

                            <tr>
                              <th>Service Tax</th>
                              <td>{selectedHotel.service_tax}</td>
                            </tr>

                            <tr>
                              <th>Room Tax</th>
                              <td>{selectedHotel.room_tax}</td>
                            </tr>

                            <tr>
                              <th>Check In</th>
                              <td>{selectedHotel.check_in_time}</td>
                            </tr>

                            <tr>
                              <th>Check Out</th>
                              <td>{selectedHotel.check_out_time}</td>
                            </tr>

                            <tr>
                              <th>Cancellation Policy</th>
                              <td>{selectedHotel.cancellation_policy}</td>
                            </tr>
                            <tr>
                              <th>Created By</th>
                              <td>{selectedHotel.created_by}</td>
                            </tr>
                            <tr>
                              <th>Updated By</th>
                              <td>{selectedHotel.updated_by}</td>
                            </tr>
                            <tr>
                              <th>Security Settings</th>
                              <td>
                                <pre style={{ background: "#f5f5f5", padding: "10px", borderRadius: "8px" }}>
                                  {JSON.stringify(selectedHotel.security_settings, null, 2)}
                                </pre>
                              </td>
                            </tr>

                          </tbody>
                        </table>

                      </div>

                      {/* FOOTER */}
                      <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                          Close
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSetupList;
