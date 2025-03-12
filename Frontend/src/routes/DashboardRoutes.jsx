import React,{lazy} from "react";
import { Routes, Route } from "react-router-dom";

// Applying lazy loading
const Home = lazy(()=> import ("../pages/Home"))
const HomeFeed = lazy(()=> import("../pages/HomeFeed"))
const Logout = lazy(()=> import("../features/auth/Logout"))
const Profile = lazy(()=> import("../pages/Profile"))
const Chat = lazy(()=> import("../pages/Chat"))

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
       <Route index element={<HomeFeed />} /> 
        <Route path="homefeed" element={<HomeFeed />} />
        <Route path="profile" element={<Profile />} />
        <Route path="chat" element={<Chat />} />
        <Route path="more" element={<Logout />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
