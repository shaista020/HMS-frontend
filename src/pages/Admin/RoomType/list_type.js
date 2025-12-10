import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const ListRoomType = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedRType, setselectedRType] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const token =
    localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
 
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      navigate("/signin");  
    }
  }, [token, navigate]);
 
  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/hms_admin/room_type/");
      console.log("API response:", response.data);
      setHotels(response.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        // // Token invalid or expired
        // localStorage.removeItem("access_token");
        // localStorage.removeItem("refresh_token");
        // sessionStorage.removeItem("access_token");
        // sessionStorage.removeItem("refresh_token");
        navigate("/signin"); // redirect to login
      } else {
        setError("Something went wrong while fetching Hotel Setup.");
      }
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Responsive sidebar
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
              <h3 className="fw-bold">Room Type List</h3>

              <button
                className="btn"
                onClick={() => navigate("/room-types/add")}
                style={{ color: "#4a5546", borderColor: "#4a5546", fontWeight: "bold" }}
              >
                + Add Room Type
              </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {/* TABLE */}
            <div className="table-wrapper">
              <table className="table table-hover table-bordered shadow-sm">
                <thead style={{ backgroundColor: "#4a5546", color: "white" }}>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Base Price</th>
                    <th>Amenities</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {hotels.length > 0 ? (
                    hotels.map((hotel, index) => (
                      <tr key={hotel.room_type_id}>
                       <td>{index + 1}</td>
                        <td>{hotel.room_type_name}</td>
                        <td>{hotel.base_price}</td>
                        <td>{hotel.amenities}</td>
                        <td>{hotel.description}</td>
                        <td>{hotel.is_active ? "Active" : "Inactive"}</td>
                        <td>
                          {/* Edit Button */}
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => navigate(`/room-types/edit/${hotel.room_type_id}`)}
                            title="Edit Hotel"
                          >
                            <i className="fas fa-edit"></i>  
                          </button>
 
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => {
                              setselectedRType(hotel);
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
              {showModal && selectedRType && (
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
                        
                        <h4 className="fw-bold m-0 text-center" style={{ flexGrow: 1}}>
                          Room Type Details — {selectedRType.room_type_name}
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
                              <th>base_price</th>
                              <td>{selectedRType.base_price}</td>
                            </tr>

                            <tr>
                              <th>amenities</th>
                              <td>{selectedRType.amenities}</td>
                            </tr>

                            <tr>
                              <th>description</th>
                              <td>{selectedRType.description}</td>
                            </tr>

                               
                            <tr>
                              <th>Created By</th>
                              <td>{selectedRType.created_by}</td>
                            </tr>
                            <tr>
                              <th>Updated By</th>
                              <td>{selectedRType.updated_by}</td>
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

export default ListRoomType;
