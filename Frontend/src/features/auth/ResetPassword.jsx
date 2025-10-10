import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth/resetpassword.css";

function ResetPassword() {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    setSuccess('');

    if (newPassword.trim() !== confirmPassword.trim()) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/reset-password`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: otp.trim(), newPassword: newPassword.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('Password updated successfully. Redirecting to login...');
      
      // Redirect after success
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="reset-page">
      <div className="container">
        <h2>Reset Password</h2>
        <h6>Enter the OTP sent to your email and set a new password</h6>

        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
        {success && <div className="success-message" style={{ color: 'green' }}>{success}</div>}

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
