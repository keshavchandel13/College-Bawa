import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { authCardBase, authInputBase, authButtonBase, authHeadingBase, authLinkBase } from "../../styles/authClasses";

function ResetPassword() {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (newPassword.trim() !== confirmPassword.trim()) { setError("Passwords do not match"); return; }
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/reset-password`, {
        method: 'POST', mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: otp.trim(), newPassword: newPassword.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');
      setSuccess('Password updated successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="
      flex justify-end items-center h-screen
      bg-[url('/ForgotPasswordBG.png')] bg-cover bg-center
      max-[1000px]:relative max-[1000px]:justify-center
      max-[1000px]:before:content-[''] max-[1000px]:before:absolute max-[1000px]:before:inset-0
      max-[1000px]:before:bg-gradient-to-br max-[1000px]:before:from-black/70 max-[1000px]:before:via-[rgba(25,0,51,0.5)] max-[1000px]:before:to-[rgba(0,0,102,0.7)]
      max-[1000px]:before:z-[1]
      [&>*]:relative [&>*]:z-[2]
    ">
      <div className={authCardBase}>
        <h2 className={`${authHeadingBase} text-left`}>Reset Password</h2>
        <h6 className="text-white/70 mb-5 text-left text-sm">
          Enter the OTP sent to your email and set a new password
        </h6>

        {error   && <div className="text-red-500 text-sm px-2.5 py-2 rounded my-2">{error}</div>}
        {success && <div className="text-green-400 text-sm px-2.5 py-2 rounded my-2">{success}</div>}

        <form method="POST" onSubmit={handleSubmit}>
          <input type="text"     name="otp"             value={otp}             onChange={(e) => setOtp(e.target.value)}             placeholder="Enter OTP"              required className={authInputBase} />
          <input type="password" name="newPassword"     value={newPassword}     onChange={(e) => setNewPassword(e.target.value)}     placeholder="Enter New Password"     required className={authInputBase} />
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password"   required className={authInputBase} />
          <button
            type="submit"
            className={`${authButtonBase} bg-gradient-to-r from-[#628EFF] via-[#8740CD] to-[#580475] mt-2`}
          >
            Reset Password
          </button>
        </form>

        <p className="mt-2.5 mb-[90px]">
          <Link to="/login" className={authLinkBase}>Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;