import React from "react";

const PostItem = ({ post, onLike, onShare, onComment }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img src={post.user.profileImage || "/default-avatar.png"} alt="Profile" />
        <h4>{post.user.name}</h4>
      </div>
      <p>{post.content}</p>
      {post.image && <img src={`${import.meta.env.VITE_APP_BACKEND_URL}${post.image}`} alt="Post" />}
      
      <div className="post-actions">
        <button onClick={() => onLike(post._id)}>👍 {post.likes.length}</button>
        <button onClick={() => onShare(post._id)}>🔄 {post.shares}</button>
      </div>

      <div className="comments">
        {post.comments.map((comment, index) => (
          <p key={index}><strong>{comment.user.name}:</strong> {comment.text}</p>
        ))}
        <input
          type="text"
          placeholder="Add a comment..."
          onKeyDown={(e) => {
            if (e.key === "Enter") onComment(post._id, e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default PostItem;
