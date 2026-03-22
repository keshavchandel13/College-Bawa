import React from "react";
import {
  FaPhotoVideo,
  FaPoll,
  FaSmile,
  FaMapMarkerAlt,
  FaPlus,
} from "react-icons/fa";

export default function CreatePostBox({ openCreatePost }) {
  const profilePic = localStorage.getItem("profileImage");

  return (
    <div className="card">

      {/* Top */}
      <div className="flex items-center gap-3">
        <img
          src={profilePic || "/default.jpg"}
          className="w-11 h-11 rounded-full object-cover"
        />

        <div
          onClick={openCreatePost}
          className="flex-1 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full cursor-pointer text-sm text-gray-500 dark:text-gray-400"
        >
          What's happening on campus today?
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-wrap justify-between mt-4 gap-2">

        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-700">
            <FaPhotoVideo /> Photo
          </button>

          <button className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm flex items-center gap-1">
            <FaPoll /> Poll
          </button>

          <button className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm flex items-center gap-1">
            <FaSmile /> Feeling
          </button>

          <button className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm flex items-center gap-1">
            <FaMapMarkerAlt /> Location
          </button>
        </div>

        <button
          onClick={openCreatePost}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus /> Post
        </button>
      </div>
    </div>
  );
}