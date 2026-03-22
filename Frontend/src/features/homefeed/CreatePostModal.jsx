import React from "react";
import CreatePost from "./CreatePost";

const CreatePostModal = ({ show, onClose, token }) => {
  if (!show) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-xl p-4 animate-in fade-in duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-[2.5rem] bg-white dark:bg-slate-900 border border-white/20 dark:border-slate-800 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] overflow-hidden scale-in-center"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-slate-50/50 dark:bg-slate-800/30">
          <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-white">New Post</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-slate-400 hover:text-rose-500 hover:shadow-lg transition-all"
          >
            <span className="text-2xl font-light">✕</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-2 sm:p-4">
          <CreatePost token={token} onPostSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;