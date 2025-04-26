import React, { useState } from "react";
import { submitUserProfile } from "../api/profile";
import "../styles/homepage/addUserProfile.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

const AddUserProfile = ({ onEditClick }) => {
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
    <div className="add-user-profile__container">
      <h2 className="add-user-profile__title">Complete Your Profile</h2>
      <IoIosCloseCircleOutline
        onClick={onEditClick}
        className="add-user-profile__close-icon"
      />
      <form onSubmit={handleSubmit} className="add-user-profile__form" autoComplete="">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="add-user-profile__input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="add-user-profile__input"
        />
        <input
          type="text"
          name="college"
          placeholder="College Name"
          value={formData.college}
          onChange={handleChange}
          required
          className="add-user-profile__input"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
          className="add-user-profile__input"
        />
        <textarea
          name="bio"
          placeholder="Short Bio"
          rows="3"
          value={formData.bio}
          onChange={handleChange}
          required
          className="add-user-profile__textarea"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          required
          className="add-user-profile__input"
        />
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
          required
          className="add-user-profile__file"
        />
        <button type="submit" className="add-user-profile__button">Submit</button>
      </form>
      {message && (
        <p className="add-user-profile__message">{message}</p>
      )}
    </div>
  );
};

export default AddUserProfile;
