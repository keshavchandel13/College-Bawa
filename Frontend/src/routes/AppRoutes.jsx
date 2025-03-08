import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../features/auth/Login';
import Signup from '../features/auth/Signup';
import ForgetPassword from '../features/auth/ForgetPassword';
import ResetPassword from '../features/auth/ResetPassword';
import Home from '../pages/Home';

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);

  // Check if user is logged in and if OTP was requested
  useEffect(() => {
    const user = localStorage.getItem('user');
    const otpStatus = localStorage.getItem('otpRequested');
    if (user) {
      setIsLoggedIn(true);
    }
    if (otpStatus === 'true') {
      setOtpRequested(true);
    }
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Forget Password Route */}
      <Route 
        path="/forgetpassword" 
        element={<ForgetPassword setOtpRequested={setOtpRequested} />} 
      />

      {/* Protected Route for Reset Password */}
      <Route 
        path="/reset-password" 
        element={otpRequested ? <ResetPassword /> : <Navigate replace to="/forgetpassword" />}
      />

      {/* Default Route */}
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;
