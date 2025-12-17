import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";

const BookingUpdate = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const { booking_id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [guests, setGuests] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loadingRooms, setLoadingRooms] = useState(false);

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

    /* ---------------- LOAD GUESTS ---------------- */
    useEffect(() => {
        API.get("/hms_admin/guest/")
            .then((res) => setGuests(res.data))
            .catch(() => toast.error("Failed to load guests"));
    }, []);

    /* ---------------- LOAD BOOKING ---------------- */
  useEffect(() => {
  if (!booking_id) return;

  setLoading(true);
  API.get(`/hms_admin/booking/${booking_id}/`)
    .then((res) => {
      setFormData({
        guest: res.data.guest?.guest_id?.toString() || "",
       room: res.data.room?.room_id?.toString() || "",

        check_in_date: res.data.check_in_date,
        check_out_date: res.data.check_out_date,
        no_of_guests: res.data.no_of_guests,
        special_requests: res.data.special_requests || "",
      });
    })
    .catch(() => toast.error("Failed to load booking"))
    .finally(() => setLoading(false));
}, [booking_id]);

    /* ---------------- LOAD AVAILABLE ROOMS ---------------- */
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
  `/hms_admin/rooms/Available/?check_in=${formData.check_in_date}&check_out=${formData.check_out_date}&booking_id=${booking_id}`
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


    /* ---------------- CALCULATE SUMMARY ---------------- */
    useEffect(() => {
        if (!formData.check_in_date || !formData.check_out_date || !formData.room)
            return;
        if (!formData.room) {
            setSummary({ nights: 0, price: 0, total: 0 });
            return;
        }
        const room = rooms.find(
            (r) => r.room_id === Number(formData.room)
        );
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
    }, [formData, rooms]);

    /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "check_in_date" || name === "check_out_date") {
    setFormData({ ...formData, [name]: value });
    setSummary({ nights: 0, price: 0, total: 0 });
 

    return;
  }

  // update other fields
  setFormData({ ...formData, [name]: value });
};

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.guest || !formData.room) {
      toast.error("Guest and Room are required");
      return;
    }

    try {
      await API.put(`/hms_admin/booking/${booking_id}/`, {
        ...formData,
        guest: Number(formData.guest),
        room_id: Number(formData.room),
        no_of_guests: Number(formData.no_of_guests),
        price_per_night: summary.price,
      });

      toast.success("Booking updated successfully", {
        autoClose: 1500,
        onClose: () => navigate("/booking"),
      });
    } catch (err) {
      toast.error(err.response?.data?.detail || "Update failed");
    }
  };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="d-flex">
            <div className="flex-grow-1">
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="container my-4">
                    <div className={`main-content-config ${sidebarOpen ? "" : "expanded"}`}>
                        <h3 className="mb-3">Update Booking</h3>

                        <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
                            <div className="row g-3">

                                {/* Guest */}
                                <div className="col-md-6">
                                    <label className="fw-bold">Guest *</label>
                                    <select
                                        className="form-control"
                                        name="guest"
                                        value={formData.guest}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Guest</option>
                                        {guests.map((g) => (
                                            <option key={g.guest_id} value={g.guest_id}>
                                                {g.full_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Dates */}
                                <div className="col-md-3">
                                    <label className="fw-bold">Check In *</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="check_in_date"
                                        value={formData.check_in_date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label className="fw-bold">Check Out *</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="check_out_date"
                                        value={formData.check_out_date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Room */}
                            {/* ---------------- Room ---------------- */}
<div className="col-md-6">
  <label className="fw-bold">
    Available Rooms <span className="text-danger">*</span>
  </label>
  <select
    className="form-select"
    name="room"
    value={formData.room || ""}
    onChange={handleChange}
    disabled={loadingRooms || rooms.length === 0}
    required
  >
    <option value="">
      {loadingRooms ? "Loading..." : "Select Room"}
    </option>

    {rooms.map((r) => (
      <option key={r.room_id} value={r.room_id.toString()}>
        {r.room_number} - {r.room_type_name} ({r.price} PKR)
      </option>
    ))}
  </select>
</div>






                                {/* Guests */}
                                <div className="col-md-3">
                                    <label className="fw-bold">No of Guests</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="no_of_guests"
                                        value={formData.no_of_guests}
                                        onChange={handleChange}
                                        min="1"
                                    />
                                </div>

                                {/* Requests */}
                                <div className="col-md-12">
                                    <label className="fw-bold">Special Requests</label>
                                    <textarea
                                        className="form-control"
                                        name="special_requests"
                                        value={formData.special_requests}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Summary */}
                                <div className="col-md-12 bg-light p-3 rounded">
                                    <strong>Booking Summary</strong><br />
                                    Nights: {summary.nights}<br />
                                    Price / Night:  {summary.price} PKR<br />
                                    <strong>Total:  {summary.total} PKR</strong>
                                </div>
                            </div>

                            <div className="text-end mt-3">
                                <button
                                    type="button"
                                    className="btn btn-secondary me-2"
                                    onClick={() => navigate("/booking")}
                                >
                                    Back
                                </button>

                                <button type="submit"
                                    className="btn   text-white"
                                    style={{ backgroundColor: "#4a5546" }}
                                >
                                    Update Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default BookingUpdate;
