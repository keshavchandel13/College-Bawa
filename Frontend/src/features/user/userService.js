import axios from 'axios';

export const fetchUsersByQuery = async (token,query,currentUserId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/user/all-users?query=${query}&currentUserId=${currentUserId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
