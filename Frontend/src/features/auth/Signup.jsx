import React from "react";
import { Link } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import "../../styles/auth/signup.css";

function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Proceed with form submission logic
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Signup</h2>
        <h6>Just Some Details To Get You in</h6>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <div className="or-line">
          <span>OR</span>
        </div>

        <button type="button" className="google-button">
          <AiFillGoogleCircle style={{ fontSize: "40px" }} />
        </button>

        <p className="sigin-link">
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
