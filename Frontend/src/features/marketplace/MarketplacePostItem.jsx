import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postMarketplaceItem } from "../../api/marketplace/marketplace";

export default function MarketplacePostItem({ token, onPostSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // Image preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !price || !category) {
      toast.error("Fill required fields");
      return;
    }

    if (images.length === 0) {
      toast.error("Upload at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("userId", user._id);

    images.forEach((img) => formData.append("images", img));

    setLoading(true);
    const result = await postMarketplaceItem(formData, token);
    setLoading(false);

    if (result) {
      toast.success("Posted successfully");

      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setLocation("");
      setImages([]);
      setPreviewImages([]);

      const fileInput = document.getElementById("images-input");
      if (fileInput) fileInput.value = "";

      if (onPostSuccess) {
        onPostSuccess(result.item || result);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100 dark:bg-gray-900 transition">
      
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">

        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Post an Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Price ₹ <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select</option>
              <option value="project">Project</option>
              <option value="books">Books</option>
              <option value="gadget">Gadget</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Location
            </label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Optional"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Images <span className="text-red-500">*</span>
            </label>
            <input
              id="images-input"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 w-full text-sm text-gray-600 dark:text-gray-300"
            />
          </div>

          {/* Preview */}
          {previewImages.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {previewImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border dark:border-gray-600 hover:scale-105 transition"
                />
              ))}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition 
            ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
              }`}
          >
            {loading ? "Posting..." : "Post Item"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}