import React, { useState } from "react";
import Feed from "../components/post/Feed";
import "../styles/createpost/CreatePost.css";

const CreatePost = ({ token }) => {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null); // File to send to backend
  const [previewUrl, setPreviewUrl] = useState(null); // URL for preview
  const [refreshFeed, setRefreshFeed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("content", content);
    if (imageFile) {
      console.log("🖼️ Image file:", imageFile);
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, 
      });

      if (!response.ok) {
        throw new Error("Failed to post");
      }

      // Reset state on success
      setContent("");
      setImageFile(null);
      setPreviewUrl(null);
      setRefreshFeed((prev) => !prev);
    } catch (err) {
      alert("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("📥 Selected file:", file);
      setImageFile(file); // File for backend
      setPreviewUrl(URL.createObjectURL(file)); // Blob for preview
    }
  };

  return (
    <div className="create-post-container">
      <h1 className="create-post-heading"> Create a Post</h1>

      {token ? (
        <>
          <div className="post-box">
            {/* Text Input */}
            <div className="post-text-area">
              <label htmlFor="postContent">Write something</label>
              <textarea
                id="postContent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
              />
            </div>

            {/* Image Upload & Preview */}
            <div className="preview-section">
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              {previewUrl && (
                <div className="image-preview">
                  <img src={previewUrl} alt="Preview" className="preview-img" />
                </div>
              )}
            </div>

            {/* Post Button */}
            <div className="post-btn-wrapper">
              <button
                className="post-btn"
                onClick={handlePost}
                disabled={loading}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>

        </>
      ) : (
        <div className="login-message">
          <p>Please <strong>log in</strong> to create and view posts.</p>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
