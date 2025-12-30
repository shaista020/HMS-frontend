import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";

const AddPayment = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState({
    booking: "",
    amount: "",
    tax_amount: 0,
    discount_amount: 0,
    final_amount: 0,
    method: "Cash",
    transaction_id: "",
    payment_image: null,
    status: "Pending",
  });

  const navigate = useNavigate();
 
  useEffect(() => {
    API.get("hms_admin/booking/")
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  }, []);
 
  const handleBookingChange = async (e) => {
    const bookingId = e.target.value;
    setFormData({ ...formData, booking: bookingId });

    if (bookingId) {
      try {
        const res = await API.get(`hms_admin/booking/${bookingId}/`);
        setSelectedBooking(res.data);
 
        const amount = res.data.total_amount || res.data.price_per_night;
        setFormData({
          ...formData,
          booking: bookingId,
          amount: amount,
          final_amount: amount,  
          tax_amount: 0,
          discount_amount: 0,
        });
      } catch (err) {
        console.log("Error fetching booking details", err);
      }
    } else {
      setSelectedBooking(null);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "payment_image") {
      setFormData({ ...formData, payment_image: files[0] });
    } else {
      let updatedForm = { ...formData, [name]: value };
 
      if (name === "amount" || name === "tax_amount" || name === "discount_amount") {
        const amount = parseFloat(updatedForm.amount) || 0;
        const tax = parseFloat(updatedForm.tax_amount) || 0;
        const discount = parseFloat(updatedForm.discount_amount) || 0;
        updatedForm.final_amount = amount + tax - discount;
      }

      setFormData(updatedForm);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) {
        submitData.append(key, formData[key]);
      }
    }

    try {
      const res = await API.post("hms_admin/payment/", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Payment Added Successfully!", {
        autoClose: 2000,
        onClose: () => navigate("/payments/list"),
      });

      setFormData({
        booking: "",
        amount: "",
        tax_amount: 0,
        discount_amount: 0,
        final_amount: 0,
        method: "Cash",
        transaction_id: "",
        payment_image: null,
        status: "Pending",
      });

      setSelectedBooking(null);
    } catch (err) {
      console.error("Payment Save Error:", err);
      if (err.response && err.response.data) {
        const errors = err.response.data;
        const firstKey = Object.keys(errors)[0];
        const message = Array.isArray(errors[firstKey]) ? errors[firstKey][0] : errors[firstKey];
        toast.error(`${firstKey.toUpperCase()}: ${message}`, { autoClose: 2500 });
      } else {
        toast.error("Something went wrong!", { autoClose: 2500 });
      }
    }
  };

  return (
    <div className="container my-4">
      <ToastContainer />
      <h3 className="mb-3">Add Payment</h3>
      <form className="card shadow-sm p-4" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">
              Select Booking<span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="form-control"
              name="booking"
              value={formData.booking}
              onChange={handleBookingChange}
              required
            >
              <option value="">Select Booking</option>
              {bookings.map((b) => (
                <option key={b.booking_id} value={b.booking_id}>
                  {b.guest.full_name} — Room {b.room.room_number}
                </option>
              ))}
            </select>
          </div>

          {selectedBooking && (
            <>
              <div className="col-md-6 mt-3">
                <label className="form-label fw-bold">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mt-3">
                <label className="form-label fw-bold">Tax Amount</label>
                <input
                  type="number"
                  className="form-control"
                  name="tax_amount"
                  value={formData.tax_amount}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mt-3">
                <label className="form-label fw-bold">Discount Amount</label>
                <input
                  type="number"
                  className="form-control"
                  name="discount_amount"
                  value={formData.discount_amount}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mt-3">
                <label className="form-label fw-bold">Final Amount</label>
                <input
                  type="number"
                  className="form-control"
                  name="final_amount"
                  value={formData.final_amount}
                  readOnly
                />
              </div>
            </>
          )}

          <div className="col-md-6 mt-3">
            <label className="form-label fw-bold">Payment Method</label>
            <select
              className="form-control"
              name="method"
              value={formData.method}
              onChange={handleChange}
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div className="col-md-6 mt-3">
            <label className="form-label fw-bold">Transaction ID</label>
            <input
              type="text"
              className="form-control"
              name="transaction_id"
              value={formData.transaction_id}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mt-3">
            <label className="form-label fw-bold">Upload Payment Receipt</label>
            <input
              type="file"
              className="form-control"
              name="payment_image"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mt-3">
            <label className="form-label fw-bold">Payment Status</label>
            <select
              className="form-control"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn text-white" style={{ backgroundColor: "#4a5546" }}>
              Save Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPayment;
