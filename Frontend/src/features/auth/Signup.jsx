import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import "../../styles/auth/signup.css";

function Signup() {
  const navigate = useNavigate(); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password Validations
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_SIGNUP_API}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login"); 
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Signup</h2>
        <h6>Just Some Details To Get You In</h6>

        {error && <div className="error-message" style={{ color: "red" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={handleChange} required />
          <button type="submit">Sign Up</button>
        </form>

        <p className="forgot-password">
          <Link to="/forgetpassword">Forgot Password?</Link>
        </p>

        <div className="or-line">
          <span>OR</span>
        </div>

        <button type="button" className="google-button">
          <AiFillGoogleCircle style={{ fontSize: "40px" }} />
        </button>

        <p className="signup-link">
          <Link to="/login">Already Registered? Login</Link>
        </p>

        <div className="footer-links">
          <Link to="/terms">Terms and Conditions</Link>
          <Link to="/support">Support</Link>
          <Link to="/customer-care">Customer Care</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
