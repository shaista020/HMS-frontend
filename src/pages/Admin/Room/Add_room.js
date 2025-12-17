import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";

const AddRooms = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);

  const navigate = useNavigate();

  const [roomTypes, setRoomTypes] = useState([]);
  const [formData, setFormData] = useState({
    floor_number: "",
    room_type: "",
    capacity: "",
    image: null,
    price: "",
    status: "Available",
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
    API.get("http://127.0.0.1:8000/hms_admin/room_type/")
      .then((res) => setRoomTypes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "room_type") {
      setFormData({ ...formData, room_type: value });

      if (value) {
        try {
          const res = await API.get(
            `hms_admin/room_type/${value}/`
          );
          setSelectedRoomInfo(res.data);
        } catch (error) {
          console.log("Room type detail fetch error", error);
        }
      } else {
        setSelectedRoomInfo(null);
      }

      return;
    }

    if (name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    const submitData = new FormData();
    for (let key in formData) {
      submitData.append(key, formData[key]);
    }

    try {
      const res = await API.post(
        "hms_admin/rooms/",
        submitData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Room Added Successfully!", {
        autoClose: 2000,
        onClose: () => navigate("/rooms/list"),
      });

      setFormData({
        floor_number: "",
        room_type: "",
        capacity: "",
        image: null,
        price: "",
        status: "Available",
      });

    }
    catch (err) {
      console.error("Room Save Error:", err);

      if (err.response && err.response.data) {
        const errors = err.response.data;

        let firstError = null;

        if (typeof errors === "object") {
          const firstKey = Object.keys(errors)[0];

          let message = Array.isArray(errors[firstKey])
            ? errors[firstKey][0]
            : errors[firstKey];

          firstError = `${firstKey.toUpperCase()}: ${message}`;
        } else {
          firstError = errors;
        }

        toast.error(firstError, {
          position: "top-right",
          autoClose: 2500,
        });

      } else {
        toast.error("Something went wrong!", { autoClose: 2500 });
      }
    }


  };


  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="container my-4">
          <div className={`main-content ${sidebarOpen ? "" : "expanded"}`}>
            <h3 className="mb-3">Add Room</h3>
            <form
              className="card shadow-sm p-4"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    Floor Number<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="floor_number"
                    value={formData.floor_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Room Type<span style={{ color: "red" }}>*</span></label>
                  <select
                    className="form-control"
                    name="room_type"
                    value={formData.room_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Room Type</option>
                    {roomTypes.map((type) => (
                      <option key={type.room_type_id} value={type.room_type_id}>
                        {type.room_type_name}
                      </option>
                    ))}

                  </select>
                </div>
                {selectedRoomInfo && (
                  <>
                    <div className="col-md-6 mt-3">
                      <label className="form-label fw-bold">Base Price</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedRoomInfo.base_price}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mt-3">
                      <label className="form-label fw-bold">Amenities</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedRoomInfo.amenities}
                        readOnly
                      />
                    </div>
                  </>
                )}

                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    Capacity<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Status</label>
                  <select
                    className="form-control"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn mt-3 text-white"
                style={{ backgroundColor: "#4a5546" }}
              >
                Save Room
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRooms;
