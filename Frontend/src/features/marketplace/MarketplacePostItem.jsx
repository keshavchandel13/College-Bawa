import React, { useState, useEffect } from "react";
import "../../styles/marketplace/marketplacepost.css";
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
   const userString = localStorage.getItem("user");
   const user = JSON.parse(userString);

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !price || !category) {
      toast.error("Please fill in all required fields: Title, Price, Category");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("userId", user._id);

    //  match multer field name "images"
    images.forEach((img) => formData.append("images", img));

    setLoading(true);
    const result = await postMarketplaceItem(formData, token);
    setLoading(false);

    if (result) {
      toast.success("Item posted successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setLocation("");
      setImages([]);
      setPreviewImages([]);

      // clear file input
      const fileInput = document.getElementById("images-input");
      if (fileInput) fileInput.value = "";

      if (onPostSuccess) {
        onPostSuccess(result.item || result);
      }
    }
  };

  return (
    <div className="post-item-container">
      <h2 className="heading">Post an Item for Sale</h2>
      <form className="post-item-form" onSubmit={handleSubmit}>
        <label>
          Title <span className="required">*</span>
          <input
            type="text"
            placeholder="Enter item title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
          />
        </label>

        <label>
          Description
          <textarea
            placeholder="Describe your item"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            maxLength={500}
          />
        </label>

        <label>
          Price (₹) <span className="required">*</span>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </label>

        <label>
          Category <span className="required">*</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="project">Project</option>
            <option value="books">Books</option>
            <option value="gadget">Gadget</option>
          </select>
        </label>

        <label>
          Location
          <input
            type="text"
            placeholder="Enter location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label>
          Upload Images <span className="required">*</span>
          <input
            id="images-input"
            name="images" 
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
          />
        </label>

        {previewImages.length > 0 && (
          <div className="image-preview-container">
            {previewImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx + 1}`}
                className="image-preview"
              />
            ))}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Posting..." : "Post Item"}
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
}
