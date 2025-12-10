import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RoomUpdate = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { room_id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);

  const [formData, setFormData] = useState({
    floor_number: "",
    room_type: "",
    capacity: "",
    image: null,
    price: "",
    status: "Available",
  });

  const [token, setToken] = useState(null);

  // Get token
  useEffect(() => {
    const storedToken =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 992);
      setIsMobile(window.innerWidth <= 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch Room Types
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://127.0.0.1:8000/hms_admin/room_type/")
      .then((res) => setRoomTypes(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  // Fetch Room Data
  useEffect(() => {
    if (!token || !room_id) return;
    setLoading(true);

    axios
      .get(`http://127.0.0.1:8000/hms_admin/rooms/${room_id}/`)
      .then((res) => {
        const data = res.data;
        setFormData({
          floor_number: data.floor_number || "",
          room_type: data.room_type || "",
          capacity: data.capacity || "",
          image: null,
          price: data.price || "",
          status: data.status || "Available",
        });


        if (data.image) setImagePreview(data.image);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [token, room_id]);
 
useEffect(() => {
  if (formData.room_type) {
    axios
      .get(`http://127.0.0.1:8000/hms_admin/room_type/${formData.room_type}/`)
      .then((res) => setSelectedRoomInfo(res.data))
      .catch((err) => console.log("Room type fetch error", err));
  }
}, [formData.room_type]);

  const handleChange = async (e) => {
  const { name, value } = e.target;

  if (name === "room_type") {
    setFormData({ ...formData, room_type: value });

    if (value) {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/hms_admin/room_type/${value}/`
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
  if (!token) return toast.warn("You are not authenticated!");

  const submitData = new FormData();
  for (let key in formData) {
    if (formData[key] !== null) {
      submitData.append(key, formData[key]);
    }
  }

  try {
    const res = await axios.put(
      `http://127.0.0.1:8000/hms_admin/rooms/${room_id}/`,
      submitData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    toast.success("Room Updated Successfully!", {
      autoClose: 2000,
      onClose: () => navigate("/rooms/list"),
    });
  } 
 catch (err) {
  console.error("Room Save Error:", err);

  if (err.response && err.response.data) {
    const errors = err.response.data;

    let firstError = null;

    if (typeof errors === "object") {
      const firstKey = Object.keys(errors)[0]; // first error field

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



  if (loading) return <p>Loading...</p>;

  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="container my-4">
          <div className={`main-content-config ${sidebarOpen ? "" : "expanded"}`}>
            <h3 className="mb-3">Update Room</h3>
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
                  <label className="form-label fw-bold">
                    Room Type<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    className="form-control"
                    name="room_type"
                    value={formData.room_type}
                    onChange={handleChange}
                    required
                  >
                     
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
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="img-thumbnail mt-2"
                      style={{ width: "120px", height: "120px", objectFit: "contain", border: "1px solid #ddd" }}
                    />
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-end mt-3">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => navigate("/rooms/list")}
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

export default RoomUpdate;
