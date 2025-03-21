import React from 'react';
import AppRoutes from './routes/AppRoutes'; 
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home'; // Import Home

function App() {
  return (
    <AuthProvider>
      
      <Home />  {/* Home Component Integrated */}
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
