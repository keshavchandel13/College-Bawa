import React from "react";
export default function SellForm({
  newPost, handleInputChange, handleFileChange,
  imagePreview, handleSubmit
}) {
  return (
    <form className="sell-form" onSubmit={handleSubmit}>
      <h3>List Your Item for Sale</h3>

      <label>Category:</label>
      <select name="category" value={newPost.category} onChange={handleInputChange}>
        <option value="Books">Books</option>
        <option value="Handmade Notes">Handmade Notes</option>
        <option value="Projects">Projects</option>
      </select>

      <label>Description:</label>
      <textarea
        name="description"
        value={newPost.description}
        onChange={handleInputChange}
        required
        placeholder="Describe the item..."
      />

      <label>Price ($):</label>
      <input
        type="number"
        name="price"
        value={newPost.price}
        onChange={handleInputChange}
        required
        min="1"
      />

      <label>Upload Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      />

      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Preview" className="preview-image" />
        </div>
      )}

      <button type="submit">Post Item</button>
    </form>
  );
}
