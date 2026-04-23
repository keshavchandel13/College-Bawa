import api from './api'


// Submit user profile
export const submitUserProfile = async (formData) => {
  try {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    const res = await api.post(`/api/user/addUserDetails`, data);

    return res.data;
  } catch (err) {
    console.error("Submission error:", err);
    throw err;
  }
};

// Get User Profile
export const getUserProfile = async () => {
  const userString = localStorage.getItem("user");

  if (!userString) throw new Error("No user logged in!");

  const user = JSON.parse(userString);

  const res = await api.get(`/api/user/user/${user._id}`);
  return res.data;
};
export const getUserPosts = async (userId) => {
  const res = await api.get(`/api/posts/userpost/${userId}`);
  return res.data.userPost;
};

export const deletePost = async (id) => {
  const res = await api.delete(`/api/posts/${id}`);
  return res.data;
};
