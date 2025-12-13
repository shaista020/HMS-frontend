import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import SignUp from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage/LandingPage';
import About from './pages/LandingPage/About';

import Dashboard from './pages/Admin/admin_dashboard';
import Book from './pages/Admin/Booking/BookingList';
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
import AddRoom  from './pages/Admin/Room/Add_room';
import ListRoom  from './pages/Admin/Room/List_room';
import UpdateRoom  from './pages/Admin/Room/Update_room';
// Guest
import AddGuest  from './pages/Admin/Guest/Add_guest';
import ListGuest  from './pages/Admin/Guest/List_guest';
import UpdateGuest  from './pages/Admin/Guest/Update_guest';

import UserDashboard from './pages/Dashboard/user_dashboard';
import RoomType from './pages/User/RoomType';
import Room from './pages/User/Room';

import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';  
import 'bootstrap/dist/css/bootstrap.min.css';


function Layout({ children }) {
  const location = useLocation();
  const adminPaths = ['/admin_dashboard','/booking','/user','/hotel-setup','/room-types','/rooms','/guest'];
  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path));

  return (
    <div
      
    >
      {/* Top Navbar */}
      {isAdminRoute && <NavBar />}

      <div
        className="d-flex"
         
      >
        {isAdminRoute && (
          <Sidebar
            
          />
        )}

        {/* Page Content */}
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
      <Routes>

        {/* Auth */}
        <Route path="/signup" element={<SignUp mode="signup" />} />
        <Route path="/signin" element={<SignUp mode="signin" />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin_dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route path="/booking"  element={ <Layout> <Book /> </Layout> } /> 
        <Route path="/hotel-setup/add"  element={ <Layout> <AddSetup /> </Layout> } /> 
        <Route path="/hotel-setup/list"  element={ <Layout> <HotelSetup /> </Layout> } /> 
        <Route path="/hotel-setup/edit/:hotel_id"  element={ <Layout> <UpdateSetup /> </Layout> } /> 
        <Route path="/room-types/add"  element={ <Layout> <AddRoomType /> </Layout> } /> 
        <Route path="/room-types/list"  element={ <Layout> <ListRoomType /> </Layout> } /> 
        <Route path="/room-types/edit/:room_type_id"  element={ <Layout> <UpdateRoomType /> </Layout> } />
        <Route path="/rooms/add"  element={ <Layout> <AddRoom  /> </Layout> } /> 
        <Route path="/rooms/list"  element={ <Layout> <ListRoom  /> </Layout> } /> 
        <Route path="/rooms/edit/:room_id"  element={ <Layout> <UpdateRoom  /> </Layout> } />
        <Route path="/guest/add"  element={ <Layout> <AddGuest  /> </Layout> } /> 
        <Route path="/guest/list"  element={ <Layout> <ListGuest  /> </Layout> } /> 
        <Route path="/guest/edit/:guest_id"  element={ <Layout> <UpdateGuest  /> </Layout> } />
       
        <Route
          path="/user"
          element={
            <Layout>
              <UserList />
            </Layout>
          }
        />
        

        {/* User Dashboard */}
        <Route
          path="/user_dashboard"
          element={
            <Layout>
              <UserDashboard />
            </Layout>
          }
        />

        {/* User Pages */}
        <Route
          path="/RoomType"
          element={
            <Layout>
              <RoomType />
            </Layout>
          }
        />

        <Route
          path="/Room"
          element={
            <Layout>
              <Room />
            </Layout>
          }
        />

        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />
        <Route path='/About' element={< About/>} />

      </Routes>
    </Router>
  );
}

export default App;
