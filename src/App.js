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
 

function Layout({ children }) {
  const location = useLocation();
  const adminPaths = ['/admin_dashboard'];  
  const isAdminRoute = adminPaths.includes(location.pathname);

  return (
    <div className="d-flex">
       
      {isAdminRoute && <Sidebar />}
 
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
         
        <Route path="/signup" element={<SignUp mode="signup" />} />
        <Route path="/signin" element={<SignUp mode="signin" />} />
 
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
 
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
