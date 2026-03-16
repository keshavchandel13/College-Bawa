import React, { useState } from "react";
import Feed from "../../pages/HomeFeed";
import "../../styles/homepage/CreatePost.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = ({ token, onPostSuccess }) => {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) {
      toast.warn("Post content cannot be empty!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("content", content);
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to post");

      toast.success("Post shared successfully!");
      setContent("");
      setImageFile(null);
      setPreviewUrl(null);
      if (onPostSuccess) onPostSuccess();
    } catch (err) {
      toast.error("Error creating post.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  if (!token) {
    return (
      <div className="cb-auth-notice">
        <p>Please <strong>log in</strong> to share updates with your college mates.</p>
      </div>
    );
  }

  return (
    <div className="cb-post-composer">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      
      <div className="cb-composer-body">
        <textarea
          className="cb-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening in your college?"
        />

        {previewUrl && (
          <div className="cb-image-preview-wrapper">
            <button className="cb-clear-image" onClick={clearImage}>×</button>
            <img src={previewUrl} alt="Preview" className="cb-preview-img" />
          </div>
        )}
      </div>

      <div className="cb-composer-footer">
        <div className="cb-tool-group">
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="cb-hidden-input"
          />
          <label htmlFor="imageUpload" className="cb-tool-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>Media</span>
          </label>
        </div>

        <button 
          className="cb-primary-btn" 
          onClick={handlePost} 
          disabled={loading || (!content.trim() && !imageFile)}
        >
          {loading ? "Sharing..." : "Post to Feed"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
