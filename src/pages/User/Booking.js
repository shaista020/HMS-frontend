import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";

const Booking = () => {
     const [rooms, setRooms] = useState([]);
      const [form, setForm] = useState({
        room_number: "",
        room_type_id: "",
        price_per_night: "",
        seasonal_price: "",
        status: "available",
        amenities: "",
      });
      const [editing, setEditing] = useState(false);
      const [editId, setEditId] = useState(null);
      const [showModal, setShowModal] = useState(false);
      const [roomTypes, setRoomTypes] = useState([]);
    const fetchRooms = async () => {
        // try {
        // //   const res = await axios.get("http://127.0.0.1:8000/rooms/");
        //   setRooms(res.data);
        // } catch (err) {
        //   console.error("Error fetching rooms:", err);
        // }
      };
    
      // Fetch Room Types for Dropdown
      const fetchRoomTypes = async () => {
        // try {
        // //   const res = await axios.get("http://127.0.0.1:8000/room-types/");
        //   setRoomTypes(res.data);
        // } catch (err) {
        //   console.error("Error fetching room types:", err);
        // }
      };
    
    
      // Handle form change
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      // Submit form
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (editing) {
            // await axios.put(`http://127.0.0.1:8000/rooms/${editId}/`, form);
            alert("Room updated successfully!");
          } else {
            // await axios.post("http://127.0.0.1:8000/rooms/", form);
            alert("Room added successfully!");
          }
          fetchRooms();
          setShowModal(false);
          resetForm();
        } catch (err) {
          console.error("Error saving room:", err);
        }
      };
    
      // Delete room
      const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
          try {
            // await axios.delete(`http://127.0.0.1:8000/rooms/${id}/`);
            fetchRooms();
          } catch (err) {
            console.error("Error deleting room:", err);
          }
        }
      };
    
      
    const handleEdit = (room) => {
      setForm({
        room_number: room.room_number,
        room_type_id: room.room_type?.id || "", 
        price_per_night: room.price_per_night,
        seasonal_price: room.seasonal_price,
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
          status: "available",
          amenities: "",
        });
        setEditing(false);
        setEditId(null);
      };
      const handleCancel = () => {
        setEditing(false);
        setShowModal(false);
     
      };


    //   booking
    const [booking, setBooking] = useState([])
  const fetachbooking = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/bookings/");
        setBooking(response.data);
        console.log('response:', response)
    } catch (response){
        console.error("Error while fetching booking Details:", response)
    }
    
  };
    useEffect(() => {
        fetchRooms();
        fetachbooking();
      }, []);
    

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
               
              <th>booking_id</th>
              <th>customer</th>
              <th>check_in_date</th>
              <th>check_out_date</th>
              <th>no_of_guests</th>
              <th>booking_status</th>
              <th>payment_status</th>
              <th>Created By</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {booking.length > 0 ? (
              booking.map((book, index) => (
                <tr key={book.booking_id}>
                  <td>{index + 1}</td>
                  <td>{book.customer.name}</td>
                  <td>{book.check_in_date}</td>
                  <td>{book.check_out_date}</td>
                  <td>{book.no_of_guests}</td>
                  <td>{book.booking_status}</td>
                  <td>{book.booking_status}</td>
                  <td>{book.created_by}</td>
                  <td>
                    <button onClick={() => handleEdit(book)} className="btn-warning">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(book.room_type_id)} className="btn-danger">
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

export default Booking;
