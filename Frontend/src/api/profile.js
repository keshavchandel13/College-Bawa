import axios from "axios";

const BASE_URL = "http://localhost:5000/api/user";

// Submit user profile
export const submitUserProfile = async (formData) => {
  try {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
    });
    const res = await axios.post(`http://localhost:5000/api/user/addUserDetails`, data, {
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

