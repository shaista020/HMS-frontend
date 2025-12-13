import React, { useEffect, useState } from "react";
import API from "../../../api";
import AddUser from "./add_user";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API
      .get("hms_admin/user/")
      .then((response) => {
        console.log("API response: " ,response.data)
        setUsers(response.data)
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong while fetching users.");
      });
  }, []);
const addUser = (userData) => {
  const finalData = {
    ...userData,
    username: userData.email,   
    role: userData.role || "Customer",  
  };

  console.log("Final Data Sent to Backend:", finalData);

  API
    .post("http://localhost:8000/hms_admin/user/", finalData)
    .then((res) => {
      if (res.data.status === "success") {
        setUsers([...users, res.data.user]);
      }
    })
    .catch((err) => console.error(err));
};


  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <div className="container my-4">
          <div className={`main-content ${sidebarOpen ? "" : "expanded"}`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-bold">Users List</h3>

              {/* ✅ Add User Button with Modal Trigger */}
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
                    users.map((user,index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.first_name} {user.last_name}
                        </td>
                        <td>{user.phone_number}</td>
                        <td>{user.role}</td>
                        <td>{user.is_active ? "Yes" : "No"}</td>
                        
                        <td>
                          <button className="btn btn-warning btn-sm">Edit</button>
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

            {/* ✅ Add User Modal Included */}
            <AddUser addUser={addUser} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
