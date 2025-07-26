import React from 'react';
import {
  FiSearch,
  FiBell,
  FiMessageCircle,
  FiSettings,
  FiUser,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../../styles/SideBar/topbar.css';
import Logout from '../../features/auth/Logout';

export function TopBar({ onViewChange }) {
  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const profilePic = localStorage.getItem("profileImage");
  return (
   <div className="topbar-container">
  <div className="topbar-search">
    <FiSearch className="topbar-search-icon" />
    <input
      type="text"
      placeholder="Search posts, people, groups..."
      className="topbar-search-input"
    />
  </div>

  <div className="topbar-actions">
    <div className="topbar-icon-button">
      <Link to={"/home/chat"} style={{ textDecoration: 'none' }}>
        <FiMessageCircle className="topbar-icon" />
      </Link>
      <span className="topbar-badge">3</span>
    </div>

    <div className="topbar-icon-button">
      <FiBell className="topbar-icon" />
      <span className="topbar-badge">2</span>
    </div>

    <div className="topbar-dropdown">
      <button className="topbar-user-button">
        <img
          src={profilePic || '/default-avatar.png'}
          alt="Avatar"
          className="topbar-avatar"
        />
        <div className="topbar-user-info">
          <Link to={"/home/profile"} style={{ textDecoration: 'none' }}>
            <p className="topbar-user-name">{user.name}</p>
          </Link>
          <p className="topbar-user-role">{user.additionalDetails.branch}</p>
        </div>
      </button>
      <div className="topbar-dropdown-content">
        <div className="topbar-dropdown-item" onClick={() => onViewChange('profile')}>
          <Link to={"/home/profile"} style={{ textDecoration: 'none' }}>
            <FiUser className="menu-icon" /> Profile
          </Link>
        </div>
        <div className="topbar-dropdown-item">
          <FiSettings className="menu-icon" /> Settings
        </div>
        <div className="topbar-dropdown-separator"></div>
        <div className="topbar-dropdown-item topbar-logout">
          <Logout />
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default TopBar;
