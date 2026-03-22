import React, { useState } from 'react';
import { FaHeart, FaRegComment, FaShare, FaUser } from 'react-icons/fa';

export function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="
      bg-white dark:bg-[#1f2937]
      border border-[#e5e7eb] dark:border-[#374151]
      rounded-2xl p-5
      shadow-[0_2px_8px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.5)]
      hover:-translate-y-1 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_6px_16px_rgba(0,0,0,0.6)]
      transition-all duration-300
      flex flex-col gap-4
    ">
      {/* Header: avatar + name + timestamp */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="
          w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
          bg-gradient-to-br from-[#3b82f6] to-[#9333ea]
        ">
          <FaUser className="text-white text-sm" />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-tight">
            Anonymous Student
          </p>
          <p className="text-xs text-[#9ca3af] dark:text-gray-500 mt-0.5">
            {post.timestamp}
          </p>
        </div>
      </div>

      {/* Post content */}
      <div className="text-sm text-[#374151] dark:text-[#d1d5db] leading-relaxed">
        {post.content}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-1 border-t border-[#f3f4f6] dark:border-[#374151]">
        {/* Like */}
        <button
          onClick={handleLike}
          className={`
            flex items-center gap-1.5 text-sm font-medium
            transition-colors duration-200 cursor-pointer
            border-none bg-transparent
            ${liked
              ? 'text-rose-500 dark:text-rose-400'
              : 'text-[#6b7280] dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400'
            }
          `}
        >
          <FaHeart className={`w-4 h-4 transition-transform duration-150 ${liked ? 'scale-110' : ''}`} />
          <span>{likeCount}</span>
        </button>

        {/* Comment */}
        <button className="
          flex items-center gap-1.5 text-sm font-medium
          text-[#6b7280] dark:text-gray-400
          hover:text-[#3b82f6] dark:hover:text-blue-400
          transition-colors duration-200 cursor-pointer
          border-none bg-transparent
        ">
          <FaRegComment className="w-4 h-4" />
          <span>{post.comments}</span>
        </button>

        {/* Share */}
        <button className="
          flex items-center gap-1.5 text-sm font-medium
          text-[#6b7280] dark:text-gray-400
          hover:text-[#9333ea] dark:hover:text-purple-400
          transition-colors duration-200 cursor-pointer
          border-none bg-transparent
        ">
          <FaShare className="w-4 h-4" />
          <span>{post.shares}</span>
        </button>
      </div>
    </div>
  );
}