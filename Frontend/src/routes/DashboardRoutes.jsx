import React, { lazy, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AddUserProfile from "../pages/AddUserProfile";
import MarketPlace from "../pages/MarketPlace";
// Applying lazy loading
const Home = lazy(() => import("../pages/Home"));
const HomeFeed = lazy(() => import("../pages/HomeFeed"));
const Logout = lazy(() => import("../features/auth/Logout"));
const Profile = lazy(() => import("../pages/Profile"));
const Chat = lazy(() => import("../pages/Chat"));
const CreatePost = lazy(() => import("../pages/CreatePost"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const More = lazy(() => import("../features/more/More"));

const DashboardRoutes = () => {
  const token = localStorage.getItem("token");
  const [edit, setEdit] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<HomeFeed token={token} />} />
        <Route
          path="homefeed"
          element={<HomeFeed token={token} />}
        />
        <Route
          path="profile"
          element={
            !edit ? (
              <Profile onEditClick={() => setEdit(true)} token={token} />
            ) : (
              <AddUserProfile
                onEditClick={() => setEdit(false)}
                setEdit={setEdit}
              />
            )
          }
        />
        <Route path="chat" element={<Chat token={token} />} />
        <Route path="more" element={<More />} />
        <Route path="createpost" element={<CreatePost token={token} />} />
        <Route path="search" element={<SearchPage token={token} />} />
        <Route path="MarketPlace" element={<MarketPlace token={token} />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
