import api from "../api";

export const getposts = async () => {
  try {
    const res = await api.get("/api/posts");
    return res.data;
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    return null;
  }
};