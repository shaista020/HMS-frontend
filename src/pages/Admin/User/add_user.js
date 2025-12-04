import React, { useState } from "react";

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

 const handleSubmit = (e) => {
  e.preventDefault();
  addUser(formData);

  setFormData({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    role: "Admin",
    is_active: true,
  });

  // Close modal safely
  // const modalElement = document.getElementById("addUserModal");
  // const modal = window.bootstrap.Modal.getInstance(modalElement);
  // if (modal) modal.hide();
};


  return (
    <div className="modal fade" id="addUserModal" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <div
            className="modal-header text-white"
            style={{ backgroundColor: "#4a5536" }}
          >
            <h5 className="modal-title">Add New User</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
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
                  <label className="form-label fw-bold">password</label>
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
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label className="form-check-label">Active</label>
                  </div>
                  <button type="submit" className="btn btn-success">
                    Add User
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer">
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
