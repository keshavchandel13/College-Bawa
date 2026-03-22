import React, { useState } from "react";
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
      <div className="p-4 text-center text-gray-600 dark:text-gray-300">
        <p>
          Please <strong>log in</strong> to share updates with your college mates.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      {/* BODY */}
      <div className="mb-4">
        <textarea
          className="w-full min-h-[120px] sm:min-h-[150px] resize-none bg-transparent outline-none text-base sm:text-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 leading-relaxed"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening in your college?"
        />

        {previewUrl && (
          <div className="relative mt-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <button
              onClick={clearImage}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/70 text-white text-lg hover:scale-110 transition"
            >
              ×
            </button>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-[250px] sm:max-h-[350px] object-contain"
            />
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <div>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="imageUpload"
            className="flex items-center gap-2 px-4 py-2 text-indigo-500 text-sm font-medium rounded-full cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="hidden sm:inline">Media</span>
          </label>
        </div>

        <button
          onClick={handlePost}
          disabled={loading || (!content.trim() && !imageFile)}
          className={`px-5 py-2 rounded-full font-semibold text-white transition
            ${
              loading || (!content.trim() && !imageFile)
                ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 shadow-md hover:shadow-indigo-500/30"
            }`}
        >
          {loading ? "Sharing..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;