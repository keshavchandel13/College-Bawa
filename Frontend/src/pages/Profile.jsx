import React, { useState, useEffect } from "react";
import "../styles/homepage/profilepage.css";
import { FaEdit } from "react-icons/fa";
import { getUserProfile } from '../api/profile';

const Profile = ({ onEditClick , token}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading Profile...</div>;
  }

  if (!user) {
    return <div>No user profile found.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card glass-effect">
        <div className="profile-header">
          <img src={user.profileImage || '/default.jpg'} alt="Profile" className="profile-image" />
          <h2>{user.name || "No Name"}</h2>
          <p className="bio">{user.additionalDetails?.bio || "No bio added yet"}</p>
          <FaEdit className="edit-icon" onClick={onEditClick} title="Edit Profile" />
        </div>
        <div className="profile-details">
          <p><strong>Email:</strong> {user.email || "No email"}</p>
          <p><strong>College:</strong> {user.additionalDetails?.college || "College not specified"}</p>
          <p><strong>Department:</strong> {user.additionalDetails?.branch || "Branch not specified"}</p>
          <p><strong>Skills:</strong> {user.additionalDetails?.skills || "No skills added"}</p> 
        </div>
      </div>
    </div>
  );
};

export default Profile;
