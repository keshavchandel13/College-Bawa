import axios from "axios";

export const fetchMessages = async (chatId, token) => {
  
  const res = await axios.get(`http://localhost:5000/api/message/${chatId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const sendMessage = async (chatId, content,id, token) => {
  const res = await axios.post(
    "http://localhost:5000/api/messages",
    { chatId, content,id },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const accessOrCreateChat = async (body, token) => {
  const res = await fetch("http://localhost:5000/api/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to access or create chat");
  }

  const data = await res.json();
  return data;
};
