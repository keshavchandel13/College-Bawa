// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/globalComponent/LoadingSpinner';
import UserProfile from '../components/profile/ProfileView';
import { getUserProfile } from '../api/profile.js';
import UserPosts from '../components/profile/UserPosts.jsx';


export default function ProfilePage({ token, onEditClick }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
     const userString = localStorage.getItem("user");
   const profileUserId = JSON.parse(userString);

  const email = JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUserProfile(token);
        setUser(userData);

      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <UserProfile user={user} setEdit={onEditClick} />
    
      <UserPosts userId={profileUserId._id}/>
    </>
  )
}
