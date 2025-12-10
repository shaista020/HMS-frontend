import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const RoomList = () => {
  const [rooms, setrooms] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedRoom, setselectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
 const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);


  const token =
    localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
 
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      navigate("/signin");  
    }
  }, [token, navigate]);
 useEffect(() => {
  if (selectedRoom && selectedRoom.room_type) {
    axios
      .get(`http://127.0.0.1:8000/hms_admin/room_type/${selectedRoom.room_type}/`)
      .then((res) => setSelectedRoomInfo(res.data))
      .catch((err) => console.log("Room type fetch error", err));
  }
}, [selectedRoom]);

  const fetchrooms = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/hms_admin/rooms/");
      console.log("API response:", response.data);
      setrooms(response.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
       
        navigate("/signin");  
      } else {
        setError("Something went wrong while fetching room Setup.");
      }
    }
  };
 useEffect(() => {
    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/user/me/")
      .then((res) => {
        console.log("User:", res.data);
      })
      .catch((err) => {
        console.log("Axios Error:", err.response?.data || err.message);
      });
  }, [token]);
 
  useEffect(() => {
    fetchrooms();
  }, []);

  
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
          <div className={`main-content-config ${sidebarOpen ? "" : "expanded"}`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-bold">Rooms List</h3>

              <button
                className="btn"
                onClick={() => navigate("/rooms/add")}
                style={{ color: "#4a5546", borderColor: "#4a5546", fontWeight: "bold" }}
              >
                + Add New Room
              </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
 
            <div className="table-wrapper">
              <table className="table table-hover table-bordered shadow-sm">
                <thead style={{ backgroundColor: "#4a5546", color: "white" }}>
                  <tr>
                    <th>Room Number</th>
                    <th>Image</th>
                    <th>Floor Number</th>
                    <th>Room Type</th>
                    <th>Capacity</th>              
                    <th>Price</th>
                     <th>Allocated By</th>
                    <th>Status</th>                 
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {rooms.length > 0 ? (
                    rooms.map((room) => (
                      <tr key={room.room_id}>
                        <td><b>{room.room_number}</b></td>
                        <td>
                          {room.image ? (
                            <img
                              src={room.image}
                              alt="image"
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                          ) : (
                            "No image"
                          )}
                        </td>
                        <td>{room.floor_number}</td>
                        <td>{room.room_type}</td>
                        <td>{room.capacity}</td>
                        <td>{room.price}</td>
                        <td>{room.allocated_by}</td>
                        <td>{room.is_active ? "Active" : "In Active"}</td>
                        <td>
                          
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => navigate(`/rooms/edit/${room.room_id}`)}
                            title="Edit room"
                          >
                            <i className="fas fa-edit"></i>  
                          </button>
 
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => {
                              setselectedRoom(room);
                              setShowModal(true);
                            }}
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>  
                          </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        {error ? error : "No room setup found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {showModal && selectedRoom && (
                <div
                  className="modal fade show"
                  style={{
                    display: "block",
                    background: "rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content shadow-lg border-0 rounded-3">
 
                      <div
                        className="modal-header d-flex justify-content-between align-items-center"
                        style={{ backgroundColor: "#4a5546", color: "white" }}
                      >
                        {selectedRoom.image && (
                          <img
                            src={selectedRoom.image}
                            alt="image"
                            style={{
                              width: "65px",
                              height: "65px",
                              objectFit: "cover",
                              borderRadius: "50%",
                              border: "2px solid white",

                            }}
                          />
                        )}
                        <h4 className="fw-bold m-0 text-center" style={{ flexGrow: 1}}>
                          Room Details — {selectedRoom.room_number}
                        </h4>



                        <button
                          type="button"
                          className="btn-close btn-close-white"
                          onClick={() => setShowModal(false)}
                        ></button>
                      </div>

                      {/* BODY */}
                      <div className="modal-body">

                        <table className="table table-striped table-hover">
                          <tbody>

                            <tr>
                              <th>Room Number</th>
                              <td>{selectedRoom.room_id}</td>
                            </tr>

                            <tr>
                              <th>Room Type</th>
                              <td>{selectedRoom.room_type_name}</td>
                            </tr>
{selectedRoomInfo && (
  <>
    <tr>
      <th>Base Price</th>
      <td>{selectedRoomInfo.base_price}</td>
    </tr>

    <tr>
      <th>Amenities</th>
      <td>{selectedRoomInfo.amenities}</td>
    </tr>
  </>
)}

                            <tr>
                              <th>Capacity</th>
                              <td>{selectedRoom.capacity}</td>
                            </tr>

                             

                            <tr>
                              <th>Price</th>
                              <td>{selectedRoom.price}</td>
                            </tr>

                            


                            <tr>
                              <th>Status</th>
                              <td>{selectedRoom.is_active ? "Active" : "In Active"}</td>
                            </tr>

                            

                        

                           
                            <tr>
                              <th>Allocated By</th>
                              <td>{selectedRoom.allocated_by}</td>
                            </tr>

                            <tr>
                              <th>Allocated At</th>
                              <td>{selectedRoom.allocated_at}</td>
                            </tr>

                            <tr>
                              <th>Updated By</th>
                              <td>{selectedRoom.updated_by}</td>
                            </tr>
                            
                             <tr>
                              <th>Updated At</th>
                              <td>{selectedRoom.updated_at}</td>
                            </tr>
                             

                          </tbody>
                        </table>

                      </div>

                      {/* FOOTER */}
                      <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                          Close
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
