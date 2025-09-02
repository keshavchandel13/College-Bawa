import React from "react";
import Sidebar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar"; 
import "../styles/homepage/home.css";
import { Outlet } from "react-router-dom";
import MobileNav from "../components/layout/MobileNav";

function Home() {
  // Dummy function for profile view change (required by TopBar)
  const handleViewChange = (view) => {
    console.log("Change to view:", view);
  };

  return (
    <div className="home-wrapper">
      <Sidebar />
      <div className="home-content">
        {/* TopBar stays fixed at the top */}
        <TopBar onViewChange={handleViewChange} />

        {/* Content wrapper with spacing for Sidebar & TopBar */}
        <div className="home-outlet">
          <Outlet />
        </div> 
        <div>
          <MobileNav/>
        </div>
      </div>
    </div>
  );
}

export default Home;
