import api from "./api";
const API_URL = "/api/posts";

// Create a new post
export const createPost = async (content, image) => {
  try {
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    const response = await api.post(API_URL, formData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error?.response?.data || error.message);
    throw error;
  }
};

// Like a post
export const likePost = async (postId) => {
  try {
    const response = await api.post(`${API_URL}/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error liking post:", error?.response?.data || error.message);
    throw error;
  }
};

// Comment on a post
export const commentOnPost = async (postId, text, parentComment = null) => {
  try {
    const response = await api.post(`${API_URL}/${postId}/comment`, {
      text,
      parentComment,
    });

    return response.data;
  } catch (error) {
    console.error("Error commenting:", error?.response?.data || error.message);
    throw error;
  }
};

// Share a post
export const sharePost = async (postId) => {
  try {
    const response = await api.post(`${API_URL}/${postId}/share`);
    return response.data;
  } catch (error) {
    console.error("Error sharing post:", error?.response?.data || error.message);
    throw error;
  }
};

// Get comments
export const getComment = async (postId) => {
  try {
    const res = await api.get(`${API_URL}/${postId}/comment`);
    return res.data;
  } catch (err) {
    console.error("Error fetching comments:", err?.response?.data || err.message);
    throw err;
  }
};