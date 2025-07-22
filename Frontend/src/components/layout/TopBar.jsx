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
  console.log(user)
  return (
    <div className="topbar">
      <div className="topbar-search">
  <FiSearch className="search-icon" />
  <input
    type="text"
    placeholder="Search posts, people, groups..."
    className="search-input"
  />
</div>


      <div className="topbar-actions">
        <div className="icon-button">
          <Link to={"/home/chat"} style={{ textDecoration: 'none' }}> <FiMessageCircle className="icon" /></Link>
          
          <span className="badge">3</span>
        </div>

        <div className="icon-button">
          <FiBell className="icon" />
          <span className="badge">2</span>
        </div>

        <div className="dropdown">
          <button className="user-button">
            <img
              src={profilePic || '/default-avatar.png'} 
              alt="Avatar"
              className="avatar"
            />
            <div className="user-info">
               <Link to={"/home/profile"} style={{ textDecoration: 'none' }}><p className="user-name">{user.name}</p></Link>

              <p className="user-role">{user.additionalDetails.branch}</p>
            </div>
          </button>
          <div className="dropdown-content">
            <div className="dropdown-item" onClick={() => onViewChange('profile')}>
               <Link to={"/home/profile"} style={{ textDecoration: 'none' }}> <FiUser className="menu-icon" /> Profile </Link>
            </div>
            <div className="dropdown-item">
              <FiSettings className="menu-icon" /> Settings
            </div>
            <div className="dropdown-separator"></div>
            <div className="dropdown-item logout"><Logout/></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
