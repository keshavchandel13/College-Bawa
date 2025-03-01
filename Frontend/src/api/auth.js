import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/auth";

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};

export const loginWithGoogle = async (googleToken) => {
  try {
    const res = await axios.post(`${API_URL}/google/callback`, { token: googleToken });
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Google login failed";
  }
};
