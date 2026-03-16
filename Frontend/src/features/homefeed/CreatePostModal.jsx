import React from "react";
import CreatePost from "./CreatePost";
import "../../styles/homepage/createPostModal.css";

const CreatePostModal = ({ show, onClose, token }) => {
  if (!show) return null;

  return (
    <div className="cb-modal-overlay" onClick={onClose}>
      <div className="cb-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="cb-modal-header">
          <h2 className="cb-modal-title">Create Post</h2>
          <button className="cb-close-btn" onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="cb-modal-body">
          <CreatePost token={token} onPostSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
