import React, { useState } from "react";
import { createPost } from "../../api/post";

const PostForm = ({ onPostCreated, token }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Post content cannot be empty!");
      return;
    }

    setLoading(true); // Set loading to true while the post is being created
    setError(""); // Reset error

    try {
      const newPost = await createPost(content, image, token);

      if (newPost) {
        setContent("");
        setImage(null);
        onPostCreated(newPost.post);
      } else {
        setError("Failed to create the post. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Reset loading once the process is done
    }
  };

  return (
    <div className="post-form">
      <textarea
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      {error && <div className="error-message">{error}</div>}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default PostForm;
