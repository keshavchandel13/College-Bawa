import React from "react";
import { FaPhotoVideo, FaPoll, FaSmile, FaMapMarkerAlt, FaPlus } from "react-icons/fa";

export default function CreatePostBox({ openCreatePost }) {
  const profilePic = localStorage.getItem("profileImage");

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xl shadow-indigo-500/5 border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-4">
        <img
          src={profilePic || "/default.jpg"}
          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20"
        />
        <div
          onClick={openCreatePost}
          className="flex-1 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 px-6 py-3 rounded-2xl cursor-pointer text-slate-500 transition-all font-medium"
        >
          What's the tea today? ☕
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t border-slate-50 dark:border-slate-800 gap-4">
        <div className="flex gap-2">
          {[
            { icon: <FaPhotoVideo className="text-purple-500"/>, label: "Media" },
            { icon: <FaPoll className="text-orange-500"/>, label: "Poll" },
            { icon: <FaSmile className="text-yellow-500"/>, label: "Vibe" }
          ].map((item, i) => (
            <button key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-bold hover:scale-105 transition-transform active:scale-95">
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={openCreatePost}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/25 hover:brightness-110 transition-all active:scale-95"
        >
          <FaPlus size={14}/> Post
        </button>
      </div>
    </div>
  );
}