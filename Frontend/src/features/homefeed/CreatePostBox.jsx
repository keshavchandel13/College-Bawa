import React from 'react';
import '../../styles/homepage/createpostbox.css';

import { FaPhotoVideo, FaPoll, FaSmile, FaMapMarkerAlt, FaPlus } from 'react-icons/fa';

export default function CreatePostBox({ openModal }) {
  const profilePic = localStorage.getItem("profileImage");

  return (
    <div className="post-box">
      <div className="top-section">
        <img src={profilePic || '/default.jpg'} alt="Avatar" className="avatar" />
        <textarea
          className="post-input"
          placeholder="What's happening on campus today?"
          onClick={openModal}
          readOnly
          rows={6}
        />
      </div>

      <div className="bottom-section">
        <div className="post-options-left">
          <button><FaPhotoVideo /> Photo</button>
          <button><FaPoll /> Poll</button>
          <button><FaSmile /> Feeling</button>
          <button><FaMapMarkerAlt /> Location</button>
        </div>
        <button className="post-button-right" onClick={openModal}>
          <FaPlus /> Post
        </button>
      </div>
    </div>
  );
}
