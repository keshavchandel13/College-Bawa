import React, { useEffect, useState } from "react";
import { getUserPosts, deletePost } from "../../api/profile";
import { FiMoreVertical } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  const fetchPosts = async () => {
    try {
      const data = await getUserPosts(userId);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="w-full py-5 text-center dark:text-[#f5f5f5]">

      {/* Heading with gradient underline */}
      <h1 className="
        text-[28px] font-bold mb-6 text-[#222] dark:text-[#f5f5f5]
        tracking-wide uppercase relative inline-block
        after:content-[''] after:block after:w-[60%] after:h-[3px]
        after:mx-auto after:mt-1.5
        after:bg-gradient-to-r after:from-[#ff416c] after:to-[#ff4b2b]
        after:rounded-sm
      ">
        Your Posts
      </h1>

      {posts.length === 0 ? (
        <p className="text-base text-[#666] dark:text-[#aaa] mt-5">No posts yet</p>
      ) : (
        <div className="
          grid grid-cols-3 gap-[18px] px-2.5
          max-[900px]:grid-cols-2
          max-sm:grid-cols-1
        ">
          {posts.map((post) => (
            <div
              key={post._id}
              className="
                relative bg-white dark:bg-[#2a2a2a] rounded-xl overflow-hidden
                shadow-[0_4px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.5)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_6px_15px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_6px_15px_rgba(0,0,0,0.7)]
              "
            >
              {/* Image or placeholder */}
              {post.image ? (
                <img
                  src={post.image}
                  alt="post"
                  className="w-full h-[240px] object-cover block"
                />
              ) : (
                <div className="w-full h-[240px] bg-[#ddd] dark:bg-[#444] flex items-center justify-center text-sm text-[#666] dark:text-[#bbb]">
                  No Image
                </div>
              )}

              {/* 3-dot menu */}
              <div className="absolute top-2.5 right-2.5">
                <FiMoreVertical
                  className="text-[22px] text-white cursor-pointer p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
                  onClick={() => setOpenMenu(openMenu === post._id ? null : post._id)}
                />
                <AnimatePresence>
                  {openMenu === post._id && (
                    <motion.div
                      className="absolute top-[30px] right-0 bg-white dark:bg-[#2b2b2b] rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_8px_rgba(0,0,0,0.6)] py-1.5 z-10"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="
                          bg-none border-none text-crimson text-[#dc143c] dark:text-[#ff6b6b]
                          text-sm px-4 py-2 cursor-pointer w-full text-left
                          hover:bg-[rgba(220,20,60,0.1)] dark:hover:bg-[rgba(255,107,107,0.1)]
                          transition-colors duration-200
                        "
                      >
                        Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Post content */}
              <div className="px-3.5 py-3 text-sm text-[#333] dark:text-[#ddd] text-left bg-[#fafafa] dark:bg-[#333] border-t border-[#eee] dark:border-[#444]">
                <p>{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}