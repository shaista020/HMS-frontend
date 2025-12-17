import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";

// Static choice lists
const GENDER_CHOICES = ["Male", "Female", "Other"];
const DOCUMENT_TYPE_CHOICES = ["CNIC", "Passport", "Driving License", "Other"];
const GUEST_TYPE_CHOICES = ["New", "Returning", "VIP", "Corporate"];

const GuestForm = ({ existingGuests = [] }) => {
  const navigate = useNavigate();

  // States
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showCorporateFields, setShowCorporateFields] = useState(false);
  const [showVIPFields, setShowVIPFields] = useState(false);
  const [readonlyGuestType, setReadonlyGuestType] = useState(false);
  const [showReturningSearch, setShowReturningSearch] = useState(false);
  const [returningSearch, setReturningSearch] = useState("");
  const [filteredGuest, setFilteredGuest] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    date_of_birth: "",
    phone_number: "",
    email: "",
    address: "",
    nationality: "",
    document_type: "",
    document_number: "",
    document_image: null,
    guest_type: "New",
    company_name: "",
    loyalty_points: "",
    special_requests: "",
    status: true,
    remarks: "",
  });

  // Sidebar responsive handling
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

  // ---------------------------------------------
  // Guest Type Selection
  // ---------------------------------------------
  // State for search results dropdown
  const handleGuestTypeSelection = (value) => {
    setFormData((prev) => ({
      ...prev,
      guest_type: value,
    }));

    setShowCorporateFields(value === "Corporate");
    setShowVIPFields(value === "VIP");

    setShowReturningSearch(value === "Returning");
    if (value !== "Returning") {
      setFilteredGuest(null);
      setReturningSearch("");
      setSearchResults([]);
      setShowDropdown(false);
    }
  };
  const handleReturningSearch = (value) => {
    setReturningSearch(value);
    console.log("Search Input:", value);

    if (value.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    fetchReturningGuest(value);
  };

  // ---------------------------------------------
  // Fetch Returning Guests from API
  // ---------------------------------------------
  const fetchReturningGuest = async (value) => {
    try {
      const response = await API.get(`hms_admin/guests/search/?q=${value}`);
      const guests = response.data; // array of guest objects

      if (guests.length > 0) {
        setSearchResults(guests);
        setShowDropdown(true); // show dropdown if results found
      } else {
        setSearchResults([]);
        setShowDropdown(false);
        toast.error("No guest found!"); // show toast when no match
      }
    } catch (error) {
      setSearchResults([]);
      setShowDropdown(false);
      toast.error("Error searching guests!");
    }
  };


  // ---------------------------------------------
  // Handle Guest Select from Dropdown
  // ---------------------------------------------
  const handleGuestSelect = (guest) => {
    console.log("Selected Guest:", guest);

    setFilteredGuest(guest);
    setFormData((prev) => ({
      ...prev,
      full_name: guest.full_name,
      gender: guest.gender,
      date_of_birth: guest.date_of_birth,
      phone_number: guest.phone_number,
      email: guest.email,
      address: guest.address,
      nationality: guest.nationality,
      document_type: guest.document_type,
      document_number: guest.document_number,
      guest_type: "Returning",
      special_requests: guest.special_requests,
      remarks: guest.remarks,
      document_image: null,
      existing_document_image_url: guest.document_image,  // use guest image if exists
    }));


    setReturningSearch(guest.email || guest.phone_number);
    setShowDropdown(false);

    toast.success("Returning guest selected!");
  };
  // ---------------------------------------------
  // Detect Guest Type by Document Number
  // ---------------------------------------------
  const detectGuestType = (docNumber) => {
    if (!docNumber) return "New";

    const existingGuest = existingGuests.find(
      (guest) => guest.document_number === docNumber
    );

    if (existingGuest) {
      setReadonlyGuestType(true);

      const type = existingGuest.guest_type;
      setShowCorporateFields(type === "Corporate");
      setShowVIPFields(type === "VIP");

      return type;
    } else {
      setReadonlyGuestType(false);
      setShowCorporateFields(false);
      setShowVIPFields(false);
      return "New";
    }
  };

  // ---------------------------------------------
  // Handle Input Changes
  // ---------------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    let val = type === "file" ? files[0] : type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Auto detect guest type from document number
    if (name === "document_number") {
      const type = detectGuestType(value);
      setFormData((prev) => ({ ...prev, guest_type: type }));
    }

    // Handle VIP / Corporate additional fields
    if (name === "guest_type") {
      setShowCorporateFields(value === "Corporate");
      setShowVIPFields(value === "VIP");
    }
  };

  // ---------------------------------------------
  // Submit Form
  // ---------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();

    for (let key in formData) {
      if (key === "document_image") {
        if (formData.document_image && typeof formData.document_image !== "string") {
          // Only append if it's a File object
          submitData.append(key, formData.document_image);
        }
      } else {
        submitData.append(key, formData[key]);
      }
    }


    // 🔹 Log all FormData key-value pairs
    console.log("Submitting FormData:");
    for (let pair of submitData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      await API.post("hms_admin/guest/", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Guest added successfully!", {
        autoClose: 3000,
        onClose: () => navigate("/guest/list"),
      });

      // Reset form
      setFormData({
        full_name: "",
        gender: "",
        date_of_birth: "",
        phone_number: "",
        email: "",
        address: "",
        nationality: "",
        document_type: "",
        document_number: "",
        document_image: null,
        guest_type: "New",
        company_name: "",
        loyalty_points: "",
        special_requests: "",
        status: true,
        remarks: "",
      });

      setShowCorporateFields(false);
      setShowVIPFields(false);
      setReadonlyGuestType(false);
    } catch (err) {
      console.error(err);
      toast.error("Error saving guest data!");
    }
  };


  return (
    <div className="d-flex">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex-grow-1">
        <div className="container my-4">
          <div className={`main-content ${sidebarOpen ? "" : "expanded"}`}>
            <h3 className="mb-4">Add Guest</h3>
            <form
              className="card shadow-sm p-4"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="row g-3">
                {showReturningSearch && (
                  <div className="col-md-12 position-relative">
                    <label className="form-label fw-bold">
                      Search Returning Guest (Full Name/Phone / Email)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter phone or email"
                      value={returningSearch}
                      onChange={(e) => handleReturningSearch(e.target.value)}
                      onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                    />

                    {/* Dropdown list */}
                    {showDropdown && searchResults.length > 0 && (
                      <ul
                        className="list-group position-absolute w-100"
                        style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}
                      >
                        {searchResults.map((guest) => (
                          <li
                            key={guest.guest_id} // use guest_id
                            className="list-group-item list-group-item-action"
                            onClick={() => handleGuestSelect(guest)}
                            style={{ cursor: "pointer" }}
                          >
                            {guest.full_name} - {guest.email} - {guest.phone_number}
                          </li>
                        ))}
                      </ul>
                    )}


                  </div>
                )}

                <div className="col-md-6">
                  <label className="form-label fw-bold">Guest Type</label>
                  <select
                    className="form-select"
                    name="guest_type"
                    value={formData.guest_type}
                    onChange={(e) => handleGuestTypeSelection(e.target.value)}
                  >

                    {GUEST_TYPE_CHOICES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">
                    Full Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Gender */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    {GENDER_CHOICES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date of Birth */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Address */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                {/* Nationality */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Nationality</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                  />
                </div>

                {/* Document Type */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Document Type</label>
                  <select
                    className="form-select"
                    name="document_type"
                    value={formData.document_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Document Type</option>
                    {DOCUMENT_TYPE_CHOICES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Document Number */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Document Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="document_number"
                    value={formData.document_number}
                    onChange={handleChange}
                  />
                </div>

                {/* Document Image */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Document Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="document_image"
                    onChange={handleChange}
                  />

                  {formData.document_image && (
                    <div className="mt-2">
                      <img
                        src={
                          typeof formData.document_image === "string"
                            ? `http://127.0.0.1:8000${formData.document_image}` // backend URL
                            : URL.createObjectURL(formData.document_image)      // new file
                        }
                        alt="Document Preview"
                        style={{ maxWidth: "150px", maxHeight: "150px", border: "1px solid #ccc" }}
                      />
                    </div>
                  )}



                </div>

                {/* Guest Type */}


                {/* Corporate Fields */}
                {showCorporateFields && (
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Company Name *</label>
                    <input
                      type="text"
                      name="company_name"
                      className="form-control"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}

                {/* VIP Fields */}
                {showVIPFields && (
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Loyalty Points</label>
                    <input
                      type="number"
                      name="loyalty_points"
                      className="form-control"
                      value={formData.loyalty_points}
                      onChange={handleChange}
                    />
                  </div>
                )}

                {/* Special Requests */}
                <div className="col-12">
                  <label className="form-label fw-bold">Special Requests</label>
                  <textarea
                    className="form-control"
                    name="special_requests"
                    value={formData.special_requests}
                    onChange={handleChange}
                  />
                </div>

                {/* Remarks */}
                <div className="col-12">
                  <label className="form-label fw-bold">Remarks</label>
                  <textarea
                    className="form-control"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn mt-3 text-white"
                style={{ backgroundColor: "#4a5546" }}
              >
                Save Guest
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestForm;
