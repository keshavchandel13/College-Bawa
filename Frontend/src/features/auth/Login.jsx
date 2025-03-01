import React, { useState } from 'react';
import { Link, Links } from "react-router-dom";
import { AiFillGoogleCircle } from 'react-icons/ai';
import "../../styles/auth/login.css";  

function Login() {
  const [email,changeEmail] = useState('');
  const handleChange = (e) => {
    console.log(e.target);

  }


  return (
    <div className="login-page">
      <div className="container">
        <h2>Login</h2>

        
        <form method="POST">
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required />
          
          <button type="submit">Login</button>
        </form>

        <p className="forgot-password">
          <a href="#">Forgot Password?</a>
        </p>

        <div className="or-line">
          <span>OR</span>
        </div>

        
        <button type="button" className="google-button">
          <AiFillGoogleCircle style={{ fontSize: '40px' }} />
        </button>

        <p className="signup-link">
          <Link to={'/signup'}>Didn't have an account?Sign up</Link>
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
