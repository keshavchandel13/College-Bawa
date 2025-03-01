import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../../styles/auth/forgotpassword.css";

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password reset functionality here (e.g., Firebase, API call, etc.)
    console.log('Password reset for email:', email);
  };

  return (
    <div className="forgot-page">
      <div className="container">
        <h2>Forgot Password?</h2>
        <h6>Please enter your email</h6>

        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

        <form method="POST" onSubmit={handleSubmit}>
          <input
            type="email"
            name="forgottenemail"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Reset Password</button>
        </form>

        <p className="back-to-login-link">
          <Link to={'/login'}>Back to Login</Link>
        </p>

        {/* Additional options inside the same container */}
        <p className="signup-link">
          <Link to={'/signup'}>Don't have an account? Sign up</Link>
        </p>

        <div className="footer-links">
          <a href="#">Terms and Conditions</a>
          <a href="#">Support</a>
          <a href="#">Customer Care</a>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
