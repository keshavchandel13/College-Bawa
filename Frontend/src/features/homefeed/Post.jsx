import React from 'react';
import '../../styles/homepage/post.css';

export default function Post({ post, isLiked, toggleLike }) {
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
        <img src={post.image} alt="Post visual" className="ig-post-image" />
      )}

      <div className="ig-post-actions">
        <button
          className={`ig-like-button ${isLiked ? "liked" : ""}`}
          onClick={() => toggleLike(post.id)}
        >
          {isLiked ? "♥" : "♡"}
        </button>
        <button className="ig-comment-button">💬</button>
      </div>

      <p className="ig-caption">
        <span className="ig-username">{post.user.name}</span> {post.content}
      </p>
    </div>
  );
}
