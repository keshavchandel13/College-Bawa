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
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-5 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transition-all hover:border-indigo-500/30">
      
      {/* User Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-0.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500">
            <img
              src={post.user.profileImage}
              className="w-10 h-10 rounded-[10px] object-cover border-2 border-white dark:border-slate-900"
            />
          </div>
          <div>
            <p className="font-bold text-sm tracking-tight">{post.user.name}</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Campus Life</p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-indigo-500 p-2">•••</button>
      </div>

      {/* Content */}
      {post.content && (
        <p className="text-[15px] leading-relaxed mb-4 text-slate-700 dark:text-slate-300 font-medium">
          {post.content}
        </p>
      )}

      {/* Media */}
      {post.image && (
        <div className="relative rounded-2xl overflow-hidden mb-4 border border-slate-100 dark:border-slate-800 shadow-inner">
          <img
            src={post.image}
            className="w-full h-auto max-h-[500px] object-cover hover:scale-[1.02] transition-transform duration-700"
          />
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center gap-6 pt-2">
        <button
          onClick={() => likepost(post._id)}
          className={`flex items-center gap-2 font-bold text-sm transition-all hover:scale-110 ${
            isLiked ? "text-rose-500" : "text-slate-400"
          }`}
        >
          <span className="text-xl">{isLiked ? "❤️" : "🤍"}</span>
          {post.likes.length}
        </button>

        <button
          onClick={() => setCommentsOpen(!commentsOpen)}
          className="flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-indigo-500 transition-colors"
        >
          <span className="text-xl">💬</span>
          Comment
        </button>
      </div>

      {/* Expandable Comments */}
      {commentsOpen && (
        <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 animate-in slide-in-from-top-4 duration-300">
          <CommentSection postId={post._id} token={token} />
        </div>
      )}
    </div>
  );
}