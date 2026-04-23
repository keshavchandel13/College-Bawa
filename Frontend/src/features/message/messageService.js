import api from "../../api/api";

// Fetch messages
export const fetchMessages = async (chatId) => {
  try {
    const res = await api.get(`/api/messages/${chatId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

// Send message
export const sendMessage = async (chatId, content, id) => {
  try {
    const res = await api.post(`/api/messages`, {
      chatId,
      content,
      id,
    });

    console.log("Data from backend:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};