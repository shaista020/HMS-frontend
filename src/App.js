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
import UserList from './pages/Admin/User/ListIUser';

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

import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from "./components/ScrollToTop";
function Layout({ children }) {
  const location = useLocation();
  const adminPaths = ['/admin_dashboard', '/booking', '/user', '/hotel-setup', '/room-types', '/rooms', '/guest','/payment'];
  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path));

  return (
    <div>
      {isAdminRoute && <NavBar />}
      <div className="d-flex">
        {isAdminRoute && <Sidebar />}
        <div className="flex-grow-1 p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
       <ScrollToTop /> 
      {/* ✅ Top-level ToastContainer */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Auth */}
        <Route path="/signup" element={<SignUp mode="signup" />} />
        <Route path="/signin" element={<SignUp mode="signin" />} />

        {/* Admin Dashboard */}
        <Route path="/admin_dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/booking" element={<Layout><Book /></Layout>} />
        <Route path="/booking/add" element={<Layout><AddBooking /></Layout>} />
        <Route path="/booking/edit/:booking_id" element={<Layout><BookingUpdate /></Layout>} />

        {/* Hotel Setup */}
        <Route path="/hotel-setup/add" element={<Layout><AddSetup /></Layout>} />
        <Route path="/hotel-setup/list" element={<Layout><HotelSetup /></Layout>} />
        <Route path="/hotel-setup/edit/:hotel_id" element={<Layout><UpdateSetup /></Layout>} />

        {/* Room Type */}
        <Route path="/room-types/add" element={<Layout><AddRoomType /></Layout>} />
        <Route path="/room-types/list" element={<Layout><ListRoomType /></Layout>} />
        <Route path="/room-types/edit/:room_type_id" element={<Layout><UpdateRoomType /></Layout>} />

        {/* Room */}
        <Route path="/rooms/add" element={<Layout><AddRoom /></Layout>} />
        <Route path="/rooms/list" element={<Layout><ListRoom /></Layout>} />
        <Route path="/rooms/edit/:room_id" element={<Layout><UpdateRoom /></Layout>} />

        {/* Guest */}
        <Route path="/guest/add" element={<Layout><AddGuest /></Layout>} />
        <Route path="/guest/list" element={<Layout><ListGuest /></Layout>} />
        <Route path="/guest/edit/:guest_id" element={<Layout><UpdateGuest /></Layout>} />
        {/* Payment */}
        <Route path="/payment/add" element={<Layout><AddPayment /></Layout>} />
        <Route path="/payment/list" element={<Layout><ListPayment /></Layout>} />
        <Route path="/payment/edit/:guest_id" element={<Layout><UpdatePayment /></Layout>} />

        {/* Users */}
        <Route path="/user" element={<Layout><UserList /></Layout>} />

        {/* User Dashboard */}
        <Route path="/UserDashboard" element={<Layout><UserDashboard /></Layout>} />

        {/* User Pages */}
        <Route path="/RoomType" element={<Layout><RoomType /></Layout>} />
        <Route path="/Room" element={<Layout><Room /></Layout>} />

        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />
        <Route path='/About' element={< About />} />
        <Route path='/Services' element={< Services />} />
        <Route path='/Events' element={< Events />} />
        <Route path='/Contact' element={< Contact />} />

      </Routes>
    </Router>
  );
}

export default App;
