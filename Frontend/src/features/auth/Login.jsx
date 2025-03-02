import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from 'react-icons/ai';

import Home from '../../pages/Home';
import "../../styles/auth/login.css";  

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email and password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    setError(null);
    try {
      
      const response = await fetch(`${import.meta.env.VITE_APP_LOGIN_API}`, {
        method: 'POST',
        mode:'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/Home');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <h2>Login</h2>

        {error && <div className="error-message" style={{color:'red'}}>{error}</div>} {/* Display error message if any */}

        <form method="POST" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}  // Bind the email input to state
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={password}  // Bind the password input to state
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>

        <p className="forgot-password">
        <Link to={'/forgetpassword'}>  Forgot Password? </Link>
        </p>

        <div className="or-line">
          <span>OR</span>
        </div>

        {/* Google login button */}
        <button type="button" className="google-button" onClick={() => {/* Google login yahan pe daalna hai  */}}>
          <AiFillGoogleCircle style={{ fontSize: '40px' }} />
        </button>

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

export default Login;
