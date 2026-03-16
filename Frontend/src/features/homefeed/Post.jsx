import React, { useState } from "react";
import "../../styles/homepage/post.css";
import { likePost } from "../../api/post";

export default function Post({ post, isLiked, toggleLike, token }) {

  const [loadingLike, setLoadingLike] = useState(false);

  const likepost = async (postId) => {
    if (loadingLike) return;

    setLoadingLike(true);

    // Optimistic UI
    toggleLike(postId);

    try {
      await likePost(postId, token);
    } catch (err) {
      console.error("Like failed:", err);

      // rollback if API fails
      toggleLike(postId);
    }

    setLoadingLike(false);
  };

  return (
    <div className="ig-post">

      <div className="ig-post-header">
        <img
          src={post.user.profileImage}
          alt={`${post.user.name} avatar`}
          className="ig-avatar"
        />
        <span className="ig-username">{post.user.name}</span>
      </div>

      {post.image && (
        <img
          src={post.image}
          alt="Post visual"
          className="ig-post-image"
        />
      )}

      <div className="ig-post-actions">

        <button
          className={`ig-like-button ${isLiked ? "liked" : ""}`}
          onClick={() => likepost(post._id)}
        >
          {isLiked ? "♥" : "♡"}
        </button>

        <p>{post.likes.length}</p>

        <button className="ig-comment-button">💬</button>

      </div>

      <p className="ig-caption">
        <span className="ig-username">{post.user.name}</span> {post.content}
      </p>

    </div>
  );
}