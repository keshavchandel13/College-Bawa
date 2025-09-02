import React, { useEffect, useState } from "react";
import "../styles/homepage/homefeed.css";
import CreatePostModal from "../features/homefeed/CreatePostModal";
import Post from "../features/homefeed/Post";
import CreatePostBox from "../features/homefeed/CreatePostBox";
import { getposts } from "../api/homefeed/GetPost";
import Suggestion from "../features/homefeed/Suggestion";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileSidebar from "../components/layout/MobileSideBar";

export default function HomeFeed({ token }) {
  const [likedPosts, setLikedPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const openCreatePost = () => setShowModal(true);
  const closeCreatePost = () => setShowModal(false);

  const toggleLike = (postId) => {
    setLikedPosts((prevLikes) =>
      prevLikes.includes(postId)
        ? prevLikes.filter((id) => id !== postId)
        : [...prevLikes, postId]
    );
  };

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await getposts(token);
        if (data) setPosts(data);
      } catch (err) {
        console.log("Error occurred");
      }
    };
    getPost();
  }, [token]);

  return (
    <div className="home-feed-container">
      <div className="home-feed-header">
        <div className="home-feed-title">College Bawa</div>
        <div className="hamburger" onClick={() => setIsSidebarOpen(true)}>
          <GiHamburgerMenu />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Create Post Box */}
      <div className="home-feed-post-container">

      <CreatePostBox openCreatePost={openCreatePost} />
      </div>

      {/* Create Post Modal */}
      <CreatePostModal show={showModal} onClose={closeCreatePost} token={token} />

      <div className="post-suggestion-container">
        <div className="posts-container">
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              likedPosts={likedPosts.includes(post._id)}
              toggleLike={toggleLike}
              token={token}
            />
          ))}
        </div>

        <div className="suggestion-container">
          <Suggestion />
        </div>
      </div>
    </div>
  );
}
