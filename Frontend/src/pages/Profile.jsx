import React from "react";
import "../styles/homepage/profilepage.css";

const Profile = () => {
  // Simulating dummy user data (replace this with dynamic user data later)
  const user = {
    name: "Keshav Chandel",
    email: "keshav@collegebawa.com",
    college: "ABC Institute of Technology",
    department: "Computer Science",
    bio: "Passionate about tech, community building and startup culture.",
    skills: ["React", "Node.js", "MongoDB", "DSA", "UI/UX"],
    profileImage:
      "https://i.pinimg.com/736x/54/ab/8e/54ab8e32685c17305f0cbef83c6817ff.jpg", // Replace with actual user profile picture URL
  };

  return (
    <div className="profile-container">
      <div className="profile-card glass-effect">
        <div className="profile-header">
          <img src={user.profileImage} alt="Profile" className="profile-image" />
          <h2>{user.name}</h2>
          <p className="bio">{user.bio}</p>
        </div>
        <div className="profile-details">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>College:</strong> {user.college}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Skills:</strong></p>
          <ul className="skills-list">
            {user.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
