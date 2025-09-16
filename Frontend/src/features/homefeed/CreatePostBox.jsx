import React from 'react';
import '../../styles/homepage/createpostbox.css';

import { FaPhotoVideo, FaPoll, FaSmile, FaMapMarkerAlt, FaPlus } from 'react-icons/fa';

export default function CreatePostBox({ openCreatePost }) {
  const profilePic = localStorage.getItem("profileImage");

  return (
    <div className="homefeed-post-box">
      <div className="top-section">
        <img src={profilePic || '/default.jpg'} alt="Avatar" className="avatar" />
        <textarea
          className="post-input"
          placeholder="What's happening on campus today?"
          onClick={openCreatePost}
          readOnly
          rows={6}
        />
      </div>

      <div className="bottom-section">
        <div className="post-options-left">
          <button className="photo-btn"><FaPhotoVideo className="icon" /> Photo</button>
          <button className="poll-btn"><FaPoll className="icon" /> Poll</button>
          <button className="feeling-btn"><FaSmile className="icon" /> Feeling</button>
          <button className="location-btn"><FaMapMarkerAlt className="icon" /> Location</button>
        </div>
        <button className="post-button-right" onClick={openCreatePost}>
          <FaPlus className="icon" /> Post
        </button>
      </div>
    </div>
  );
}
