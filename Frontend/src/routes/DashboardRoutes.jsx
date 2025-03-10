// src/routes/DashboardRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"; 
import Profile from "../pages/Profile";
// import Home from "../pages/Home";
// import Search from "../pages/Search";
// import Reviews from "../pages/Reviews";
// import Communities from "../pages/Communities";
// import Messages from "../pages/Messages";
// import Notifications from "../pages/Notifications";
// import CreatePost from "../pages/CreatePost";
// import UserProfile from "../pages/UserProfile";
// import MoreOptions from "../pages/MoreOptions";

const DashboardRoutes = () => {
  return (
    <Routes>
      {/* Parent Route → HomePage layout */}
      <Route path="/" element={<Home />}>
        {/* These are the nested routes that Outlet will render */}
        <Route path="profile" element={<Profile />} />
        {/* <Route path="messages" element={<Messages />} /> */}
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
