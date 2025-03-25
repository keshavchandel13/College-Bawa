import axios from "axios";

export const fetchUsers = async (userId) => {
  try { 
    // Get the token from localStorage (no need to pass it as an argument)
    const token = localStorage.getItem("token");    
    // Check if token exists before making the request
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    // Make the GET request to the server with token in headers
    const res = await axios.get(`http://localhost:5000/api/chats/getuser?userId=${userId}`, config);
    // Return the data
    return res.data;
  } catch (error) {
    // Log any errors that occur
    console.error('Error fetching chats:', error);
    throw error; // You can choose to throw the error to handle it in the calling function
  }
};




// Other functions remain the same

export const createGroupChat = async (name, users) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    "/api/chat/group",
    { name, users },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const searchUsers = async (query) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(` http://localhost:5000/api/user?search=${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res.data)
  return res.data;
};

export const accessOrCreateChat = async (body, token) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/chats",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error accessing or creating chat:", error);
    throw error;
  }
};
// Get user messages 
export const getUserChats = async (userId, page = 1, limit = 10) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `http://localhost:5000/api/chats?userId=${userId}&page=${page}&limit=${limit}`,
      config
    );
    console.log(res.data)
    return res.data; 
  } catch (error) {
    console.error("Error fetching paginated chats:", error);
    throw error;
  }
};



