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
          <img src={user.profileImage} alt="Profile" className="profile-image" />
          <h2>{user.name}</h2>
          <p className="bio">{user.bio}</p>
          <FaEdit className="edit-icon" onClick={onEditClick} title="Edit Profile" />
        </div>
        <div className="profile-details">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>College:</strong> {user.additionalDetails.college}</p>
          <p><strong>Department:</strong> {user.additionalDetails.branch}</p>
          <p><strong>Skills:</strong> {user.additionalDetails.skills}</p> 

        </div>
      </div>
    </div>
  );
};

export default Profile;
