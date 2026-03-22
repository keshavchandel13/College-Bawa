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
      className="
        px-3 py-1.5 rounded-md border-none cursor-pointer
        bg-[#1565c0] hover:bg-[#0d47a1]
        text-white text-[10px] font-medium
        transition-colors duration-200
      "
    >
      Logout
    </button>
  );
};

export default Logout;