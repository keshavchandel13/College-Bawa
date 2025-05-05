import React, { useEffect, useState } from "react";
// import '../../styles/homepage/post.css';


export default function Post({ post, isLiked, toggleLike,token }) {

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={post.user.profileImage}
          alt={`${post.user} avatar`}
          className="post-avatar"
        />
        <span className="post-user">{post.user.name}</span>
      </div>
      <p className="post-caption">{post.content}</p>
      {post.image && (
        <img src={post.image} alt="Post visual" className="post-image" />
      )}
      <div className="post-actions">
        <button
          className={`post-action-button ${isLiked ? "liked" : ""}`}
          onClick={() => toggleLike(post.id)}
        >
          {isLiked ? "Liked" : "Like"}
        </button>
        <button className="post-action-button">Comment</button>
      </div>
    </div>
  );
}
