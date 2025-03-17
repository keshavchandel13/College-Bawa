import axios from "axios";

export const fetchMessages = async (chatId, token) => {
  const res = await axios.get(`http://localhost:5000/api/message/${chatId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const sendMessage = async (chatId, content, token) => {
  const res = await axios.post(
    "http://localhost:5000/api/message",
    { chatId, content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
