import React, { useEffect, useState } from "react";
import "../styles/homepage/homefeed.css";
import CreatePostModal from "../features/homefeed/CreatePostModal";
import Story from "../features/homefeed/Story";
import Post from "../features/homefeed/Post";
import CreatePostBox from "../features/homefeed/CreatePostBox";
import { getposts } from "../api/homefeed/GetPost";

export default function HomeFeed({ token }) {
  const [likedPosts, setLikedPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
        console.log(data)
        if (data) {
          setPosts(data);
        }
      } catch (err) {
        console.log("Error occurred");
      }
    };
    getPost();
  }, [token]);
  

  return (
    <div className="home-feed-container">
      <div className="home-feed-title">College Bawa</div>

      {/* Stories Section */}
      {/* <div className="stories-container">
        {[1, 2, 3, 4].map((num) => (
          <Story key={num} num={num} />
        ))}
      </div> */}

      {/* Create Post Box */}
      <CreatePostBox openCreatePost={openCreatePost} />

      {/* Create Post Modal */}
      <CreatePostModal
        show={showModal}
        onClose={closeCreatePost}
        token={token}
      />

      {/* Posts Section */}
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
    </div>
  );
}
