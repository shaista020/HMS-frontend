import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateRoomType = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { room_type_id } = useParams();
  const [logoPreview, setLogoPreview] = useState(null);
  const [formData, setFormData] = useState({   
    room_type_name: "",
    base_price: "",
    amenities: "",
    description: "",
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
    if (!room_type_id) return;
    setLoading(true);

    axios
      .get(`http://127.0.0.1:8000/hms_admin/room_type/${room_type_id}/`)
      .then((res) => {
        const data = res.data;
 
        setFormData({
          room_type_name: data.room_type_name || "",
          base_price: data.base_price || "",
          amenities: data.amenities || "",
          description: data.description || "",
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
  }, [token, room_type_id]);

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
    if (room_type_id) {
      res = await axios.put(
        `http://127.0.0.1:8000/hms_admin/room_type/${room_type_id}/`, 
        submitData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
 
      toast.success("Hotel Setup Updated Successfully!", {
        autoClose: 3000,
        onClose: () => navigate("/room-types/list"),  
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
              <h3> Update Room Type </h3>
            </div>

            <form
              className="card shadow-sm p-4"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="row g-3">

                
                {/* Hotel Name */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    Room Type Name <span style={{ color: "red" }}>*</span>
                  </label>
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
                  <label className="form-label fw-bold">
                   Amenities <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    required
                  />
                </div>
 
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    description <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="description"
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                  
 
                {/* base_price */}
                <div className="col-6">
                  <label className="form-label fw-bold">
                    Base Price <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    name="base_price"
                    value={formData.base_price}
                    onChange={handleChange}
                    required
                  ></input>
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
    onClick={() => navigate("/room-types/list")}
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

export default UpdateRoomType;
