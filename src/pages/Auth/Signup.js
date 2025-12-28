import './auth.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Modal from 'bootstrap/js/dist/modal';
import API from '../../api';
import LandNavbar from "../LandingPage/LandNavbar";
import Footer from "../LandingPage/Footer";

export default function SignUp({ mode }) {
  const navigate = useNavigate();

  // ------------------ Password visibility ------------------
  const [showPasswordSignIn, setShowPasswordSignIn] = useState(false);
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleSignInPassword = () => setShowPasswordSignIn(prev => !prev);
  const toggleSignUpPassword = () => setShowPasswordSignUp(prev => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  // ------------------ Form states ------------------
  const [signInData, setSignInData] = useState({ identifier: '', password: '', remember_me: false });
  const [signUpData, setSignUpData] = useState({
    username: '',
    identifier: '',
    password: '',
    confirm_password: '',
    dob: '',
    address: '',
    cnic: '',
  });

  // ------------------ Setup ------------------
  useEffect(() => {
    const container_main = document.querySelector('.container_main');
    if (mode === 'signup') container_main?.classList.add('sign-up-mode');
    else container_main?.classList.remove('sign-up-mode');
  }, [mode]);

  // ------------------ Input Change ------------------
  const handleInputChange = (e, formType) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    if (formType === 'signin') {
      setSignInData(prev => ({ ...prev, [name]: fieldValue }));
    } else {
      setSignUpData(prev => ({ ...prev, [name]: fieldValue }));
    }
  };

  // ------------------ Show message ------------------
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

  // ------------------ Sign In ------------------
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    console.log("📩 SignIn Data being sent:", signInData);

    try {
      const res = await API.post("/signin/", signInData, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("✅ SignIn Response:", res.data);

      const user = res.data?.user;
      const tokens = res.data?.tokens;

      if (!user || !tokens) {
        showMessage("User or token data missing from server!");
        return;
      }

      // Save Tokens
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);

      // Save User
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect Logic
      if (user.is_superuser) {
        navigate("/admin_dashboard");
      } else {
        navigate("/user_dashboard");
      }

      showMessage("Login Successful!", "success");

    } catch (error) {
      console.error("Login Error (Full):", error);
      const errData = error.response?.data;

      const errorMsg =
        errData?.detail ||
        errData?.non_field_errors?.[0] ||
        JSON.stringify(errData) ||
        "Invalid credentials!";

      showMessage(errorMsg);
    }
  };


  // ------------------ Sign Up ------------------
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.confirm_password) {
      showMessage("Passwords don't match!");
      return;
    }

    try {
      const res = await API.post("/signup/", signUpData, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Signup Response:", res.data);
      showMessage("Signup successful! Please login.", "success");
      navigate("/signin");

    } catch (error) {
      const err = error.response?.data;
      console.error("Signup Error:", err);

      let msg = "Signup failed!";
      if (err && typeof err === "object") {
        const key = Object.keys(err)[0];
        msg = Array.isArray(err[key]) ? err[key][0] : err[key];
      }

      showMessage(msg);
    }
  };

  const handleSignUp = () => navigate('/signup');
  const handleSignIn = () => navigate('/signin');


  return (
    <div>
      <LandNavbar />
      <div className="main-body mt-5">
        <div className='container_main '>
          <div className="forms-containers">
            <div className="signin-signup">
              <form className="sign-in-form" onSubmit={handleSignInSubmit}>
                <h2 className="title">Login</h2>
                <div className="input-box">
                  <input
                    type="text"
                    name="identifier"
                    value={signInData.identifier}
                    onChange={(e) => handleInputChange(e, 'signin')}
                    required
                  />
                  <label>Email</label>
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="input-box" style={{ position: 'relative' }}>
                  <input
                    type={showPasswordSignIn ? 'text' : 'password'}
                    name="password"
                    value={signInData.password}
                    onChange={(e) => handleInputChange(e, 'signin')}
                    required
                  />
                  <label>Password</label>

                  {/* Clickable lock/eye icon — click toggles show/hide */}
                  <span
                    onClick={toggleSignInPassword}
                    style={{
                      position: 'absolute',
                      right: '2px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                    aria-label={showPasswordSignIn ? 'Hide password' : 'Show password'}
                  >
                    {/* switch icon visually: lock when hidden, eye when visible */}
                    <i className={showPasswordSignIn ? 'fa fa-eye' : 'fas fa-lock'} />
                  </span>
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
                    width: window.innerWidth <= 926 ? '60%' : '310px',
                    padding: window.innerWidth <= 926 ? '8px 12px' : '10px',
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

                <Link
                  to="#"
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
                </Link>

                <div className="lineTxt">
                  <p
                    style={{
                      fontSize: '16px',
                      color: 'var(--black)',
                      textAlign: 'center',
                    }}
                  >
                    Don't have an account?
                    <Link
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
                    </Link>
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

                <div className="input-box" style={{ position: 'relative' }}>
                  <input
                    type={showPasswordSignUp ? 'text' : 'password'}
                    name="password"
                    value={signUpData.password}
                    onChange={(e) => handleInputChange(e, 'signup')}
                    required
                  />
                  <label>Password</label>

                  <span
                    onClick={toggleSignUpPassword}
                    style={{
                      position: 'absolute',
                      right: '2px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                    aria-label={showPasswordSignUp ? 'Hide password' : 'Show password'}
                  >
                    <i className={showPasswordSignUp ? 'fa fa-eye' : 'fas fa-lock'} />
                  </span>
                </div>


                {/* Confirm password (important) */}
                <div className="input-box" style={{ position: "relative" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    value={signUpData.confirm_password}
                    onChange={(e) => handleInputChange(e, "signup")}
                    required
                  />
                  <label>Confirm Password</label>

                  {/* Clickable icon */}
                  <span
                    onClick={toggleConfirmPassword}
                    style={{
                      position: "absolute",
                      right: "2px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    <i className={showConfirmPassword ? "fa fa-eye" : "fas fa-lock"}></i>
                  </span>
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
                    width: window.innerWidth <= 926 ? '60%' : '310px',
                    padding: window.innerWidth <= 926 ? '8px 12px' : '10px',
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
                  Sign Up
                </button>

                <div className="lineTxt">
                  <p style={{ fontSize: '16px', color: 'var(--black)', textAlign: 'center' }}>
                    Already have an account?
                    <Link
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
                    </Link>
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
      {/* <Footer /> */}

    </div>
  );
}

