import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/user`;

// Submit user profile
export const submitUserProfile = async (formData) => {
  try {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
    });
    const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/user/addUserDetails`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (err) {
    console.error("Submission error:", err);
    throw err;
  }
};
// Get User Profile
export const getUserProfile = async (token) => {
  const userString = localStorage.getItem("user");

  if (!userString) throw new Error("No user logged in!");

  const user = JSON.parse(userString);
  if (!token) throw new Error("No auth token found!");

  const res = await axios.get(`${BASE_URL}/user/${user._id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


const API = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL, 
});

// Add token from localStorage 
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getUserPosts = async (userId) => {
  const res = await API.get(`/posts/userpost/${userId}`);
  return res.data.userPost;
};

export const deletePost = async (id) => {
  const res = await API.delete(`/posts/${id}`);
  return res.data;
};


