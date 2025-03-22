import axios from "axios";

export const fetchChats = async () => {
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
    const res = await axios.get('http://localhost:5000/api/chats', config);
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

export const accessOrCreateChat = async (userId) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(
    "http://localhost:5000/api/chats", // correct endpoint
    { userId },
    config
  );

  return res.data;
};


