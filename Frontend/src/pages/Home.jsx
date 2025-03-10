import React from 'react';
import Logout from '../features/auth/Logout';
import Sidebar from '../components/layout/SideBar';
import '../styles/homepage/home.css';

function Home() {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <h1 className="welcome-text">Welcome to <span>College Bawa</span></h1>
        <p className="intro-text">Connect. Collaborate. Celebrate College Life! 🎓✨</p>
        <Logout />
      </div>
    </div>
  );
}

export default Home;
