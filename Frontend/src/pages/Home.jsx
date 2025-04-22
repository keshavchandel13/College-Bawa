import React from "react";
import Sidebar from "../components/layout/SideBar";
import "../styles/homepage/home.css";
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: " #f4f4f4",
        position: "relative",
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, overflowY: "auto", paddingLeft: "60px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
