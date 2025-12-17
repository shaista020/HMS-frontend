import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const UpdateUser = ({ user, updateUser, show, handleClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "Admin",
    is_active: true,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        role: user.role || "Admin",
        is_active: user.is_active ?? true,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    const nameRegex = /^[A-Za-z ]+$/;
    const phoneRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.first_name || !nameRegex.test(formData.first_name)) { toast.error("Invalid first name"); return false; }
    if (!formData.last_name || !nameRegex.test(formData.last_name)) { toast.error("Invalid last name"); return false; }
    if (!formData.email || !emailRegex.test(formData.email)) { toast.error("Invalid email"); return false; }
    if (!formData.phone_number || !phoneRegex.test(formData.phone_number)) { toast.error("Invalid phone"); return false; }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    updateUser(user.id, formData);
  };

  return (
    <Modal show={show} onHide={handleClose} top size="lg">
      <Modal.Header closeButton style={{ backgroundColor: "#4a5546", color: "#fff" }}>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="updateUserForm" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label>First Name</label>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="form-control"/>
            </div>
            <div className="col-md-6">
              <label>Last Name</label>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="form-control"/>
            </div>
            <div className="col-md-6">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control"/>
            </div>
            <div className="col-md-6">
              <label>Phone</label>
              <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className="form-control"/>
            </div>
            <div className="col-md-6">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="form-control">
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <div className="col-md-6 mt-2">
              <div className="form-check">
                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} className="form-check-input" id="activeCheck"/>
                <label className="form-check-label" htmlFor="activeCheck">Active</label>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <button className="btn text-white"style={{ backgroundColor: "#4a5546" }} onClick={handleSubmit}>Update User</button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateUser;
