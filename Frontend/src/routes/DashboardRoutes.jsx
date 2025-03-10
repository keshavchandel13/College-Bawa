import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import HomeFeed from "../pages/HomeFeed";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
       <Route index element={<HomeFeed />} /> 
        <Route path="homefeed" element={<HomeFeed />} />
        <Route path="profile" element={<Profile />} />
        {/* Add more nested routes here */}
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
