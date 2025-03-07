import React, { createContext, useState, useContext } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Optionally store in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Optionally remove from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAuth = () => useContext(AuthContext);
