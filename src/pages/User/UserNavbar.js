import React from "react";

const UserNavbar = () => {
  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 text-white"
      style={{ backgroundColor: "#4a5546" }}
    >
      <h6 className="mb-0">HMS User Panel</h6>

      <div className="d-flex align-items-center gap-3">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Search..."
          style={{ width: "200px" }}
        />
        <span className="fw-semibold">User</span>
      </div>
    </div>
  );
};

export default UserNavbar;
