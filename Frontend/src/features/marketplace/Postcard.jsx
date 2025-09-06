import React from "react";

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <img 
        src={post.images && post.images.length > 0 ? post.images[0] : '/default-image.png'} 
        alt={post.title} 
        className="post-image" 
      />
      <div className="post-content">
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <span>₹ {post.price}</span>
        <div className="category-label">{post.category}</div>
      </div>
    </div>
  );
}
