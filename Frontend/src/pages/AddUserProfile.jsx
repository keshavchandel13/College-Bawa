import React, { useState } from "react";
import { submitUserProfile } from "../api/profile";
import "../styles/homepage/addUserProfile.css";

const AddUserProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    department: "",
    bio: "",
    skills: "",
    profileImage: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await submitUserProfile(formData);
      setMessage("Profile submitted successfully!");
      console.log("API response:", response);
    } catch (err) {
      setMessage("Error submitting profile.");
    }
  };

  return (
    <div className="form-container">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="college"
          placeholder="College Name"
          value={formData.college}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <textarea
          name="bio"
          placeholder="Short Bio"
          rows="3"
          value={formData.bio}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p style={{ textAlign: "center", marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default AddUserProfile;
