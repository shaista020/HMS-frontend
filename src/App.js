import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage/LandingPage'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp mode="signup" />} />
        <Route path="/signin" element={<SignUp mode="signin" />} />
          <Route path="/" element={<LandingPage/>} />
         
      </Routes>
    </Router>
  );
}

export default App;
