import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RoomType = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [form, setForm] = useState({
    room_type_name: "",
    description: "",
    base_capacity: "",
    default_price: "",
    min_price: "",
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch room types
  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/room-types/");
      setRoomTypes(res.data);
    } catch (error) {
      toast.error("Failed to fetch room types!", {
        style: { background: "#1E3A8A", color: "#fff" },
      });
    }
  };

 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation
  const validateForm = () => {
   
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!form.room_type_name.trim()) {
      toast.error("Room Type Name is required!", {
        style: { background: "#1E3A8A", color: "#fff" },
      });
      return false;
    }

    if (form.room_type_name.length < 3) {
      toast.error("Room Type Name must be at least 3 letters long!", {
        style: { background: "#1E3A8A", color: "#fff" },
      });
      return false;
    }

    if (!nameRegex.test(form.room_type_name)) {
      toast.error("Room Type Name should only contain letters (no numbers or symbols)!", {
        style: { background: "#1E3A8A", color: "#fff" },
      });
      return false;
    }

    return true;
  };

  // Submit form 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editing) {
        await axios.put(`http://127.0.0.1:8000/room-types/${editId}/`, form);
        toast.success("Room Type updated successfully!", {
          style: { background: "#059669", color: "#fff" },
        });
      } else {
        await axios.post("http://127.0.0.1:8000/room-types/", form);
        toast.success("Room Type created successfully!", {
          style: { background: "#059669", color: "#fff" },
        });
      }

      // Reset state
      setForm({
        room_type_name: "",
        description: "",
        base_capacity: "",
        default_price: "",
        min_price: "",
      });
      setEditing(false);
      setEditId(null);
      setShowModal(false);
      fetchRoomTypes();
    } catch (error) {
      toast.error("Error saving room type!", {
        style: { background: "#1E3A8A", color: "#fff" },
      });
    }
  };

  //  Edit
  const handleEdit = (rt) => {
    setForm({
      room_type_name: rt.room_type_name,
      description: rt.description,
      base_capacity: rt.base_capacity,
      default_price: rt.default_price,
      min_price: rt.min_price,
    });
    setEditing(true);
    setEditId(rt.room_type_id);
    setShowModal(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room type?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/room-types/${id}/`);
      fetchRoomTypes();
      toast.success("Room Type deleted successfully!", {
        style: { background: "#059669", color: "#fff" },
      });
    } catch (error) {
      toast.error("Error deleting room type!", {
        style: { background: "#1E3A8A", color: "#fff" },
      });
    }
  };

  //  Cancel
  const handleCancel = () => {
    setEditing(false);
    setShowModal(false);
    setForm({
      room_type_name: "",
      description: "",
      base_capacity: "",
      default_price: "",
      min_price: "",
    });
  };
  

  return (
    <div className="roomtype-container">
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar={false} />
      

      <div className="table-header">
        <h2 className="page-title">Room Type List</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Add Room Type
        </button>
      </div>

      {/* ======== TABLE ======== */}
      <div className="table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Capacity</th>
              <th>Price</th>
              <th>Min Price</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes.length > 0 ? (
              roomTypes.map((rt, index) => (
                <tr key={rt.room_type_id}>
                  <td>{index + 1}</td>
                  <td>{rt.room_type_name}</td>
                  <td>{rt.description}</td>
                  <td>{rt.base_capacity}</td>
                  <td>{rt.default_price}</td>
                  <td>{rt.min_price}</td>
                  <td>
                    <button onClick={() => handleEdit(rt)} className="btn-warning">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(rt.room_type_id)} className="btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-row">
                  No Room Types Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ======== MODAL FORM ======== */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editing ? "Edit Room Type" : "Add New Room Type"}</h3>
              <button className="close-btn" onClick={handleCancel}>
                ✖
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <label>Room Type Name</label>
              <input
                type="text"
                name="room_type_name"
                value={form.room_type_name}
                onChange={handleChange}
                placeholder="Enter room type name"
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter description"
              />

              <div className="form-row">
                <div>
                  <label>Base Capacity</label>
                  <input
                    type="number"
                    name="base_capacity"
                    value={form.base_capacity}
                    onChange={handleChange}
                    placeholder="Enter capacity"
                    required
                  />
                </div>
                <div>
                  <label>Default Price</label>
                  <input
                    type="number"
                    name="default_price"
                    value={form.default_price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />
                </div>
                <div>
                  <label>Min Price</label>
                  <input
                    type="number"
                    name="min_price"
                    value={form.min_price}
                    onChange={handleChange}
                    placeholder="Enter min price"
                    required
                  />
                </div>
              </div>

              <div className="button-row">
                <button type="submit" className="btn-primary">
                  {editing ? "Update" : "Create"}
                </button>
                <button type="button" onClick={handleCancel} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomType;
