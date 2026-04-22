import api from "../api";

export const createPost = async ({ content, imageFile }) => {
  try {
    const formData = new FormData();
    formData.append("content", content);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await api.post("/api/posts", formData);

    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};