import React, { useState } from "react";
import Feed from "../components/post/Feed";
import "../styles/createpost/CreatePost.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = ({ token }) => {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [refreshFeed, setRefreshFeed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) {
      toast.warn("Post content cannot be empty!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to post");
      }

      toast.success("Post created successfully!");
      setContent("");
      setImageFile(null);
      setPreviewUrl(null);
      setRefreshFeed((prev) => !prev);
    } catch (err) {
      toast.error("Something went wrong while posting.");
      console.error(err);
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

  return (
    <div className="create-post-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="create-post-heading"> Create a Post</h1>

      {token ? (
        <div className="post-box">
          <div className="post-text-area">
            <label htmlFor="postContent">Write something</label>
            <textarea
              id="postContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
            />
          </div>

          <div className="preview-section">
            {/* Hidden file input */}
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            {/* Custom styled button */}
            <label htmlFor="imageInput" className="custom-file-btn">
              {imageFile ? imageFile.name : "Choose File"}
            </label>

            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" className="preview-img" />
              </div>
            )}
          </div>

          <div className="post-btn-wrapper">
            <button className="post-btn" onClick={handlePost} disabled={loading}>
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      ) : (
        <div className="login-message">
          <p>
            Please <strong>log in</strong> to create and view posts.
          </p>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
