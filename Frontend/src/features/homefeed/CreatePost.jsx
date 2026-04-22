import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPost } from "../../api/homefeed/makePost";
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

    try {
      await createPost({ content, imageFile });

      toast.success("Post shared successfully!");
      setContent("");
      setImageFile(null);
      setPreviewUrl(null);

      if (onPostSuccess) onPostSuccess();
    } catch (err) {
      toast.error(err || "Error creating post.");
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
      <div className="p-8 text-center bg-indigo-50/50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-slate-700">
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          Join the conversation! 🚀 <br />
          <span className="text-indigo-500 font-bold">Log in</span> to post
          updates.
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      {/* BODY */}
      <div className="mb-6">
        <textarea
          className="w-full min-h-[160px] resize-none bg-transparent outline-none text-lg sm:text-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 leading-snug font-medium"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's the tea today? ☕"
        />

        {previewUrl && (
          <div className="relative mt-4 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white hover:scale-110 transition-all z-10"
            >
              ×
            </button>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-[350px] object-cover"
            />
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
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
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-indigo-500 rounded-2xl cursor-pointer hover:bg-indigo-500 hover:text-white transition-all font-bold text-sm"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Add Media</span>
          </label>
        </div>

        <button
          onClick={handlePost}
          disabled={loading || (!content.trim() && !imageFile)}
          className={`px-8 py-3 rounded-2xl font-black uppercase tracking-tighter text-white transition-all shadow-xl
            ${
              loading || (!content.trim() && !imageFile)
                ? "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 active:scale-95 shadow-indigo-500/30"
            }`}
        >
          {loading ? "Posting..." : "Share Now"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
