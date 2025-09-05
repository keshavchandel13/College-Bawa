import React, { useState, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from '../components/globalComponent/LoadingSpinner'
import DashboardRoutes from "./DashboardRoutes";
// Lazy loaded components
const Login = lazy(() => import("../features/auth/Login"));
const AdminDashboard = lazy(() => import("../admin/AdminDashboard"));
const Signup = lazy(() => import("../features/auth/Signup"));
const ForgetPassword = lazy(() => import("../features/auth/forgetpassword"));
const ResetPassword = lazy(() => import("../features/auth/ResetPassword"));
const LoginWithGoogle = lazy(() => import("../features/auth/LoginWithGoogle"));
const NotFound = lazy(() => import("../pages/NotFound"));
const AddUserProfile = lazy(() => import("../pages/AddUserProfile"));

function AppRoutes() {
  const [otpRequested, setOtpRequested] = useState(false);
  const { user, loading } = useAuth();

  const GoogleAuthWrapper = () => (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <LoginWithGoogle />
    </GoogleOAuthProvider>
  );

  const ProtectedRoute = ({ children }) => {
    if (loading) return <LoadingSpinner/>;
    return user ? children : <Navigate to="/login" />;
  };

  const GotOtp = ({ children }) => {
    return otpRequested ? children : <Navigate to="/forgetpassword" />;
  };

  const RestrictedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    return user ? <Navigate to="/home" /> : children;
  };

  return (
    <Suspense fallback={<LoadingSpinner/>}>
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
        <Route
          path="/home/*"
          element={
            <ProtectedRoute>
              <DashboardRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-user-profile"
          element={
            <ProtectedRoute>
              <AddUserProfile userEmail={user?.email} />
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
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
