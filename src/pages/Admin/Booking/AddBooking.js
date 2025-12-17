import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";

const AddBooking = () => {
  const navigate = useNavigate();

  /* -------------------- STATES -------------------- */
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 992);
      setIsMobile(window.innerWidth <= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [summary, setSummary] = useState({
    nights: 0,
    price: 0,
    total: 0,
  });

  const [formData, setFormData] = useState({
    guest: "",
    room: "",
    check_in_date: "",
    check_out_date: "",
    no_of_guests: 1,
    special_requests: "",
  });

  /* -------------------- FETCH GUESTS -------------------- */
  useEffect(() => {
    API.get("/hms_admin/guest/")
      .then((res) => setGuests(res.data))
      .catch(() => toast.error("Failed to load guests"));
  }, []);

  /* -------------------- FETCH AVAILABLE ROOMS -------------------- */
  useEffect(() => {
    if (!formData.check_in_date || !formData.check_out_date) {
      setRooms([]);
      return;
    }

    if (formData.check_in_date >= formData.check_out_date) {
      toast.error("Check-out date must be after Check-in date");
      return;
    }

    setLoadingRooms(true);

    API.get(
      `/hms_admin/rooms/Available/?check_in=${formData.check_in_date}&check_out=${formData.check_out_date}`
    )
      .then((res) => {
        setRooms(res.data);
        if (res.data.length === 0) {
          toast.warning("No rooms available for selected dates");
        }
      })
      .catch(() => toast.error("Failed to load available rooms"))
      .finally(() => setLoadingRooms(false));
  }, [formData.check_in_date, formData.check_out_date]);

  /* -------------------- CALCULATE SUMMARY -------------------- */
  useEffect(() => {
    if (!formData.room) {
      setSummary({ nights: 0, price: 0, total: 0 });
      return;
    }

    const room = rooms.find((r) => r.room_id === Number(formData.room));
    if (!room) return;

    const checkIn = new Date(formData.check_in_date);
    const checkOut = new Date(formData.check_out_date);
    let nights = 0;

    if (formData.check_in_date && formData.check_out_date) {
      nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
      if (nights < 0) nights = 0;
    }

    setSummary({
      nights,
      price: Number(room.price),
      total: nights * Number(room.price),
    });
  }, [formData.room, formData.check_in_date, formData.check_out_date, rooms]);

  /* -------------------- HANDLE CHANGE -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // reset room when date changes
    if (name === "check_in_date" || name === "check_out_date") {
      setFormData({ ...formData, [name]: value, room: "" });
      setSummary({ nights: 0, price: 0, total: 0 });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  /* -------------------- FRONTEND VALIDATION -------------------- */
  const validateForm = () => {
    if (!formData.guest) {
      toast.error("Please select guest");
      return false;
    }
    if (!formData.check_in_date || !formData.check_out_date) {
      toast.error("Please select check-in and check-out dates");
      return false;
    }
    if (!formData.room) {
      toast.error("Please select available room");
      return false;
    }
    if (formData.no_of_guests < 1) {
      toast.error("Number of guests must be at least 1");
      return false;
    }
    return true;
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Send booking data
      await API.post("/hms_admin/booking/", {
        ...formData,
        guest: Number(formData.guest),
        room: Number(formData.room),
        no_of_guests: Number(formData.no_of_guests),
      });

      // Update local rooms state to mark room as Occupied
      setRooms((prevRooms) =>
        prevRooms.map((r) =>
          r.room_id === Number(formData.room)
            ? { ...r, status: "Occupied" }
            : r
        )
      );

      // Show success toast and navigate
      toast.success("Booking created successfully!", {
        autoClose: 1500,
        onClose: () => navigate("/booking"),
      });
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Booking failed";
      toast.error(msg);
    }
  };


  /* -------------------- UI -------------------- */
  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="container my-4">
          <div className={`main-content-config ${sidebarOpen ? "" : "expanded"}`}>
            <h3 className="mb-4">Add Booking</h3>

            <form className="card shadow-sm p-4" onSubmit={handleSubmit}>
              <div className="row g-3">

                {/* Guest */}
                <div className="col-md-6">
                  <label className="fw-bold">
                    Guest <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="guest"
                    value={formData.guest}
                    onChange={handleChange}
                  >
                    <option value="">Select Guest</option>
                    {guests.map((g) => (
                      <option key={g.guest_id} value={g.guest_id}>
                        {g.full_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Check In */}
                <div className="col-md-3">
                  <label className="fw-bold">Check In *</label>
                  <input
                    type="date"
                    className="form-control"
                    name="check_in_date"
                    value={formData.check_in_date}
                    onChange={handleChange}
                  />
                </div>

                {/* Check Out */}
                <div className="col-md-3">
                  <label className="fw-bold">Check Out *</label>
                  <input
                    type="date"
                    className="form-control"
                    name="check_out_date"
                    value={formData.check_out_date}
                    onChange={handleChange}
                  />
                </div>

                {/* Room */}
                <div className="col-md-6">
                  <label className="fw-bold">
                    Available Rooms <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    disabled={loadingRooms || rooms.length === 0}
                  >
                    <option value="">
                      {loadingRooms ? "Loading..." : "Select Room"}
                    </option>
                    {rooms.map((r) => (
                      <option key={r.room_id} value={r.room_id}>
                        {r.room_number} - {r.room_type} ({r.price} PKR )
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guests */}
                <div className="col-md-6">
                  <label className="fw-bold">No of Guests</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    name="no_of_guests"
                    value={formData.no_of_guests}
                    onChange={handleChange}
                  />
                </div>

                {/* Special Requests */}
                <div className="col-12">
                  <label className="fw-bold">Special Requests</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    name="special_requests"
                    value={formData.special_requests}
                    onChange={handleChange}
                  />
                </div>

                {/* Summary */}
                {summary.nights > 0 && (
                  <div className="col-12">
                    <div className=" ">
                      <strong>Booking Summary</strong><br />
                      Nights: {summary.nights}<br />
                      Price / Night:  {summary.price} PKR<br />
                      <strong>Total:  {summary.total} PKR</strong>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn mt-3 text-white"
                style={{ backgroundColor: "#4a5546" }}
              >
                Save Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default AddBooking;
