import React from "react";
import "../styles/homepage/profilepage.css";

const Profile = () => {
  const user = {
    name: "Keshav Chandel",
    email: "chandelkeshav4@gmail.com",
    college: "Jaypee University of  Information  Technology",
    department: "Computer Science",
    bio: "Passionate about tech, community building and startup culture.",
    skills: ["React", "Node.js", "MongoDB", "DSA", "UI/UX"],
    profileImage:
      "https://media.licdn.com/dms/image/v2/D5603AQEqtqiEje5g2g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718212393207?e=1747267200&v=beta&t=AzVXBRknU4N-uhW_f7Ib61L7ZmakyveqELjsEhO_Wh0",
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
