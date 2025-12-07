import React, { useState, useEffect } from "react";
import axios from "axios";

const AddHotelSetup = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [formData, setFormData] = useState({
    hotel_name: "",
    logo: "",
    address: "",
    contact_number: "",
    email: "",
    website: "",
    service_tax: "",
    room_tax: "",
    check_in_time: "",
    check_out_time: "",
    currency: "PKR",
    cancellation_policy: "",
    security_settings: "",
    is_active: true,
  });
 const token = sessionStorage.getItem("token") || localStorage.getItem("token");

  // 👉 Console token here
  console.log("Logged-in Token:", token);

  // Sidebar Responsive Logic
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

  // Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    // file upload
    if (name === "logo") {
      setFormData({
        ...formData,
        logo: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();

    for (let key in formData) {
      submitData.append(key, formData[key]);
    }

    try {
  const res = await axios.post(
    "http://127.0.0.1:8000/hms_admin/hotel_setup/",
    submitData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

      console.log("Hotel Setup Saved:", res.data);
      alert("Hotel Setup Added Successfully!");

      // Reset
      setFormData({
        hotel_name: "",
        logo: "",
        address: "",
        contact_number: "",
        email: "",
        website: "",
        service_tax: "",
        room_tax: "",
        check_in_time: "",
        check_out_time: "",
        currency: "PKR",
        cancellation_policy: "",
        security_settings: "",
        is_active: true,
      });
    } catch (err) {
      console.error(err);
      alert("Error saving data!");
    }
  };

  return (
    <div className="d-flex">
      {/* Main Content */}
      <div className="flex-grow-1">
        <div className="container my-4">
          <div className={`main-content ${sidebarOpen ? "" : "expanded"}`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Add Hotel Setup</h3>

              {isMobile && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setSidebarOpen(false)}
                >
                  Close Sidebar
                </button>
              )}
            </div>

            {/* Form Starts */}
            <form
              className="card shadow-sm p-4"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="row g-3">

                <div className="col-md-6">
                  <label className="form-label fw-bold">Hotel Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hotel_name"
                    value={formData.hotel_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Logo</label>
                  <input
                    type="file"
                    className="form-control"
                    name="logo"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Address *</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Contact Number *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Website</label>
                  <input
                    type="text"
                    className="form-control"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-bold">Service Tax %</label>
                  <input
                    type="number"
                    className="form-control"
                    name="service_tax"
                    value={formData.service_tax}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-bold">Room Tax %</label>
                  <input
                    type="number"
                    className="form-control"
                    name="room_tax"
                    value={formData.room_tax}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Check-In Time *</label>
                  <input
                    type="time"
                    className="form-control"
                    name="check_in_time"
                    value={formData.check_in_time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Check-Out Time *</label>
                  <input
                    type="time"
                    className="form-control"
                    name="check_out_time"
                    value={formData.check_out_time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-bold">Currency</label>
                  <select
                    className="form-select"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <option value="PKR">PKR</option>
                    <option value="USD">USD</option>
                    <option value="AED">AED</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">
                    Cancellation Policy
                  </label>
                  <textarea
                    className="form-control"
                    name="cancellation_policy"
                    value={formData.cancellation_policy}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Security Settings</label>
                  <textarea
                    className="form-control"
                    placeholder='{"cctv": true, "password_expiry": 60}'
                    name="security_settings"
                    value={formData.security_settings}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-bold">Active Status</label>
                  <select
                    className="form-select"
                    name="is_active"
                    value={formData.is_active}
                    onChange={handleChange}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </select>
                </div>

              </div>

              <button className="btn mt-3 text-white" style={{ backgroundColor: "#4a5536" }}>
                Save Hotel Setup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotelSetup;
