import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Router wrapper here
import AppRoutes from './routes/AppRoutes'; // Import your routing logic
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      </AuthProvider>

  );
}

export default App;
