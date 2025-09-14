import React from "react";
import "../../styles/chat/Navbar.css";

const ChatNavbar = ({ selectedUser }) => {
  return (
    <div className="chat-navbar" id="chat-navbar">
      <div className="chat-navbar-content">
        <img
          src={selectedUser?.profileImage || "/default.jpg"}
          alt="Profile"
          className="chat-navbar-image"
        />
        <span className="chat-navbar-username">
          {selectedUser?.name || "User"}
        </span>
      </div>
    </div>
  );
};

export default ChatNavbar;
