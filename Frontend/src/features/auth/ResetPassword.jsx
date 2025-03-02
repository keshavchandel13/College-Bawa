import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../../styles/auth/resetpassword.css";

function ResetPassword() {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    console.log('Resetting password with OTP:', otp);
    console.log('New Password:', newPassword);
    
  };

  return (
    <div className="reset-page">
      <div className="container">
        <h2>Reset Password</h2>
        <h6>Enter the OTP sent to your email and set a new password</h6>

        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

        <form method="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter New Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            required
          />
          <button type="submit">Reset Password</button>
        </form>

        <p className="back-to-login-link">
          <Link to={'/login'}>Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;