import React, { useState } from "react";
import "../../../Style/Navbar.css"; // New CSS for styling
import { useAuth } from "../../AuthContext/AuthContextApi";
import img1 from "../../../Images/png-transparent-google-logo-google-search-google-account-redes-search-engine-optimization-text-service-thumbnail-removebg-preview.png"
import { auth, googleProvider } from "../../AuthContext/Firebase";
import { signInWithPopup } from "firebase/auth"; // Adjust the path if needed
import SecurityIcon from '@mui/icons-material/Security';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FlashOnIcon from '@mui/icons-material/FlashOn';



export default function AuthModal({ onClose}) {
    const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
const [otpVerified, setOtpVerified] = useState(false);
const [otpLoading, setOtpLoading] = useState(false);
const [verifyLoading, setVerifyLoading] = useState(false);

    const BASE_URL = "https://backend-olx-j9e3.onrender.com";


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: ""
  });



const handleGoogleLogin = async () => {
  try {
  // ✅ Correct:
const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Send required fields to your backend directly
    const res = await fetch(`${BASE_URL}/api/auth/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        name: user.displayName,
        googleId: user.uid,
        avatar: user.photoURL,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      login(data.token, data.user); // your AuthContext method
      alert("Login successful with Google!");
      onClose();
    } else {
      alert(data.message || "Google login failed");
    }
  } catch (err) {
    console.error("Google login error", err);
    alert("Google login error");
  }
};




  const toggleForm = () => {
    setIsLogin(prev => !prev);
    setForm({ name: "", email: "", password: "", otp: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (isLogin) {
    // Login flow
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
if (res.ok) {
  login(data.token, data.user); 
  alert("Login successful!");
  onClose();
}
else {
      alert(data.message || "Login failed");
    }
  } else {
    // Register flow
    if (!otpVerified) {
      alert("Please verify your email using OTP first.");
      return;
    }

    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Registration successful!");
      onClose(); // ✅ Close modal after registration
    } else {
      alert(data.message || "Registration failed");
    }
  }
};

const handleSendOTP = async () => {
  const { name, email, password } = form;

  if (!name || !email || !password) {
    return alert("Please fill Name, Email and Password before sending OTP.");
  }

  setOtpLoading(true); // show loading

  const res = await fetch(`${BASE_URL}/api/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  setOtpLoading(false); // stop loading

  if (res.ok) {
    setOtpSent(true);
    alert("OTP sent to your email!");
  } else {
    alert(data.message || "Failed to send OTP");
  }
};



const handleVerifyOTP = async () => {
  setVerifyLoading(true); // start loading

  const res = await fetch(`${BASE_URL}/api/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: form.email, otp: form.otp }),
  });

  const data = await res.json();
  setVerifyLoading(false); // stop loading

  if (res.ok) {
    setOtpVerified(true);
    alert("Email verified successfully!");
  } else {
    alert(data.message || "Invalid OTP");
  }
};



  return (
  <div className="auth-modal">
  <div className="auth-box">
<div className="auth-left">
  <div>
    <SecurityIcon  className="login-icon"/>
    <div className="login-access">
      <h4>Secure Account Access</h4>
      <p>All your login and activity is protected with industry-level encryption</p>
    </div>
  </div>

  <div>
    <StorefrontIcon className="login-icon"/>
    <div className="login-access">
      <h4>Seamless Buying & Selling</h4>
      <p>Connect, negotiate, and close deals with real-time chat and alerts</p>
    </div>
  </div>

  <div>
    <FlashOnIcon className="login-icon"/>
    <div  className="login-access">
      <h4>Instant Notifications</h4>
      <p>Stay updated with real-time messages, offers, and price drops</p>
    </div>
  </div>
</div>


    <div className="auth-right">
      <div className="auth-tabs">
        <span className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>Login</span>
        <span className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>Register</span>
      </div>
      <h2>{isLogin ? "Login to Marketplace" : "Register for Marketplace"}</h2>
      <p>Please provide your Email and Password</p>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
          className="login-input reg-name"
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <input
           className="login-input"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
           className="login-input"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />
 {!isLogin && (
  <>
    {!otpSent && (
      <button type="button" onClick={handleSendOTP} disabled={otpLoading}>
        {otpLoading ? "Sending OTP..." : "Send OTP"}
      </button>
    )}

    {otpSent && (
      <>
        <input
           className="login-input"
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={form.otp}
          onChange={handleChange}
        />
        <button type="button" onClick={handleVerifyOTP} disabled={verifyLoading}>
          {verifyLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </>
    )}
  </>
)}


        <button type="submit">{isLogin ? "Continue" : "Register"}</button>
      </form>
      <div style={{ textAlign: "center", margin: "10px 0" }}>OR</div>
     <button className="google-btn" onClick={handleGoogleLogin}>
  <img src={img1} alt="Google icon" className="image-login-google" />
  Login with Google
</button>

      <p className="switch-auth">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={toggleForm}>{isLogin ? "Register" : "Login"}</span>
      </p>
    </div>

    <button className="authclose-btn" onClick={onClose}>×</button>
  </div>
</div>

  );
}
