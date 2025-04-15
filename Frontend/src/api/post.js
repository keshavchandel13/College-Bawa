import axios from "axios";

const API_URL = "http://localhost:5000/api/posts"; // Update if backend port changes

// Create a new post
export const createPost = async (content, image, token) => {
  try {
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    const response = await axios.post(API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Let Axios automatically set the correct Content-Type
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error?.response?.data || error.message);
    return null;
  }
};

// Like a post
export const likePost = async (postId, token) => {
  try {
    const response = await axios.post(`${API_URL}/${postId}/like`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error liking post:", error?.response?.data || error.message);
  }
};

// Comment on a post
export const commentOnPost = async (postId, text, token) => {
  try {
    const response = await axios.post(`${API_URL}/${postId}/comment`, { text }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error commenting on post:", error?.response?.data || error.message);
  }
};

// Share a post
export const sharePost = async (postId, token) => {
  try {
    const response = await axios.post(`${API_URL}/${postId}/share`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error sharing post:", error?.response?.data || error.message);
  }
};
