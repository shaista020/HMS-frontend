import React, { useEffect, useState } from "react";
import API from "../../../api";
import { useNavigate } from "react-router-dom";

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedguest, setSelectedguest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);



  const fetchGuests = async () => {
    try {
      const response = await API.get("hms_admin/payment/");
      console.log("API response:", response.data);
      setGuests(response.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {

        navigate("/signin");
      } else {
        setError("Something went wrong.");
      }
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);


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
              <h3 className="fw-bold">Payment List</h3>

              <button
                className="btn"
                onClick={() => navigate("/guest/add")}
                style={{ color: "#4a5546", borderColor: "#4a5546", fontWeight: "bold" }}
              >
                + Add Payment
              </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-wrapper">
              <table className="table table-hover table-bordered shadow-sm">
                <thead style={{ backgroundColor: "#4a5546", color: "white" }}>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Guest Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {guests.length > 0 ? (
                    guests.map((guest) => (
                      <tr key={guest.guest_id}>
                        <td><b>{guest.guest_id}</b></td>
                        <td>{guest.full_name}</td>
                        <td>{guest.email}</td>
                        <td>{guest.phone_number}</td>
                        <td>{guest.guest_type}</td>

                        {/* <td>{guest.is_active ? "Active" : "In Active"}</td> */}
                        <td>
                          {/* Edit Button */}
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => navigate(`/guest-setup/edit/${guest.guest_id}`)}
                            title="Edit guest"
                          >
                            <i className="fas fa-edit"></i>
                          </button>

                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => {
                              setSelectedguest(guest);
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
                        {error ? error : "No guest setup found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {showModal && selectedguest && (
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
                        <h4 className="fw-bold m-0 text-center" style={{ flexGrow: 1 }}>
                          Guest Details — {selectedguest.full_name}
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
                              <th>Guest ID</th>
                              <td>{selectedguest.guest_id}</td>
                            </tr>
                            <tr>
                              <th>Full Name</th>
                              <td>{selectedguest.full_name}</td>
                            </tr>
                            <tr>
                              <th>Gender</th>
                              <td>{selectedguest.gender}</td>
                            </tr>
                            <tr>
                              <th>Date of Birth</th>
                              <td>{selectedguest.date_of_birth}</td>
                            </tr>
                            <tr>
                              <th>Phone Number</th>
                              <td>{selectedguest.phone_number}</td>
                            </tr>
                            <tr>
                              <th>Email</th>
                              <td>{selectedguest.email}</td>
                            </tr>
                            <tr>
                              <th>Address</th>
                              <td>{selectedguest.address}</td>
                            </tr>
                            <tr>
                              <th>Nationality</th>
                              <td>{selectedguest.nationality}</td>
                            </tr>
                            <tr>
                              <th>Document Type</th>
                              <td>{selectedguest.document_type}</td>
                            </tr>
                            <tr>
                              <th>Document Number</th>
                              <td>{selectedguest.document_number}</td>
                            </tr>
                            <tr>
                              <th>Document Image</th>
                              <td>
                                {selectedguest.document_image ? (
                                  <img
                                    src={selectedguest.document_image}
                                    alt="Document"
                                    style={{ maxWidth: "150px", borderRadius: "5px" }}
                                  />
                                ) : (
                                  "No Image"
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th>Guest Type</th>
                              <td>{selectedguest.guest_type}</td>
                            </tr>
                            <tr>
                              <th>Special Requests</th>
                              <td>{selectedguest.special_requests || "None"}</td>
                            </tr>
                            <tr>
                              <th>Status</th>
                              <td>{selectedguest.status ? "Active" : "Inactive"}</td>
                            </tr>
                            <tr>
                              <th>Remarks</th>
                              <td>{selectedguest.remarks || "None"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* FOOTER */}
                      <div className="modal-footer">
                        <button
                          className="btn btn-secondary"
                          onClick={() => setShowModal(false)}
                        >
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

export default GuestList;
