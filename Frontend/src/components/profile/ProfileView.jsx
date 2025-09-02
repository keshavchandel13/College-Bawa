import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/profile/profileview.css";

const UserProfile = ({ user, setEdit }) => {
  const navigate = useNavigate();

  if (!user) return <div>No user profile found.</div>;

  return (
    <div className="user-profile-container">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image-wrapper">
            <img
              src={user.profileImage || "/default.jpg"}
              alt="Profile"
              className="profile-view-image"
            />
          </div>

          <div className="profile-view-info">
            <h1 className="profile-view-name">{user.name || user.email}</h1>
            <p className="profile-view-branch">{user.additionalDetails.branch}</p>
            <div className="profile-details">
              <span>🎓 {user.additionalDetails.college}</span>
            </div>
          </div>
        </div>

        {user.additionalDetails.bio && (
          <div className="profile-bio">
            <h3 className="bio-heading">Bio</h3>
            <p>{user.additionalDetails.bio}</p>
          </div>
        )}
        {user.additionalDetails.skills && (
          <div className="profile-skills">
            <h3 className="skills-heading">Skills</h3>
            <ul className="skills-list">
              {Array.isArray(user.additionalDetails.skills)
                ? user.additionalDetails.skills.map((skill, index) => (
                  <li key={index} className="skill-item">{skill}</li>
                ))
                : <li className="skill-item">{user.additionalDetails.skills}</li>
              }
            </ul>
          </div>
        )}



        <div className="stats-grid">
          <StatCard label="Posts" value={user.posts} color="blue" />
          <StatCard label="Friends" value={user.friends} color="green" />
          <StatCard label="Groups" value={user.groups} color="purple" />
          <StatCard label="Awards" value={user.awards} color="yellow" />
        </div>

        <div className="edit-profile-button-wrapper">
          <button
            onClick={() => { setEdit(true) }}
            className="edit-profile-button"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value = 0, color }) => (
  <div className="stat-card">
    <p className={`stat-value ${color}`}>{value}</p>
    <p className="stat-label">{label}</p>
  </div>
);

export default UserProfile;
