import './auth.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Modal from 'bootstrap/js/dist/modal'; 
import { address } from 'framer-motion/client';

export default function SignUp({ mode }) {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState({ identifier: '', password: '', remember_me: false });
  const [signUpData, setSignUpData] = useState({
    username: '',
    identifier: '',
    password:'',
    confirm_password: '',
    dob: '',
    address: '',
    cnic: '',
    
  });

    useEffect(() => {
 
    const container_main = document.querySelector('.container_main');
    if (mode === 'signup')  container_main?.classList.add('sign-up-mode');
    else  container_main?.classList.remove('sign-up-mode');

  
    axios.defaults.baseURL = 'http://127.0.0.1:8000';
   
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [mode]);

  const handleSignUp = () => navigate('/signup');
  const handleSignIn = () => navigate('/signin');

  const handleInputChange = (e, formType) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    if (formType === 'signin') {
      setSignInData((prev) => ({ ...prev, [name]: fieldValue }));
    } else {
      setSignUpData((prev) => ({ ...prev, [name]: fieldValue }));
    }
  };

  const showMessage = (message, type = 'danger') => {
    const modalBody = document.getElementById('errorModalBody');
    if (modalBody) modalBody.textContent = message;

    const modalTitle = document.getElementById('errorModalLabel');
    if (modalTitle) modalTitle.textContent = type === 'success' ? 'Success' : 'Error';

    const errorModalEl = document.getElementById('errorModal');
    if (errorModalEl) {
      const errorModal = new Modal(errorModalEl);
      errorModal.show();
    } else {
  
      alert(message);
    }
  };

  // ---------------- Sign In ----------------
const handleSignInSubmit = async (e) => {
  e.preventDefault();
  console.log("📩 SignIn Data being sent:", signInData); 

  try {
    const res = await axios.post('/signin/', signInData, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log("✅ SignIn Response:", res.data); 

    const token = res.data?.token || res.data?.access || res.data?.key || null;

    if (!token) {
      console.warn("⚠️ No token returned in response"); 
      showMessage('Login succeeded but token not returned by backend', 'success');
    } else {
      if (signInData.remember_me) {
        localStorage.setItem('token', token);
        console.log("💾 Token saved in localStorage:", token);
      } else {
        sessionStorage.setItem('token', token);
        console.log("💾 Token saved in sessionStorage:", token);
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      showMessage('Login successful!', 'success');
    }

  const isSuperUser = res.data?.user?.is_superuser || res.data?.user?.is_staff || false;

if (isSuperUser) {
  navigate('/admin_dashboard');
} else {
  navigate('/user_dashboard');
}


  } catch (error) {
    console.error('❌ Login Error (Full):', error); 
    console.error('❌ Login Error (Response Data):', error.response?.data);

    const errData = error.response?.data;
    const errMsg =
      errData?.detail ||
      errData?.non_field_errors?.[0] ||
      (typeof errData === 'string' ? errData : null) ||
      JSON.stringify(errData) ||
      'Login failed, please check credentials or server.';
    showMessage(errMsg);
  }
};


// ---------------- Sign Up ----------------
const handleSignUpSubmit = async (e) => {
  e.preventDefault();

  console.log("📩 SignUp Data (Raw):", signUpData);

  if (signUpData.password !== signUpData.confirm_password) {
    showMessage("Passwords don't match!");
    return;
  }

  try {
  
    const res = await axios.post('/signup/', signUpData, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log("✅ Signup Response:", res.data);
    showMessage('Signup successful! Please login.', 'success');
    navigate('/signin');
  } catch (error) {
    console.error('❌ Signup Error (Response Data):', error.response?.data);
    const errData = error.response?.data;
    let errMsg = 'Signup failed, please check input.';
    if (errData) {
      if (typeof errData === 'object' && !Array.isArray(errData)) {
        const firstKey = Object.keys(errData)[0];
        const firstVal = errData[firstKey];
        if (Array.isArray(firstVal)) errMsg = firstVal[0];
        else if (typeof firstVal === 'string') errMsg = firstVal;
      } else if (typeof errData === 'string') {
        errMsg = errData;
      }
    }
    showMessage(errMsg);
  }
};

  

  return (
   <div className="main-body">
  <div className='container_main '>
      <div className="forms-containers">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSignInSubmit}>
            <h2 className="title">Login</h2>
            <div className="input-box">
              <input
                type="email"
                name="identifier"
                value={signInData.identifier}
                onChange={(e) => handleInputChange(e, 'signin')}
                required
              />
              <label>Email</label>
              <i className="fas fa-envelope"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                value={signInData.password}
                onChange={(e) => handleInputChange(e, 'signin')}
                required
              />
              <label>Password</label>
              <i className="fas fa-lock"></i>
            </div>
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                name="remember_me"
                checked={signInData.remember_me}
                onChange={(e) => handleInputChange(e, 'signin')}
              />
              <label htmlFor="remember">Remember Me</label>
              
              </div>
             
           
           <button
  type="submit"
  className="btn form-btn"
  id="btns"
  style={{
    display: 'inline-block',
   width: window.innerWidth <= 926 ? '60%' : '60%',
    padding: window.innerWidth <= 926 ? '8px 12px' : '10px',
     width:'310px',
    marginTop: '20px',
    background: 'linear-gradient(-45deg, #4A5E46 0%, #4A5E46 100%)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: '0.3s',
    fontSize: window.innerWidth <= 926 ? '14px' : '16px',
  }}
>
  Login
</button>

 <a
  href="#"
  style={{
    color: 'var(--black)',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'block',        
    textAlign: 'right',       
    width: '100%'            
  }}
  onClick={() => alert('Forgot Password functionality coming soon!')}
>
  Forgot Password?
</a>

      <div className="lineTxt">
        <p
          style={{
            fontSize: '16px',
            color: 'var(--black)',
            textAlign: 'center',
          }}
        >
          Don't have an account?
          <a
            id="sign-up-btn"
            style={{
              color: 'var(--black)',
              textDecoration: 'none',
              cursor: 'pointer',
              marginLeft: '5px',
            }}
            onClick={handleSignUp}
          >
            Sign Up
          </a>
        </p>
      </div>
          </form>

         <form className="sign-up-form" onSubmit={handleSignUpSubmit}>
  <h2 className="title">Sign Up</h2>

  {/* Username (AbstractUser me hota hai) */}
  <div className="input-box">
    <input
      type="text"
      name="username"
      value={signUpData.username}
      onChange={(e) => handleInputChange(e, 'signup')}
      required
    />
    <label>Username</label>
    <i className="fas fa-user"></i>
  </div>

  {/* Email */}
  <div className="input-box">
    <input
      type="email"
      name="email"
      value={signUpData.email}
      onChange={(e) => handleInputChange(e, 'signup')}
      required
    />
    <label>Email</label>
    <i className="fas fa-envelope"></i>
  </div>

  {/* Password */}
  <div className="input-box">
    <input
      type="password"
      name="password"
      value={signUpData.password}
      onChange={(e) => handleInputChange(e, 'signup')}
      required
    />
    <label>Password</label>
    <i className="fas fa-lock"></i>
  </div>

              {/* Confirm password (important) */}
            <div className="input-box">
              <input type="password" name="confirm_password" value={signUpData.confirm_password} onChange={(e) => handleInputChange(e, 'signup')} required />
              <label>Confirm Password</label>
              <i className="fas fa-lock"></i>
            </div>


  {/* Date of Birth */}
  <div className="input-box">
    <input
      type="date"
      name="dob"
      value={signUpData.dob}
      onChange={(e) => handleInputChange(e, 'signup')}
      required
    />
    <label>Date of Birth</label>
    <i className="fas fa-calendar"></i>
  </div>

  {/* Address */}
  <div className="input-box">
    <input
      type="text"
      name="address"
      value={signUpData.address}
      onChange={(e) => handleInputChange(e, 'signup')}
      required
    />
    <label>Address</label>
    <i className="fas fa-map-marker-alt"></i>
  </div>

  {/* CNIC */}
  <div className="input-box">
    <input
      type="number"
      name="cnic"
      value={signUpData.cnic}
      onChange={(e) => handleInputChange(e, 'signup')}
      required
    />
    <label>CNIC</label>
    <i className="fas fa-id-card"></i>
  </div>

  <button
    type="submit"
    className="btn form-btn"
    style={{
    display: 'inline-block',
   width: window.innerWidth <= 926 ? '60%' : '60%',
    padding: window.innerWidth <= 926 ? '8px 12px' : '10px',
    marginTop: '20px',
    background: 'linear-gradient(-45deg, #4A5E46 0%, #4A5E46 100%)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: '0.3s',
     width:'310px',
    fontSize: window.innerWidth <= 926 ? '14px' : '16px',
  }}
  >
    Sign Up
  </button>

  <div className="lineTxt">
    <p style={{ fontSize: '16px', color: 'var(--black)', textAlign: 'center' }}>
      Already have an account?
      <a
        id="sign-in-btn"
        style={{
          color: 'var(--black)',
          textDecoration: 'none',
          cursor: 'pointer',
          marginLeft: '5px',
        }}
        onClick={handleSignIn}
      >
        Login
      </a>
    </p>
  </div>
</form>

          
        </div>
      </div>

      <div className="panels-containers">
        <div className="panel left-panel">
          <div className="content">
          <h1>WELCOME!</h1>
        <p>
          Hello, <br />
          Welcome to our website. We're excited to have you here!
        </p>
            <button className="btn transparent form-btn" id="sign-up-btn" onClick={() => navigate("/signup")}>
  Sign up
</button>

          </div>
          <div>
      
    </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
          <h1>WELCOME <br />BACK!</h1>
        <p>
          Hello, <br />
          Welcome back to our website. We're excited to serve you as a host.
        </p>
            <button className="btn transparent form-btn" id="sign-in-btn" onClick={() => navigate("/signin")}>
              Sign in
            </button>
          </div>
          <img src="" className="image" alt="" />
        </div>
      </div>
       <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
   <div class="modal-dialog">
    <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title" id="errorModalLabel">Message</h5>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body" id="errorModalBody">
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-secondary form-btn" data-bs-dismiss="modal">Close</button>
         </div>
       </div>
     </div>
   </div>
</div>
    </div>
  );
}

