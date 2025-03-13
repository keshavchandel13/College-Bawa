import React from 'react';
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
