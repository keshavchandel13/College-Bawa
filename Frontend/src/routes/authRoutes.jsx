import React from 'react';
import { Routes, Route,Navigate } from 'react-router-dom'; // React Router for routes
import Login from '../features/auth/Login';              // Login component
import Signup from '../features/auth/Signup';            // Signup component
import ProtectedRoute from '../components/ProtectedRoute'; // ProtectedRoute component



function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/" element={<Navigate replace to="/login" />} />
     
    </Routes>
  );
}

export default AuthRoutes;
