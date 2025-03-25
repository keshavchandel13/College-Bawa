import axios from "axios";

export const fetchMessages = async (chatId, token) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/messages/${chatId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const sendMessage = async (chatId, content, id, token) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/messages",
      { chatId, content, id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};


