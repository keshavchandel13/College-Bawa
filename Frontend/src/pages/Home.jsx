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
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-slate-900 dark:text-slate-100 overflow-hidden">
      
      {/* Sidebar - Positioned as a floating unit */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 h-screen overflow-y-auto custom-scrollbar transition-all duration-300">
        
        {/* TopBar - Sticky with blur */}
        <TopBar onViewChange={handleViewChange} />

        {/* Page Content - Dynamic Padding to respect Sidebar hover state */}
        <div className="pl-[70px] md:pl-[90px] lg:pl-[270px] transition-all duration-500 pt-6 pb-24 md:pb-8 px-4 max-w-[1600px] mx-auto">
          <Outlet />
        </div>

        {/* Mobile Navigation - Only visible on small screens */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}

export default Home;