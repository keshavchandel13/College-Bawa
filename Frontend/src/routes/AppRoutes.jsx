import React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import ForgetPassword from "../features/auth/ForgetPassword";
import ResetPassword from "../features/auth/ResetPassword";
import Home from "../pages/Home";
import LoginWithGoogle from "../features/auth/LoginWithGoogle";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

function AppRoutes() {
  const [otpRequested, setOtpRequested] = useState(false);
  const { user } = useAuth(); // Get user from context

  // Google auth wrapper function
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <LoginWithGoogle />
      </GoogleOAuthProvider>
    );
  };

  // Protected Route that redirects if user is not logged in
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };
  const GotOtp = ({ children }) => {
    return otpRequested ? children : <Navigate to="/forgetpassword" />;
  };

  // Restricted Route that redirects if user is logged in
  const RestrictedRoute = ({ children }) => {
    return user ? <Navigate to="/home" /> : children;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <RestrictedRoute>
            <Login />
          </RestrictedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <RestrictedRoute>
            <Signup />
          </RestrictedRoute>
        }
      />
      <Route path="/google-login" element={<GoogleAuthWrapper />} />

      {/* Forget Password Route */}
      <Route
        path="/forgetpassword"
        element={
          <RestrictedRoute>
            <ForgetPassword setOtpRequested={setOtpRequested} />
          </RestrictedRoute>
        }
      />

      {/* Protected Route for Home */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Protected Route for Reset Password */}
      <Route
        path="/reset-password"
        element={
          <GotOtp>
            <ResetPassword />
          </GotOtp>
        }
      />

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate replace to={user ? "/home" : "/login"} />}
      />
    </Routes>
  );
}

export default AppRoutes;
