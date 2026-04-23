import api from "../api";
import { toast } from "react-toastify";

// GET marketplace items
export const getMarketplaceItems = async (page = 1) => {
  try {
    const res = await api.get(`/api/marketplace?page=${page}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    return null;
  }
};

// POST marketplace item
export const postMarketplaceItem = async (formData) => {
  try {
    const res = await api.post(`/api/marketplace/postItem`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error posting item:", error);
    toast.error(error.response?.data?.message || "Failed to post item");
    return null;
  }
};