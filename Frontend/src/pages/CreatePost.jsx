import React, { useState } from "react";
import Feed from "../components/post/Feed";
import "../styles/createpost/CreatePost.css";

const CreatePost = ({ token }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // To store the selected image
  const [refreshFeed, setRefreshFeed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image); // Attach the image file to the request
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData, // Send the form data as the body
      });

      if (!response.ok) {
        throw new Error("Failed to post");
      }

      setContent(""); // Clear the textarea
      setImage(null); // Clear the selected image
      setRefreshFeed((prev) => !prev);
    } catch (err) {
      alert("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection and image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Generate a preview URL for the image
    }
  };

  return (
    <div className="create-post-container">
      <h1 className="create-post-heading">📣 Create a Post</h1>

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
              {image && (
                <div className="image-preview">
                  <img src={image} alt="Preview" className="preview-img" />
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

          <div>
            <h2 className="recent-post-heading">📰 Recent Posts</h2>
            <Feed token={token} refresh={refreshFeed} />
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
