import React, { useState } from "react";
import { createPost } from "../../api/postApi";

const PostForm = ({ onPostCreated, token }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost = await createPost(content, image, token);
    if (newPost) {
      setContent("");
      setImage(null);
      onPostCreated(newPost.post);
    }
  };

  return (
    <div className="post-form">
      <textarea
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
};

export default PostForm;
