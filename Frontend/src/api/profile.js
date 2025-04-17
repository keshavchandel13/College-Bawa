import axios from "axios";

const BASE_URL = "http://localhost:5000/api/user";

// Submit user profile
export const submitUserProfile = async (formData) => {
  try {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
    });

    const res = await axios.post(`http://localhost:5000/api/user/add-user-details`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (err) {
    console.error("Submission error:", err);
    throw err;
  }
};
