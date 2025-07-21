import React from "react";
import Sidebar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar"; // import the TopBar
import "../styles/homepage/home.css";
import { Outlet } from "react-router-dom";

function Home() {
  // Dummy function for profile view change (required by TopBar)
  const handleViewChange = (view) => {
    console.log("Change to view:", view);
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f4f4f4",
        position: "relative",
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, overflowY: "auto", height: "100vh", backgroundColor: "#f4f4f4" }}>
        {/* TopBar stays fixed at the top */}
        <TopBar onViewChange={handleViewChange} />

        {/* This div adds padding-top to prevent content under TopBar */}
        <div style={{ paddingTop: "0", paddingLeft: "60px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
