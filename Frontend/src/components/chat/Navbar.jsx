import React from "react";
import "../../styles/chat/Navbar.css";

const Navbar = ({ selectedUser }) => {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <img
          src={selectedUser?.profileImage || "/default.jpg"}
          alt="Profile"
          className="profile-image"
        />
        <span className="user-name">{selectedUser?.name || "User"}</span>
      </div>
    </div>
  );
};

export default Navbar;
