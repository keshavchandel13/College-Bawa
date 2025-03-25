import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React from "react";
const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Implementing the logout logic
  const handleLogout = () => {
    // Clear user data from localStorage or sessionStorage
    localStorage.removeItem("user"); // or sessionStorage depending on your use case
    localStorage.removeItem("jwtToken"); // assuming you store token in localStorage
    
    // Call the logout function from context (if any other logic is required)
    logout();

    // Redirect user to the login page after logout
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
