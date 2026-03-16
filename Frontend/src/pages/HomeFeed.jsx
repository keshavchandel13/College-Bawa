import React, { useEffect, useState } from "react";
import "../styles/homepage/homefeed.css";
import CreatePostModal from "../features/homefeed/CreatePostModal";
import Post from "../features/homefeed/Post";
import CreatePostBox from "../features/homefeed/CreatePostBox";
import { getposts } from "../api/homefeed/GetPost";
import Suggestion from "../features/homefeed/Suggestion";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileSidebar from "../components/layout/MobileSideBar";
import { useAuth } from "../context/AuthContext";

export default function HomeFeed({ token }) {

  const { user } = useAuth();
  const userId = user?._id;

  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const openCreatePost = () => setShowModal(true);
  const closeCreatePost = () => setShowModal(false);

  const toggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id !== postId) return post;

        const alreadyLiked = post.likes.includes(userId);

        return {
          ...post,
          likes: alreadyLiked
            ? post.likes.filter((id) => id !== userId)
            : [...post.likes, userId],
        };
      })
    );
  };

  useEffect(() => {

    const fetchPosts = async () => {
      try {

        const data = await getposts(token);

        if (data) {
          setPosts(data);
        }

      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

  }, [token]);

  if (loading) {
    return <div className="home-feed-container">Loading feed...</div>;
  }

  return (
    <div className="home-feed-container">

      <div className="home-feed-header">
        <div className="home-feed-title">College Bawa</div>

        <div
          className="hamburger"
          onClick={() => setIsSidebarOpen(true)}
        >
          <GiHamburgerMenu />
        </div>
      </div>

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="home-feed-post-container">
        <CreatePostBox openCreatePost={openCreatePost} />
      </div>

      <CreatePostModal
        show={showModal}
        onClose={closeCreatePost}
        token={token}
      />

      <div className="post-suggestion-container">

        <div className="posts-container">

          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              isLiked={post.likes.includes(userId)}
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