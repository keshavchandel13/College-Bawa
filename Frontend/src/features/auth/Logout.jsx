import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React from "react";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwtToken");
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "6px 12px",
        backgroundColor: "#1565c0",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontSize: "10px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#0d47a1")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#1565c0")}
    >
      Logout
    </button>
  );
};

export default Logout;
