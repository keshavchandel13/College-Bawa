import React, { useState } from "react";
import Feed from "../components/post/Feed";
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
    <div className="flex justify-center">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-[720px] w-full mx-auto my-10 px-5 font-[Segoe_UI,sans-serif] text-gray-800 dark:text-[#e5e7eb]">

        <h1 className="text-[26px] font-bold mb-5 text-gray-900 dark:text-[#f3f4f6]">
          Create a Post
        </h1>

        {token ? (
          <div className="
            bg-white dark:bg-[#111827]
            border border-[#e5e7eb] dark:border-[#374151]
            rounded-2xl p-5
            shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.6)]
          ">
            {/* Textarea */}
            <div>
              <textarea
                id="postContent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening in your college?"
                className="
                  w-full border-none outline-none resize-none min-h-[120px]
                  text-base leading-relaxed bg-transparent
                  text-gray-900 dark:text-[#f9fafb]
                  placeholder-[#94a3b8] dark:placeholder-[#9ca3af]
                "
              />
            </div>

            {/* Image picker */}
            <div className="mt-4">
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <label
                htmlFor="imageInput"
                className="
                  inline-block px-[14px] py-2 rounded-full cursor-pointer
                  font-medium text-[#6366f1] dark:text-[#a5b4fc]
                  hover:bg-[#eef2ff] dark:hover:bg-[rgba(99,102,241,0.15)]
                  transition-colors duration-200
                "
              >
                {imageFile ? imageFile.name : "Add Photo"}
              </label>

              {previewUrl && (
                <div className="
                  mt-4 rounded-xl overflow-hidden
                  border border-[#e5e7eb] dark:border-[#374151]
                  bg-white dark:bg-[#020617]
                ">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full max-h-[350px] object-cover"
                  />
                </div>
              )}
            </div>

            {/* Post button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handlePost}
                disabled={loading}
                className="
                  bg-[#6366f1] hover:bg-[#4f46e5]
                  text-white border-none
                  px-[22px] py-2.5 rounded-full font-semibold cursor-pointer
                  transition-colors duration-200
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-[#9ca3af]">
            <p>
              Please <strong>log in</strong> to create and view posts.
            </p>
          </div>
        )}

        {/* Feed section */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2.5 text-gray-700 dark:text-[#d1d5db]">
            Recent Posts
          </h2>
          <Feed token={token} refresh={refreshFeed} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;