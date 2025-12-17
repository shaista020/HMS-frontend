import React, { useState } from "react";
import { toast } from "react-toastify"; // ✅ only toast, no configure
import 'react-toastify/dist/ReactToastify.css';

 
const AddUser = ({ addUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    role: "Admin",
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const nameRegex = /^[A-Za-z ]+$/;
    const phoneRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.first_name || !nameRegex.test(formData.first_name)) {
      toast.error("First name must contain only letters and spaces.");
      return false;
    }

    if (!formData.last_name || !nameRegex.test(formData.last_name)) {
      toast.error("Last name must contain only letters and spaces.");
      return false;
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

   

    if (!formData.phone_number || !phoneRegex.test(formData.phone_number)) {
      toast.error("Phone number must contain only digits.");
      return false;
    }

    if (!formData.role) {
      toast.error("Please select a role.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addUser(formData);
    toast.success("User added successfully!");

    setFormData({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      role: "Admin",
      is_active: true,
    });

    // Close modal after submit
    const modalEl = document.getElementById("addUserModal");
    const modal = window.bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };

  return (
    <div className="modal fade" id="addUserModal" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        
        <div className="modal-content">
         
          <div
            className="modal-header text-white"
            style={{ backgroundColor: "#4a5546" }}
          >
            <h5 className="modal-title">Add New User</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>
 
          <div className="modal-body">
            <form id="addUserForm" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Phone Number</label>
                  <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Select Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-control mb-2"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
                  </select>

                  
                </div>
              </div>
            </form>
          </div>
 
          <div className="modal-footer">
            <button
              type="submit"
              className="btn text-white"
              style={{ backgroundColor: "#4a5546", fontWeight: "bold" }}
              form="addUserForm"
            >
              Add User
            </button>
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Close 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
