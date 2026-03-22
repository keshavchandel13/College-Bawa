import React, { useState } from "react";
import { likePost } from "../../api/post";
import CommentSection from "./CommentSection";

export default function Post({ post, isLiked, toggleLike, token }) {
  const [loadingLike, setLoadingLike] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const likepost = async (postId) => {
    if (loadingLike) return;

    setLoadingLike(true);
    toggleLike(postId);

    try {
      await likePost(postId, token);
    } catch {
      toggleLike(postId);
    }

    setLoadingLike(false);
  };

  return (
    <div className="card">

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.user.profileImage}
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="font-medium text-sm">{post.user.name}</p>
      </div>

      {/* Content */}
      {post.content && (
        <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">
          {post.content}
        </p>
      )}

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          className="w-full rounded-lg mb-3"
        />
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 text-sm">

        <button
          onClick={() => likepost(post._id)}
          className={`transition ${
            isLiked ? "text-red-500" : "text-gray-500"
          }`}
        >
          ♥ {post.likes.length}
        </button>

        <button
          onClick={() => setCommentsOpen(!commentsOpen)}
          className="text-gray-500"
        >
          💬 Comment
        </button>
      </div>

      {/* Comments */}
      {commentsOpen && (
        <div className="mt-3">
          <CommentSection postId={post._id} token={token} />
        </div>
      )}
    </div>
  );
}