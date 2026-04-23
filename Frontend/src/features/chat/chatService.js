import api from "../../api/api";

// Fetch users for chat
export const fetchUsers = async (userId) => {
  try {
    const res = await api.get(`/api/chats/getuser`, {
      params: { userId },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};

// Create group chat
export const createGroupChat = async (name, users) => {
  const res = await api.post(`/api/chat/group`, { name, users });
  return res.data;
};

// Search users
export const searchUsers = async (query) => {
  const res = await api.get(`/api/user`, {
    params: { search: query },
  });
  return res.data;
};

// Access or create chat
export const accessOrCreateChat = async (body) => {
  try {
    const res = await api.post(`/api/chats`, body);
    return res.data;
  } catch (error) {
    console.error("Error accessing or creating chat:", error);
    throw error;
  }
};

// Get user chats (paginated)
export const getUserChats = async (userId, selectedUserId, page = 1, limit = 10) => {
  try {
    const res = await api.get(`/api/chats`, {
      params: { userId, selectedUserId, page, limit },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching paginated chats:", error);
    throw error;
  }
};