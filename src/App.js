import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import SignUp from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage/LandingPage';
import About from './pages/LandingPage/About';
import Services from './pages/LandingPage/Services';
import Events from './pages/LandingPage/Events';
import Contact from './pages/LandingPage/Contact';

import Dashboard from './pages/Admin/admin_dashboard';
import Book from './pages/Admin/Booking/BookingList';
import AddBooking from "./pages/Admin/Booking/AddBooking";
import BookingUpdate from "./pages/Admin/Booking/UpdateBooking";
import UserList from './pages/Admin/User/ListUser';

// Hotel Config
import AddSetup from './pages/Admin/HotelConfiguration/AddSetup';
import HotelSetup from './pages/Admin/HotelConfiguration/HotelSetup';
import UpdateSetup from './pages/Admin/HotelConfiguration/UpdateSetup';

// Room Type
import AddRoomType from './pages/Admin/RoomType/Add_type';
import ListRoomType from './pages/Admin/RoomType/list_type';
import UpdateRoomType from './pages/Admin/RoomType/Update_type';

// Room
import AddRoom from './pages/Admin/Room/Add_room';
import ListRoom from './pages/Admin/Room/List_room';
import UpdateRoom from './pages/Admin/Room/Update_room';

// Guest
import AddGuest from './pages/Admin/Guest/Add_guest';
import ListGuest from './pages/Admin/Guest/List_guest';
import UpdateGuest from './pages/Admin/Guest/Update_guest';

// Payment
import AddPayment from './pages/Admin/Payment/add_payment';
import ListPayment from './pages/Admin/Payment/list_payment';
import UpdatePayment from './pages/Admin/Payment/update_payment';

import UserDashboard from "./pages/User/UserDashboard";
import RoomType from './pages/User/pages/room/RoomType';
import Room from './pages/User/pages/room/Room';
 
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from "./components/ScrollToTop";
import AdminLayout from './Layouts/AdminLayout';

// -------------------- App --------------------
function App() {
  return (
    <Router>
       
      <Routes>
        {/* Auth */}
        <Route path="/signup" element={<SignUp mode="signup" />} />
        <Route path="/signin" element={<SignUp mode="signin" />} />

        {/* -------------------- Admin Routes -------------------- */}
        <Route path="/admin_dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/booking" element={<AdminLayout><Book /></AdminLayout>} />
        <Route path="/booking/add" element={<AdminLayout><AddBooking /></AdminLayout>} />
        <Route path="/booking/edit/:booking_id" element={<AdminLayout><BookingUpdate /></AdminLayout>} />

        <Route path="/hotel-setup/add" element={<AdminLayout><AddSetup /></AdminLayout>} />
        <Route path="/hotel-setup/list" element={<AdminLayout><HotelSetup /></AdminLayout>} />
        <Route path="/hotel-setup/edit/:hotel_id" element={<AdminLayout><UpdateSetup /></AdminLayout>} />

        <Route path="/room-types/add" element={<AdminLayout><AddRoomType /></AdminLayout>} />
        <Route path="/room-types/list" element={<AdminLayout><ListRoomType /></AdminLayout>} />
        <Route path="/room-types/edit/:room_type_id" element={<AdminLayout><UpdateRoomType /></AdminLayout>} />

        <Route path="/rooms/add" element={<AdminLayout><AddRoom /></AdminLayout>} />
        <Route path="/rooms/list" element={<AdminLayout><ListRoom /></AdminLayout>} />
        <Route path="/rooms/edit/:room_id" element={<AdminLayout><UpdateRoom /></AdminLayout>} />

        <Route path="/guest/add" element={<AdminLayout><AddGuest /></AdminLayout>} />
        <Route path="/guest/list" element={<AdminLayout><ListGuest /></AdminLayout>} />
        <Route path="/guest/edit/:guest_id" element={<AdminLayout><UpdateGuest /></AdminLayout>} />

        <Route path="/payment/add" element={<AdminLayout><AddPayment /></AdminLayout>} />
        <Route path="/payment/list" element={<AdminLayout><ListPayment /></AdminLayout>} />
        <Route path="/payment/edit/:guest_id" element={<AdminLayout><UpdatePayment /></AdminLayout>} />

        <Route path="/user" element={<AdminLayout><UserList /></AdminLayout>} />

        {/* -------------------- User Dashboard / Pages -------------------- */}
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/RoomType" element={<RoomType />} />
        <Route path="/Room" element={<Room />} />

        {/* -------------------- Public Pages -------------------- */}
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
