import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api";
import { ToastContainer, toast } from "react-toastify";

const BookingList = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");

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
  const handleStatusClick = (booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.booking_status);
    setShowStatusModal(true);
  };

  /* ---------------- FETCH BOOKINGS ---------------- */
  const fetchBookings = async () => {
    try {
      const res = await API.get("/hms_admin/booking/");
      setBookings(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/signin");
      } else {
        setError("Failed to fetch bookings");
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ---------------- RENDER ---------------- */
  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <div className="container my-4">
          <div className={`main-content-config ${sidebarOpen ? "" : "expanded"}`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-bold">Booking List</h3>
              <button
                className="btn"
                onClick={() => navigate("/booking/add")}
                style={{ color: "#4a5546", borderColor: "#4a5546", fontWeight: "bold" }}
              >
                + Add Booking
              </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
              <table className="table table-hover table-bordered shadow-sm">
                <thead style={{ backgroundColor: "#4a5546", color: "white" }}>
                  <tr>
                    <th>ID</th>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Nights</th>
                    <th>Total</th>
                    <th>Booking Status</th>
                    <th>Payment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.length > 0 ? (
                    bookings.map((b) => {
                      const nights =
                        (new Date(b.check_out_date) - new Date(b.check_in_date)) /
                        (1000 * 60 * 60 * 24);
                      return (
                        <tr key={b.booking_id}>
                          <td><b>{b.booking_id}</b></td>
                          <td>{b.guest ? b.guest.full_name : "-"}</td>
                         <td>{b.room ? b.room.room_number : "-"}</td>

                          <td>{b.check_in_date}</td>
                          <td>{b.check_out_date}</td>
                          <td>{nights}</td>
                          <td>PKR {b.total_amount}</td>
                          <td>
                            <span
                              className={`badge ${b.booking_status === "confirmed"
                                ? "bg-success"
                                : b.booking_status === "pending"
                                  ? "bg-warning text-dark"
                                  : b.booking_status === "checked_in"
                                    ? "bg-primary"
                                    : b.booking_status === "checked_out"
                                      ? "bg-secondary"
                                      : "bg-danger"
                                }`}
                              style={{ cursor: "pointer" }}
                              onClick={() => handleStatusClick(b)}
                            >
                              {b.booking_status.replace("_", " ").toUpperCase()}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`badge ${b.payment_status === "paid"
                                ? "bg-success"
                                : b.payment_status === "pending"
                                  ? "bg-warning text-dark"
                                  : "bg-danger"
                                }`}
                            >
                              {b.payment_status.toUpperCase()}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => navigate(`/booking/edit/${b.booking_id}`)}
                              title="Edit booking"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => {
                                setSelectedBooking(b);
                                setShowModal(true);
                              }}
                              title="View Details"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        No bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {showStatusModal && selectedBooking && (
              <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Update Booking Status</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowStatusModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      {/* <p>Booking ID: {selectedBooking.booking_id}</p> */}
                      <select
                        className="form-select"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="checked_in">Checked In</option>
                        <option value="checked_out">Checked Out</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowStatusModal(false)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={async () => {
                          try {
                            await API.patch(`/hms_admin/booking/${selectedBooking.booking_id}/`, {
                              booking_status: newStatus,
                            });
                            toast.success("Booking status updated!");

                            // Update local table state
                            setBookings((prevBookings) =>
                              prevBookings.map((b) =>
                                b.booking_id === selectedBooking.booking_id
                                  ? { ...b, booking_status: newStatus }
                                  : b
                              )
                            );

                            setShowStatusModal(false);
                          } catch (err) {
                            toast.error("Failed to update status");
                          }
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}



            {/* ---------------- MODAL ---------------- */}
            {showModal && selectedBooking && (
              <div
                className="modal fade show"
                style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
              >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content shadow-lg border-0 rounded-3">

                    <div
                      className="modal-header d-flex justify-content-between align-items-center"
                      style={{ backgroundColor: "#4a5546", color: "white" }}
                    >
                      <h4 className="fw-bold m-0 text-center" style={{ flexGrow: 1 }}>Booking Details — {selectedBooking.guest.full_name}</h4>
                      <button
                        className="btn-close btn-close-white"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>

                    <div className="modal-body">
                      <table className="table table-striped">
                        <tbody>
                          <tr>
                            <th>Guest</th>
                            <td>{selectedBooking.guest.full_name}</td>
                          </tr>
                          <tr>
                            <th>Room</th>
                            <td>{selectedBooking.room.room_number}</td>
                          </tr>
                          <tr>
                            <th>Check In</th>
                            <td>{selectedBooking.check_in_date}</td>
                          </tr>
                          <tr>
                            <th>Check Out</th>
                            <td>{selectedBooking.check_out_date}</td>
                          </tr>
                          <tr>
                            <th>No of Guests</th>
                            <td>{selectedBooking.no_of_guests}</td>
                          </tr>
                          <tr>
                            <th>Price/Night</th>
                            <td>PKR {selectedBooking.price_per_night}</td>
                          </tr>
                          <tr>
                            <th>Total Amount</th>
                            <td>PKR {selectedBooking.total_amount}</td>
                          </tr>
                          <tr>
                            <th>Advance Amount</th>
                            <td>PKR {selectedBooking.advance_amount}</td>
                          </tr>
                          <tr>
                            <th>Booking Status</th>
                            <td>
                              <span
                                className={`badge ${selectedBooking.booking_status === "confirmed"
                                  ? "bg-success"
                                  : selectedBooking.booking_status === "pending"
                                    ? "bg-warning text-dark"
                                    : selectedBooking.booking_status === "checked_in"
                                      ? "bg-primary"
                                      : selectedBooking.booking_status === "checked_out"
                                        ? "bg-secondary"
                                        : "bg-danger"
                                  }`}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleStatusClick(selectedBooking)}
                              >
                                {selectedBooking.booking_status.replace("_", " ").toUpperCase()}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th>Payment Status</th>
                            <td>{selectedBooking.payment_status.toUpperCase()}</td>
                          </tr>
                          <tr>
                            <th>Special Requests</th>
                            <td>{selectedBooking.special_requests || "—"}</td>
                          </tr>
                          <tr>
                            <th>Created At</th>
                            <td>{selectedBooking.created_at || "—"}</td>
                          </tr>
                          <tr>
                            <th>Booked By</th>
                            <td>{selectedBooking.booked_by || "—"}</td>
                          </tr>
                          <tr>
                            <th>Updated At</th>
                            <td>{selectedBooking.updated_at || "—"}</td>
                          </tr>
                          <tr>
                            <th>Updated By</th>
                            <td>{selectedBooking.updated_by || "—"}</td>
                          </tr>
                          {selectedBooking.cancellation_reason && (
                            <tr>
                              <th>Cancellation Reason</th>
                              <td>{selectedBooking.cancellation_reason}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="modal-footer">
                      <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
