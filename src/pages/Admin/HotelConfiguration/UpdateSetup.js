import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HotelSetupForm = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { hotel_id } = useParams();
  const [logoPreview, setLogoPreview] = useState(null);
  const [formData, setFormData] = useState({   
    hotel_name: "",
    logo: null,
    address: "",
    contact_no: "",
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

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    } else {
      console.log("No token found");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 992);
      setIsMobile(window.innerWidth <= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!token) return;
    if (!hotel_id) return;
    setLoading(true);

    axios
      .get(`http://127.0.0.1:8000/hms_admin/hotel_setup/${hotel_id}/`)
      .then((res) => {
        const data = res.data;
 
        setFormData({
          hotel_name: data.hotel_name || "",
          logo: null,
          address: data.address || "",
          contact_no: data.contact_no || "",
          email: data.email || "",
          website: data.website || "",
          service_tax: data.service_tax || "",
          room_tax: data.room_tax || "",
          check_in_time: data.check_in_time || "",
          check_out_time: data.check_out_time || "",
          currency: data.currency || "PKR",
          cancellation_policy: data.cancellation_policy || "",
          security_settings: data.security_settings
            ? JSON.stringify(data.security_settings, null, 2)
            : "",
          is_active: data.is_active,
        });

        if (data.logo) {
          setLogoPreview(`${data.logo}`);
        } else {
          console.log(" No logo found in backend");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(" GET ERROR:", err);
        setLoading(false);
      });
  }, [token, hotel_id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      const file = files[0];
      setFormData({ ...formData, logo: file });

      if (file) {
        setLogoPreview(URL.createObjectURL(file)); // Preview set
      }
    }

    else if (name === "is_active") {
      setFormData({ ...formData, is_active: value === "true" });
    }

    else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!token) return toast.warn("You are not authenticated!");

  const submitData = new FormData();
  for (let key in formData) {
    if (formData[key] !== null) submitData.append(key, formData[key]);
  }

  try {
    let res;
    if (hotel_id) {
      res = await axios.put(
        `http://127.0.0.1:8000/hms_admin/hotel_setup/${hotel_id}/`,
        submitData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
 
      toast.success("Hotel Setup Updated Successfully!", {
        autoClose: 3000,
        onClose: () => navigate("/hotel-setup/list"),  
      });
    }

    console.log(res.data);

  } catch (err) {
    console.error(err);
    toast.error("Error saving data!");
  }
};


  if (loading) return <p>Loading...</p>;

  return (
    <div className="d-flex">
      <div className="flex-grow-1">
             
        <div className="container my-4">
        <ToastContainer position="top-right" autoClose={3000}   />
          <div className={`main-content-config ${sidebarOpen ? "" : "expanded"}`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3> Update Hotel Setup </h3>
            </div>

            <form
              className="card shadow-sm p-4"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="row g-3">

                {/* Hotel ID (Readonly - Only in Edit Mode) */}
                {hotel_id && (
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Hotel ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={hotel_id}
                      readOnly
                    />
                  </div>
                )}

                {/* Hotel Name */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    Hotel Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="hotel_name"
                    value={formData.hotel_name}
                    onChange={handleChange}
                    required
                  />
                </div>
 {/* Contact */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    Contact Number <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact_no"
                    value={formData.contact_no}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Logo Upload */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Logo</label>
                  <input
                    type="file"
                    className="form-control"
                    name="logo"
                    onChange={handleChange}
                  />


                  {logoPreview && (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="img-thumbnail mt-2"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "contain",
                        border: "1px solid #ddd",
                      }}
                    />
                  )}

                </div>

                {/* Address */}
                <div className="col-6">
                  <label className="form-label fw-bold">
                    Address <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                 {/* Check-in */}
                <div className="col-md-3">
                  <label className="form-label fw-bold">
                    Check-In Time <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    name="check_in_time"
                    value={formData.check_in_time}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Check-out */}
                <div className="col-md-3">
                  <label className="form-label fw-bold">
                    Check-Out Time <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    name="check_out_time"
                    value={formData.check_out_time}
                    onChange={handleChange}
                    required
                  />
                </div>

               

                {/* Website */}
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
                

                {/* Service Tax */}
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

                {/* Room Tax */}
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

               

                {/* Currency */}
                <div className="col-md-6">
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

                {/* Cancellation Policy */}
                <div className="col-12">
                  <label className="form-label fw-bold">Cancellation Policy</label>
                  <textarea
                    className="form-control"
                    name="cancellation_policy"
                    value={formData.cancellation_policy}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Security Settings */}
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

                {/* Active Status */}
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

              {/* Submit Button */}
             {/* Buttons at the left */}
<div className="d-flex justify-content-end mt-3">
  <button
    type="button"
    className="btn btn-secondary me-2"
    onClick={() => navigate("/hotel-setup/list")}
    style={{ fontWeight: "bold" }}
  >
    Back to List
  </button>

  <button
    type="submit"
    className="btn text-white"
    style={{ backgroundColor: "#4a5536", fontWeight: "bold" }}
  >
     Update 
  </button>
</div>

 

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSetupForm;
