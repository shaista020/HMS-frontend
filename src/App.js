import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SignUp from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/admin_dashboard';
import UserDashboard from './pages/Dashboard/user_dashboard';
import RoomType from './pages/User/RoomType';
import Room from './pages/User/Room';
import Sidebar from './pages/extras/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

// Wrapper to handle sidebar rendering
function Layout({ children }) {
  const location = useLocation();
  const adminPaths = ['/admin_dashboard']; // add more admin paths if needed

  const isAdminRoute = adminPaths.includes(location.pathname);

  return (
    <div className="d-flex">
      {/* Sidebar only for admin */}
      {isAdminRoute && <Sidebar />}

      {/* Main Content */}
      <div
        className="flex-grow-1 p-4"
        style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}
      >
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Pages */}
        <Route path="/signup" element={<SignUp mode="signup" />} />
        <Route path="/signin" element={<SignUp mode="signin" />} />

        {/* Admin & User Pages wrapped in Layout */}
        <Route
          path="/admin_dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/user_dashboard"
          element={
            <Layout>
              <UserDashboard />
            </Layout>
          }
        />
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

        {/* Landing Page (no sidebar) */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
