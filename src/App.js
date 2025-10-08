import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard  from './pages/Dashboard/admin_dashboard';
import UserDashboard from './pages/Dashboard/user_dashboard'; 



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp mode="signup" />} />
        <Route path="/signin" element={<SignUp mode="signin" />} />
          <Route path="/" element={<LandingPage/>} />
          <Route path="/admin_dashboard" element={<Dashboard/>}/>
          <Route path="/user_dashboard" element={<UserDashboard/>}/>
         
      </Routes>
    </Router>
  );
}

export default App;
