import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth/forgotpassword.css";


function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_FORGET_API}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/reset-password');
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError('Failed to send request');
    }
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
