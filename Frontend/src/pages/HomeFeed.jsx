import React, { useEffect, useState } from "react";
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
        if (data) setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-700 dark:text-gray-300">
        Loading feed...
      </div>
    );
  }

return (
  <div className="min-h-screen bg-bgLight dark:bg-bgDark">

    {/* Header */}
    <div className="flex items-center justify-between px-4 md:px-6 py-4">
      <h1 className="text-xl md:text-2xl font-semibold text-primary">
        College Bawa
      </h1>

      <button
        onClick={() => setIsSidebarOpen(true)}
        className="text-2xl md:hidden"
      >
        <GiHamburgerMenu />
      </button>
    </div>

    <MobileSidebar
      isOpen={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
    />

    {/* Layout */}
    <div className="flex justify-center gap-8 px-2 md:px-6">

      {/* Feed */}
      <div className="w-full max-w-2xl space-y-5">

        <CreatePostBox openCreatePost={openCreatePost} />

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

      {/* Suggestions */}
      <div className="hidden lg:block w-[320px] sticky top-20 h-fit">
        <Suggestion />
      </div>
    </div>

    <CreatePostModal
      show={showModal}
      onClose={closeCreatePost}
      token={token}
    />
  </div>
);
}