import './auth.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import LandNavbar from "../LandingPage/LandNavbar";
import { Modal } from 'bootstrap'; 

const InputField = ({ label, icon, type, name, value, onChange, toggleShow, showIcon }) => (
  <div className="input-box">
    <input type={type} name={name} value={value} onChange={onChange} required />
    <label>{label}</label>
    {toggleShow ? (
      <span className="password-toggle" onClick={toggleShow}>
        <i className={showIcon ? 'fa fa-eye' : 'fas fa-lock'} />
      </span>
    ) : (
      <i className={icon}></i>
    )}
  </div>
);

export default function SignUp({ mode }) {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState({ signin: false, signup: false, confirm: false });
  const [signInData, setSignInData] = useState({ identifier: '', password: '', remember_me: false });
  const [signUpData, setSignUpData] = useState({
    username: '', email: '', password: '', confirm_password: '', dob: '', address: '', cnic: '',
  });

  useEffect(() => {
    const container = document.querySelector('.container_main');
    mode === 'signup' ? container?.classList.add('sign-up-mode') : container?.classList.remove('sign-up-mode');
  }, [mode]);

  const handleInputChange = (e, formType) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    formType === 'signin' 
      ? setSignInData(prev => ({ ...prev, [name]: val }))
      : setSignUpData(prev => ({ ...prev, [name]: val }));
  };

  const showMessage = (message, type = 'danger') => {
    const modalEl = document.getElementById('errorModal');
    document.getElementById('errorModalBody').textContent = message;
    document.getElementById('errorModalLabel').textContent = type === 'success' ? 'Success' : 'Error';
    new Modal(modalEl).show();
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/signin/", signInData);
      const { user, tokens } = res.data;
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("user", JSON.stringify(user));
      navigate(user.is_superuser ? "/admin_dashboard" : "/user_dashboard");
    } catch (error) {
      showMessage(error.response?.data?.detail || "Invalid credentials!");
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirm_password) return showMessage("Passwords don't match!");
    try {
      await API.post("/signup/", signUpData);
      showMessage("Signup successful! Please login.", "success");
      navigate("/signin");
    } catch (error) {
      showMessage("Signup failed! Check details.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <LandNavbar />
      <div className="main-body">
        <div className="container_main">
          <div className="forms-containers">
            <div className="signin-signup">
              {/* Sign In Form */}
              <form className="sign-in-form" onSubmit={handleSignInSubmit}>
                <h2 className="title">Login</h2>
                <InputField label="Email" icon="fas fa-envelope" type="text" name="identifier" value={signInData.identifier} onChange={(e) => handleInputChange(e, 'signin')} />
                <InputField 
                  label="Password" type={showPass.signin ? 'text' : 'password'} name="password" 
                  value={signInData.password} onChange={(e) => handleInputChange(e, 'signin')}
                  toggleShow={() => setShowPass(p => ({...p, signin: !p.signin}))} showIcon={showPass.signin}
                />
                <div className="remember-me">
                  <input type="checkbox" id="remember" name="remember_me" checked={signInData.remember_me} onChange={(e) => handleInputChange(e, 'signin')} />
                  <label htmlFor="remember">Remember Me</label>
                </div>
                <button type="submit" className="form-btn">Login</button>
                <Link to="#" className="forgot-link" onClick={() => alert('Coming soon!')}>Forgot Password?</Link>
                <p className="mobile-toggle-text">Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span></p>
              </form>

              {/* Sign Up Form */}
              <form className="sign-up-form" onSubmit={handleSignUpSubmit}>
                <h2 className="title">Sign Up</h2>
                <div className="scroll-form-fields">
                   <InputField label="Username" icon="fas fa-user" name="username" value={signUpData.username} onChange={(e) => handleInputChange(e, 'signup')} />
                   <InputField label="Email" icon="fas fa-envelope" name="email" value={signUpData.email} onChange={(e) => handleInputChange(e, 'signup')} />
                   <InputField 
                      label="Password" type={showPass.signup ? 'text' : 'password'} name="password" value={signUpData.password} 
                      onChange={(e) => handleInputChange(e, 'signup')} toggleShow={() => setShowPass(p => ({...p, signup: !p.signup}))} showIcon={showPass.signup} 
                    />
                   <InputField 
                      label="Confirm Password" type={showPass.confirm ? 'text' : 'password'} name="confirm_password" value={signUpData.confirm_password} 
                      onChange={(e) => handleInputChange(e, 'signup')} toggleShow={() => setShowPass(p => ({...p, confirm: !p.confirm}))} showIcon={showPass.confirm} 
                    />
                   <div className="input-box">
  <input 
    type="date" 
    name="dob" 
    value={signUpData.dob} 
    onChange={(e) => handleInputChange(e, 'signup')} 
    required 
    id="dobInput"
  />
  <label>Date of Birth</label>
  <span className="icon-click" onClick={() => document.getElementById('dobInput').showPicker?.()}>
    <i className="fas fa-calendar-alt"></i>
  </span>
</div>

                   <InputField label="Address" icon="fas fa-map-marker-alt" name="address" value={signUpData.address} onChange={(e) => handleInputChange(e, 'signup')} />
                   <InputField label="CNIC" icon="fas fa-id-card" type="number" name="cnic" value={signUpData.cnic} onChange={(e) => handleInputChange(e, 'signup')} />
                </div>
                 
                <button type="submit" className="form-btn  "  >Sign Up</button>
                <p className="mobile-toggle-text "  >Already have an account? <span onClick={() => navigate('/signin')}>Login</span></p>
             
              </form>
            </div>
          </div>

          <div className="panels-containers">
            <div className="panel left-panel">
              <div className="content">
                <h1>WELCOME!</h1>
                <p>Hello, Welcome to our website. We're excited to have you here!</p>
                <button className="form-btn transparent" onClick={() => navigate("/signup")}>Sign up</button>
              </div>
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h1>WELCOME BACK!</h1>
                <p>Hello, Welcome back! We're excited to serve you again.</p>
                <button className="form-btn transparent" onClick={() => navigate("/signin")}>Sign in</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="errorModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="errorModalLabel">Message</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body" id="errorModalBody"></div>
          </div>
        </div>
      </div>
    </div>
  );
}