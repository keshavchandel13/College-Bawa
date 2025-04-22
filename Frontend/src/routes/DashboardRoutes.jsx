import React, { lazy, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddUserProfile from "../pages/AddUserProfile";

// Applying lazy loading
const Home = lazy(() => import("../pages/Home"));
const HomeFeed = lazy(() => import("../pages/HomeFeed"));
const Logout = lazy(() => import("../features/auth/Logout"));
const Profile = lazy(() => import("../pages/Profile"));
const Chat = lazy(() => import("../pages/Chat"));
const CreatePost = lazy(() => import("../pages/CreatePost"));


const DashboardRoutes = () => {
  const token = localStorage.getItem("token");
  const [edit, setEdit] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<HomeFeed token={token}/>} />
        <Route path="homefeed" element={<HomeFeed token={token} />} />
        <Route path="profile" element={ !edit?  <Profile onEditClick={() => setEdit(true)}/>:<AddUserProfile onEditClick={()=>setEdit(false)}/>} />
        <Route path="chat" element={<Chat token={token} />} />
        <Route path="more" element={<Logout />} />
        <Route path="createpost" element={<CreatePost token={token} />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
