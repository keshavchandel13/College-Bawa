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
import { useAuth } from "../context/AuthContext";
import DashboardRoutes from "./DashboardRoutes";
function AppRoutes() {
  const [otpRequested, setOtpRequested] = useState(false);
  const { user, loading } = useAuth(); // ⬅ loading added

  const GoogleAuthWrapper = () => (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <LoginWithGoogle />
    </GoogleOAuthProvider>
  );

  const ProtectedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>; // 👈 handle loading
    return user ? children : <Navigate to="/login" />;
  };

  const GotOtp = ({ children }) => {
    return otpRequested ? children : <Navigate to="/forgetpassword" />;
  };

  const RestrictedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>; // 👈 handle loading
    return user ? <Navigate to="/home" /> : children;
  };

  return (
    <Routes>
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
      <Route
        path="/forgetpassword"
        element={
          <RestrictedRoute>
            <ForgetPassword setOtpRequested={setOtpRequested} />
          </RestrictedRoute>
        }
      />
      {/* <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/home/*"
        element={
          <ProtectedRoute>
            <DashboardRoutes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <GotOtp>
            <ResetPassword />
          </GotOtp>
        }
      />
      <Route
        path="/"
        element={<Navigate replace to={user ? "/home" : "/login"} />}
      />
    </Routes>
  );
}

export default AppRoutes;
