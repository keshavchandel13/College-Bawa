import React from 'react';
import AppRoutes from './routes/AppRoutes'; 
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div id='root-container'>
      <AppRoutes />
    </div>
    </AuthProvider>
  );
}

export default App;
