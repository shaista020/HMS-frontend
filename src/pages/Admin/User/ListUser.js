import React, { useEffect, useState } from "react";
import API from "../../../api";
import AddUser from "./add_user";
import UpdateUser from "./UpdateUser";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
   
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setSidebarOpen(false);
        setIsMobile(true);
      } else {
        setSidebarOpen(true);
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUsers = () => {
    API.get("hms_admin/user/")
      .then((response) => {
        console.log("Fetched users:", response.data);
        setUsers(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong while fetching users.");
        toast.error("Failed to fetch users!");
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusClick = (user) => {
    setSelectedUser(user);
    setShowStatusModal(true);
  };

  const handleCloseModal = () => {
    setShowStatusModal(false);
    setSelectedUser(null);
  };

  const addUser = (userData) => {
    const finalData = {
      ...userData,
      username: userData.email,
      role: userData.role || "Customer",
    };

    API.post("hms_admin/user/", finalData)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("User added successfully!");
          fetchUsers();  
        } else {
          toast.error("Failed to add user!");
        }
      })
      .catch((err) => {
        console.error("Error adding user:", err);
        toast.error("Error adding user!");
      });
  };

  const handleStatusUpdate = () => {
  if (!selectedUser) return;

  const newStatus = !selectedUser.is_active;  

  API.patch(`hms_admin/user/${selectedUser.id}/`, { is_active: newStatus })
    .then(() => {
      toast.success("User status updated!");
      fetchUsers(); 
      setShowStatusModal(false);
    })
    .catch((err) => {
      console.error("Error updating user status:", err);
      toast.error("Failed to update status!");
    });
};
 
 const updateUser = (userId, updatedData) => {
    API.patch(`hms_admin/user/${userId}/`, updatedData)
      .then(() => {
        toast.success("User updated successfully!");
        fetchUsers();
        setShowUpdateModal(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update user!");
      });
  };



  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <div className="container my-4">
          <div className={`main-cocntent-config ${sidebarOpen ? "" : "expanded"}`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-bold">Users List</h3>

              <button
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#addUserModal"
                style={{
                  color: "#4a5546",
                  borderColor: "#4a5546",
                  fontWeight: "bold",
                }}
              >
                + Add User
              </button>
            </div>

            {/* TABLE */}
            <div className="table-wrapper">
              <table className="table table-hover table-bordered shadow-sm">
                <thead style={{ backgroundColor: "#4a5546", color: "white" }}>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.first_name} {user.last_name}
                        </td>
                        <td>{user.phone_number}</td>
                        <td>{user.role}</td>
                        <td>
                          <span
                            className={`badge ${user.is_active ? "bg-success" : "bg-danger"
                              }`}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleStatusClick(user)}
                          >
                            {user.is_active ? "ACTIVE" : "INACTIVE"}
                          </span>
                        </td>
                       <td>
  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => { setSelectedUser(user); setShowUpdateModal(true); }}
                  >
                    Edit
                  </Button>
</td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

           
            {showStatusModal && selectedUser && (
  <div
    className="modal fade show"
    id="statusModal"
    tabIndex="-1"
    aria-hidden="true"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    data-bs-backdrop="false"
  >
    <div className="modal-dialog modal-dialog-top">
      <div className="modal-content">
        
        <div className="modal-header   text-white"  style={{ backgroundColor: "#4a5546", fontWeight: "bold" }}>
          <h5 className="modal-title">Change User Status</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={handleCloseModal}
            aria-label="Close"
          />
        </div>
 
        <div className="modal-body">
          <p>
            Are you sure you want to{" "}
            <strong style={{ color: selectedUser.is_active ? "#e74c3c" : "#27ae60" }}>
              {selectedUser.is_active ? "deactivate" : "activate"}
            </strong>{" "}
            the user <strong>{selectedUser.username || selectedUser.email}</strong>?
          </p>
        </div>
 
        <div className="modal-footer border-0">
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Cancel
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: selectedUser.is_active ? "#e74c3c" : "#27ae60",
              color: "#fff",
            }}
            onClick={handleStatusUpdate}
          >
            {selectedUser.is_active ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}
 
            <AddUser addUser={addUser} />
   {selectedUser && (
        <UpdateUser
          user={selectedUser}
          updateUser={updateUser}
          show={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
        />
      )}
      

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
