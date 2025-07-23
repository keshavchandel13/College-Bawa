import React from "react";

const ProfilePreview = ({ formData }) => {
  return (
    <div className="profile-preview">
      <h3>Live Profile Preview</h3>
      <div className="preview-card">
        {formData.profileImage && (
          <img
            src={URL.createObjectURL(formData.profileImage)}
            alt="Profile"
            className="preview-image"
          />
        )}
        <h4>{formData.name}</h4>
        <p>{formData.email}</p>
        <p>{formData.college} - {formData.department}</p>
        <p><strong>Bio:</strong> {formData.bio}</p>
        <div className="skills-preview">
          {formData.skills.map((skill, i) => (
            <span key={i} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
