import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/marketplace`;

export const getMarketplaceItems = async (token, page = 1) => {
  const res = await axios.get(`${API_URL}?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const postMarketplaceItem = async (formData, token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(`${API_URL}/postItem`, formData, config);

    return res.data;
  } catch (error) {
    console.error("Error posting item:", error);
    toast.error(error.response?.data?.message || "Failed to post item");
    return null;
  }
};
