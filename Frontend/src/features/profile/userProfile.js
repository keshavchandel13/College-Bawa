import axios from "axios";

// Fetch logged-in user's profile
export const userProfile = async () => {
  const res = await axios.get("/api/user/profile");
  return res.data;
};

// Get college options (requires user email)
export const getCollegeOptions = async (email) => {
  const res = await axios.post("/api/user/get-college-options", { email });
  return res.data;
};

// Submit user details + image (FormData)
export const addUserDetails = async (formData) => {
  const res = await axios.post("/api/user/add-user-details", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};
