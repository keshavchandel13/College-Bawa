import React from 'react';
import Logout from '../features/auth/Logout';
import Sidebar from '../components/layout/SideBar';
import '../styles/homepage/home.css';
import { Outlet } from "react-router-dom";
function Home() {
  return (
    // <div className="home-container">
    //   <Sidebar />
    //   <div className="main-content">
    //     <h1 className="welcome-text">Welcome to <span>College Bawa</span></h1>
    //     <p className="intro-text">Connect. Collaborate. Celebrate College Life! 🎓✨</p>
    //     <Logout />
    //   </div>
    // </div>
    <div style={{ display: "flex", height: "100vh" }}>
    <Sidebar />
    <div style={{ flex: 1, overflowY: "auto" }}>
      <Outlet />
    </div>
  </div>
  );
}

export default Home;
