import React, { useState, useEffect } from "react";
import API from "../../../api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRoomType = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    room_type_name: "",
    base_price: "",
    description: "",
    amenities: "",
    is_active: true,
  });

  
 
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
 
  useEffect(() => {
    
    API
      .get("user/me/")
      .then((res) => {
        console.log("User:", res.data);
      })
      .catch((err) => {
        console.log("API Error:", err.response?.data || err.message);
      });
  }, []);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "logo") {
      setFormData({ ...formData, logo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
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
    const res = await API.post(
      "hms_admin/room_type/",
      submitData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Hotel Setup Saved:", res.data);

    toast.success("Hotel Setup Added Successfully!", {
      autoClose: 3000,
      onClose: () => navigate("/room-types/list")  
    });
 
    setFormData({
      room_type_name: "",
      base_price: "",
      description: "",
      amenities: "",
      is_active: true,
    });
  } catch (err) {
    console.error(err);
    toast.error("Error saving data!");
  }
};

  return (
    <div className="d-flex">
      
      <div className="flex-grow-1">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="container my-4">        
          <div className={`main-content ${sidebarOpen ? "" : "expanded"}`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Add Room Type</h3>

               
            </div>
 
            <form
              className="card shadow-sm p-4"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="row g-3">

                <div className="col-md-6">
                  <label className="form-label fw-bold">Room Type Name <span style={{ color: 'red', fontWeight: 'bold' }}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name="room_type_name"
                    value={formData.room_type_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">base_price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="base_price"
                    value={formData.base_price}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">amenities <span style={{ color: 'red', fontWeight: 'bold' }}>*</span></label>
                  <textarea
                    className="form-control"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    
                  />
                </div>

                 

                <div className="col-md-6">
                  <label className="form-label fw-bold">Status</label>
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
                Save Room Type
              </button>
            </form>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default AddRoomType;
