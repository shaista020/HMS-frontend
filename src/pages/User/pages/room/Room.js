/* import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    room_number: "",
    room_type_id: "",
    price_per_night: "",
    seasonal_price: "",
    min_price: "",
    status: "",
    amenities: "",
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);

  // Fetch Rooms
  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/rooms/");
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  // Fetch Room Types for Dropdown
  const fetchRoomTypes = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/room-types/");
      setRoomTypes(res.data);
    } catch (err) {
      console.error("Error fetching room types:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchRoomTypes();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;

  
    if (name === "room_type_id") {
      const selected = roomTypes.find(
        (rt) => String(rt.room_type_id) === String(value)
      );
      const minPrice = selected ? selected.min_price : "";
      setForm((prev) => ({
        ...prev,
        room_type_id: value,
        min_price: minPrice,
      }));
      return;
    }

    setForm({ ...form, [name]: value });
  };

  // Validation before submit
  const validateForm = () => {
    const { room_number, room_type_id, price_per_night, seasonal_price, min_price, status } =
      form;

    if (!room_number.trim()) {
      toast.error("Room number is required!");
      return false;
    }

    if (!room_type_id) {
      toast.error("Please select a room type!");
      return false;
    }

    if (!status) {
      toast.error("Please select a status!");
      return false;
    }

    if (!price_per_night || price_per_night <= 0) {
      toast.error("Price per night must be greater than 0!");
      return false;
    }

    if (!seasonal_price || seasonal_price <= 0) {
      toast.error("Seasonal price must be greater than 0!");
      return false;
    }

    // Check minimum price validation
    if (parseFloat(price_per_night) < parseFloat(min_price)) {
      toast.error(
        `Price per night (${price_per_night}) cannot be lower than minimum price (${min_price}).`
      );
      return false;
    }

    if (parseFloat(seasonal_price) < parseFloat(min_price)) {
      toast.error(
        `Seasonal price (${seasonal_price}) cannot be lower than minimum price (${min_price}).`
      );
      return false;
    }

    return true;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; 

    try {
      const payload = { ...form };
      delete payload.min_price;

      if (editing) {
        await axios.put(`http://127.0.0.1:8000/rooms/${editId}/`, form);
        toast.success("Room updated successfully!", {
          style: { background: "#059669", color: "#fff" },
        });
      } else {
        await axios.post("http://127.0.0.1:8000/rooms/", form);
        toast.success("Room added successfully!", {
          style: { background: "#059669", color: "#fff" },
        });
      }

      fetchRooms();
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error("Error saving room:", err);
      toast.error("Error same room number. Please try again!", {
        style: { background: "#1E3A8A", color: "#fff" },
      });
    }
  };

  // Delete room
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/rooms/${id}/`);
        fetchRooms();
        toast.success("Room deleted successfully!",{
        style: { background: "#059669", color: "#fff" },
      });
      } catch (err) {
        console.error("Error deleting room:", err);
        toast.error("Failed to delete room!", {
        style: { background: "#1E3A8A", color: "#fff" },
      });
      }
    }
  };

  const handleEdit = (room) => {
    setForm({
      room_number: room.room_number,
      room_type_id: room.room_type?.room_type_id || "",
      price_per_night: room.price_per_night,
      seasonal_price: room.seasonal_price,
      min_price: room.room_type?.min_price || "",
      status: room.status,
      amenities: room.amenities,
    });
    setEditing(true);
    setEditId(room.room_id);
    setShowModal(true);
  };

  const resetForm = () => {
    setForm({
      room_number: "",
      room_type_id: "",
      price_per_night: "",
      seasonal_price: "",
      min_price: "",
      status: "",
      amenities: "",
    });
    setEditing(false);
    setEditId(null);
  };

  const handleCancel = () => {
    setEditing(false);
    setShowModal(false);
  };

  return (
    <div className="room-container">
       <ToastContainer position="top-center" autoClose={2500} hideProgressBar={false} />
          
      <div className="header">
        <h2>Room List</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          Add Room
        </button>
      </div>

      {/* Table }*/
      /* <div className="table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Room Type</th>
              <th>Price/Night</th>
              <th>Seasonal Price</th>
              <th>Status</th>
              <th>Amenities</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <tr key={room.room_id}>
                  <td>{`R${String(room.room_id).padStart(3, "0")}`}</td>
                  <td>{room.room_type?.room_type_name || "N/A"}</td>
                  <td>{room.price_per_night}</td>
                  <td>{room.seasonal_price}</td>
                  <td>{room.status}</td>
                  <td>{room.amenities}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(room)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(room.room_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No rooms found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal }*/
      /* {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editing ? "Edit Room" : "Add New Room"}</h3>
              <button className="close-btn" onClick={handleCancel}>
                ✖
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div>
                  <label>Room Number</label>
                  <input
                    type="text"
                    name="room_number"
                    value={form.room_number}
                    onChange={handleChange}
                    placeholder="Enter room number"
                    required
                  />
                </div>

                <div>
                  <label>Room Type</label>
                  <select
                    name="room_type_id"
                    value={form.room_type_id}
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
              </div>

              <div className="form-row">
                <div>
                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="reserved">Reserved</option>
                  </select>
                </div>

                <div>
                  <label>Price per Night</label>
                  <input
                    type="number"
                    name="price_per_night"
                    value={form.price_per_night}
                    onChange={handleChange}
                    placeholder="Enter price per night"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label>Seasonal Price</label>
                  <input
                    type="number"
                    name="seasonal_price"
                    value={form.seasonal_price}
                    onChange={handleChange}
                    placeholder="Enter seasonal price"
                    required
                  />
                </div>

                <div>
                  <label>Minimum Price</label>
                  <input
                    name="min_price"
                    value={form.min_price || ""}
                    readOnly
                  />
                </div>

                <div>
                  <label>Amenities</label>
                  <textarea
                    name="amenities"
                    value={form.amenities}
                    onChange={handleChange}
                    placeholder="Enter room amenities"
                  />
                </div>
              </div>

              <div className="button-row">
                <button type="submit" className="btn-primary">
                  {editing ? "Update Room" : "Add Room"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                >
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

export default Room;
*/