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
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 h-screen overflow-y-auto custom-scrollbar transition-all duration-300">
        
        {/* TopBar  */}
        <TopBar onViewChange={handleViewChange} />

        {/* Page Content */}
        <div className="pl-[20px] md:pl-[29px] lg:pl-[60px] transition-all duration-500 pt-1 pb-24 md:pb-8 px-4 max-w-[1600px] mx-auto">
          <Outlet />
        </div>

        {/* Mobile Navigation*/}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}

export default Home;