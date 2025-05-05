import React from 'react';
// import '../../styles/homepage/createPostBox.css';

export default function CreatePostBox({ openModal }) {
  const profilePic = localStorage.getItem("profileImage");
  return (
    <div className="create-post-box">
      <img src={profilePic?profilePic:'/default.jpg'} alt="Your Avatar" />
      <input
        type="text"
        onClick={openModal}
        placeholder="What's on your mind?"
        readOnly
      />
      <button onClick={openModal}>Post</button>
    </div>
  );
}
