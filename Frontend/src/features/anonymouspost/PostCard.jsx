import React, { useState } from 'react';
import { FaHeart, FaRegComment, FaShare, FaUser } from 'react-icons/fa';
import '../../styles/anonymouspost/postcard.css';

export function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="pc-post-card">
      <div className="pc-post-header">
        <div className="pc-avatar">
          <FaUser className="pc-avatar-icon" />
        </div>
        <div>
          <p className="pc-author">Anonymous Student</p>
          <p className="pc-timestamp">{post.timestamp}</p>
        </div>
      </div>

      <div className="pc-post-content">
        {post.content}
      </div>

      <div className="pc-post-actions">
        <button 
          className={`pc-action-button ${liked ? 'liked' : ''}`} 
          onClick={handleLike}
        >
          <FaHeart className="pc-icon" />
          <span>{likeCount}</span>
        </button>

        <button className="pc-action-button">
          <FaRegComment className="pc-icon" />
          <span>{post.comments}</span>
        </button>

        <button className="pc-action-button">
          <FaShare className="pc-icon" />
          <span>{post.shares}</span>
        </button>
      </div>
    </div>
  );
}
