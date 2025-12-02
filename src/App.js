import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import SignUp from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage/LandingPage';
import About from './pages/LandingPage/About';

import Dashboard from './pages/Admin/admin_dashboard';
import Book from './pages/Admin/Booking/BookingList';
import UserList from './pages/Admin/User/ListIUser'
import UserDashboard from './pages/Dashboard/user_dashboard';
import RoomType from './pages/User/RoomType';
import Room from './pages/User/Room';

import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';  
import 'bootstrap/dist/css/bootstrap.min.css';


function Layout({ children }) {
  const location = useLocation();
  const adminPaths = ['/admin_dashboard','/booking','/user'];
  const isAdminRoute = adminPaths.includes(location.pathname);

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
        <Route
          path="/booking"
          element={
            <Layout>
              <Book />
            </Layout>
          }
        />
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
