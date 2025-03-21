import React, { useState } from "react";
import Logout from "../features/auth/Logout";
import Sidebar from "../components/layout/SideBar";
import "../styles/homepage/home.css";
import { Outlet } from "react-router-dom";
import PostForm from "../components/post/PostForm";
import Feed from "../components/post/Feed";

function Home() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        {/* Post Feature Added Below */}
        {token ? (
          <>
            <PostForm onPostCreated={() => window.location.reload()} token={token} />
            <Feed token={token} />
          </>
        ) : (
          <p>Please log in to view and create posts.</p>
        )}

        {/* Keeps Existing Routing */}
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
