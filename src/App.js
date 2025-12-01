import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import SignUp from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage/LandingPage';
import About from './pages/LandingPage/About';

import Dashboard from './pages/Dashboard/admin_dashboard';
import UserDashboard from './pages/Dashboard/user_dashboard';
import RoomType from './pages/User/RoomType';
import Room from './pages/User/Room';

import Sidebar from './pages/extras/Sidebar';
import NavBar from './pages/extras/NavBar';  
import 'bootstrap/dist/css/bootstrap.min.css';


function Layout({ children }) {
  const location = useLocation();
  const adminPaths = ['/admin_dashboard'];
  const isAdminRoute = adminPaths.includes(location.pathname);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Top Navbar */}
      {isAdminRoute && <NavBar />}

      <div
        className="d-flex"
        style={{
          marginLeft: isAdminRoute ? "250px" : "0",   // ✅ Push content to the right
          transition: "margin-left 0.3s ease",
        }}
      >
        {isAdminRoute && (
          <Sidebar
            style={{
              width: "250px",
              position: "fixed",        // Sidebar stays fixed
              left: 0,
              top: "70px",             // Under navbar if navbar is fixed
              height: "100%",
            }}
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
