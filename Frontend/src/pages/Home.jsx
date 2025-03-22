import React from 'react';
import Sidebar from '../components/layout/SideBar';
import '../styles/homepage/home.css';
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
    <Sidebar />
    <div style={{ flex: 1, overflowY: "auto" }}>
      <Outlet />
    </div>
  </div>
  );
}

export default Home;
