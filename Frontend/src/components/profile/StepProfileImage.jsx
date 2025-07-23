import React, { useRef } from "react";

const StepProfileImage = ({ formData, updateFormData, onBack, onSubmit, loading  }) => {
  const dropRef = useRef(null);

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      updateFormData("profileImage", file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
     <form onSubmit={onSubmit} className="step step-profile-image">
      <h2>Step 4: Upload Profile Picture</h2>
      <div
        className="drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        ref={dropRef}
      >
        <p>Drag & drop an image here, or click to upload</p>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {formData.profileImage && (
          <img
            src={URL.createObjectURL(formData.profileImage)}
            alt="Preview"
            className="image-preview"
          />
        )}
      </div>

      <div className="step-buttons">
        <button type="button" onClick={onBack}>Back</button>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default StepProfileImage;
