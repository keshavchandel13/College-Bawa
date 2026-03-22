import React from "react";
import Sidebar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";
import { Outlet } from "react-router-dom";
import MobileNav from "../components/layout/MobileNav";

function Home() {
  const handleViewChange = (view) => {
    console.log("Change to view:", view);
  };

  return (
    <div className="flex bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto">

        {/* TopBar */}
        <TopBar onViewChange={handleViewChange} />

        {/* Page Content */}
        <div className="pl-[60px] md:pl-[80px] lg:pl-[250px] pt-4 px-4">
          <Outlet />
        </div>

        {/* Mobile Nav */}
        <MobileNav />
      </div>
    </div>
  );
}

export default Home;