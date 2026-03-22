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
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Curating your feed...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Mobile Title Bar */}
      <div className="md:hidden flex items-center justify-between py-4 mb-4">
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          College Bawa
        </h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-indigo-500/10 text-xl"
        >
          <GiHamburgerMenu />
        </button>
      </div>

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Layout Grid */}
      <div className="flex justify-center gap-10">
        
        {/* Feed Column */}
        <div className="w-full max-w-2xl space-y-8 pb-10">
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <CreatePostBox openCreatePost={openCreatePost} />
          </div>

          <div className="space-y-6">
            {posts.map((post, index) => (
              <div 
                key={post._id} 
                className="animate-in fade-in slide-in-from-bottom-6 duration-700" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Post
                  post={post}
                  isLiked={post.likes.includes(userId)}
                  toggleLike={toggleLike}
                  token={token}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Suggestions */}
        <div className="hidden xl:block w-[350px] sticky top-24 h-fit space-y-6">
          <Suggestion />
          
          {/* Footer Links (Gen-Z Style) */}
          <div className="px-6 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="hover:text-indigo-500 cursor-pointer transition-colors">About</span>
            <span className="hover:text-indigo-500 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-indigo-500 cursor-pointer transition-colors">Terms</span>
            <span className="text-slate-200 dark:text-slate-800">© 2026 CB Corp</span>
          </div>
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