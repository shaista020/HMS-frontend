import './auth.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Modal from 'bootstrap/js/dist/modal'; // Import Modal explicitly 

export default function SignUp({ mode }) {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState({ email: '', password: '', remember_me: false });
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    terms_agreed: false,
  });
  useEffect(() => {
    const container = document.querySelector('.container');
    if (mode === 'signup') container.classList.add('sign-up-mode');
    else container.classList.remove('sign-up-mode');
  }, [mode]);
  const handleSignUp = () => navigate('/signup');
  const handleSignIn = () => navigate('/signin');

  const handleInputChange = (e, formType) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    formType === 'signin'
      ? setSignInData({ ...signInData, [name]: fieldValue })
      : setSignUpData({ ...signUpData, [name]: fieldValue });
  };
  const showMessage = (message, type = 'danger') => {
    const modalBody = document.getElementById('errorModalBody');
    modalBody.textContent = message;
  
    const modalTitle = document.getElementById('errorModalLabel');
    modalTitle.textContent = type === 'success' ? 'Success' : 'Error';
  
    // Use Modal directly instead of bootstrap.Modal
    const errorModal = new Modal(document.getElementById('errorModal'));
    errorModal.show();
  };
  

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: signInData.email,
      password: signInData.password,
    };
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', payload);
      const { access, refresh, is_superuser } = response.data;
  
      showMessage('Login successful!', 'success');
  
      // Store tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
  
      // Redirect based on role
      if (is_superuser) {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Login failed. Please check your credentials.';
      showMessage(errorMsg, 'danger');
      console.error('Login Error:', error.response?.data);
    }
  };
  
  

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirm_password) {
      showMessage('Passwords do not match!', 'danger');
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/signup/', signUpData);
      showMessage('Account created successfully!', 'success');
  
      // Reset the form fields
      setSignUpData({
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        terms_agreed: false,
      });
  
      navigate('/signin');
    } catch (error) {
      let errorMsg = 'Signup failed. Please try again.';
      if (error.response?.data?.error) {
        errorMsg = error.response.data.error;
      }
      showMessage(errorMsg, 'danger');
    }
  };
  
  

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSignInSubmit}>
            <h2 className="title">Login</h2>
            <div className="input-box">
              <input
                type="email"
                name="email"
                value={signInData.email}
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
  className="btn"
  id="btns"
  style={{
    display: 'inline-block',
   width: window.innerWidth <= 926 ? '60%' : '60%',
    padding: window.innerWidth <= 926 ? '8px 12px' : '10px',
     width:'310px',
    marginTop: '20px',
    background: 'linear-gradient(-45deg, #0d0d0e 0%, black 100%)',
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
    display: 'block',        // inline-block ki jagah block
    textAlign: 'right',       // text ko left align karega
    width: '100%'            // full width le lega
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
    className="btn"
    style={{
    display: 'inline-block',
   width: window.innerWidth <= 926 ? '60%' : '60%',
    padding: window.innerWidth <= 926 ? '8px 12px' : '10px',
    marginTop: '20px',
    background: 'linear-gradient(-45deg, #0d0d0e 0%, black 100%)',
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

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
          <h1>WELCOME!</h1>
        <p>
          Hello, <br />
          Welcome to our website. We're excited to have you here!
        </p>
            <button className="btn transparent" id="sign-up-btn" onClick={() => navigate("/signup")}>
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
            <button className="btn transparent" id="sign-in-btn" onClick={() => navigate("/signin")}>
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
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         </div>
       </div>
     </div>
   </div>

    </div>
  );
}