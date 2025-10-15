import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";

const RoomType = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [form, setForm] = useState({
    room_type_name: "",
    description: "",
    base_capacity: "",
    default_price: "",
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch all room types
  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/room-types/");
      setRoomTypes(res.data);
    } catch (error) {
      console.error("Error fetching room types:", error);
    }
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://127.0.0.1:8000/room-types/${editId}/`, form);
      } else {
        await axios.post("http://127.0.0.1:8000/room-types/", form);
      }

      // Reset form + modal
      setForm({
        room_type_name: "",
        description: "",
        base_capacity: "",
        default_price: "",
      });
      setEditing(false);
      setEditId(null);
      setShowModal(false);
      fetchRoomTypes();
    } catch (error) {
      console.error("Error saving room type:", error);
    }
  };

  // ✅ Edit room type
  const handleEdit = (rt) => {
    setForm({
      room_type_name: rt.room_type_name,
      description: rt.description,
      base_capacity: rt.base_capacity,
      default_price: rt.default_price,
    });
    setEditing(true);
    setEditId(rt.room_type_id);
    setShowModal(true);
  };

  // ✅ Delete room type
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room type?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/room-types/${id}/`);
      fetchRoomTypes();
    } catch (error) {
      console.error("Error deleting room type:", error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setShowModal(false);
    setForm({
      room_type_name: "",
      description: "",
      base_capacity: "",
      default_price: "",
    });
  };

  return (
    <div className="roomtype-container">
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
                <td colSpan="6" className="empty-row">
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
                    step="0.01"
                    name="default_price"
                    value={form.default_price}
                    onChange={handleChange}
                    placeholder="Enter price"
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
