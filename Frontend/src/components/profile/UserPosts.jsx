import React, { useEffect, useState } from "react";
import { getUserPosts, deletePost } from "../../api/profile";
import { FiMoreVertical } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/profile/userposts.css";

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
        <div className="user-posts-container">
            <h1 className="user-posts-heading">Your Posts</h1>
            {posts.length === 0 ? (
                <p className="no-posts">No posts yet</p>
            ) : (
                <div className="posts-grid">
                    {posts.map((post) => (
                        <div key={post._id} className="post-card">
                            {/* Image */}
                            {post.image ? (
                                <img src={post.image} alt="post" className="post-image" />
                            ) : (
                                <div className="no-image">No Image</div>
                            )}

                            {/* 3-dot menu */}
                            <div className="menu-wrapper">
                                <FiMoreVertical
                                    className="menu-icon"
                                    onClick={() =>
                                        setOpenMenu(openMenu === post._id ? null : post._id)
                                    }
                                />
                                <AnimatePresence>
                                    {openMenu === post._id && (
                                        <motion.div
                                            className="menu-dropdown"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(post._id)}
                                            >
                                                Delete
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Post Content BELOW image */}
                            <div className="post-description">
                                <p>{post.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
