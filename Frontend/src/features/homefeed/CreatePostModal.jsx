import React from "react";
import CreatePost from "./CreatePost";

const CreatePostModal = ({ show, onClose, token }) => {
  if (!show) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl bg-cardLight dark:bg-cardDark border border-borderLight dark:border-borderDark shadow-xl"
      >

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-borderLight dark:border-borderDark">
          <h2 className="text-lg font-semibold">Create Post</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <CreatePost token={token} onPostSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;