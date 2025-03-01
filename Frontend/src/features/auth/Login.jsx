import React from 'react';
// Import the Google icon from react-icons
import { AiFillGoogleCircle } from 'react-icons/ai';
import "../../styles/auth/login.css";  // Ensure this path is correct for your project

function Login() {
  return (
    <div className="login-page">
      <div className="container">
        <h2>Login</h2>

        {/* Form with method POST */}
        <form method="POST">
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          
          <button type="submit">Login</button>
        </form>

        <p className="forgot-password">
          <a href="#">Forgot Password?</a>
        </p>

        <div className="or-line">
          <span>OR</span>
        </div>

        {/* Google Login Button with Only Icon */}
        <button type="button" className="google-button">
          <AiFillGoogleCircle style={{ fontSize: '40px' }} />
        </button>

        <p className="signup-link">
          <a href="#">Didn't have an account? Sign up</a>
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
