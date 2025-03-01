import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import AuthRoutes from './routes/AuthRoutes';  // Authentication routes component

function App() {
  return (
  <AuthRoutes/>
  );
}

export default App;
