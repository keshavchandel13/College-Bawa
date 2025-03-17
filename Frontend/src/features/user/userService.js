import axios from 'axios';

export const fetchUsersByQuery = async (query) => {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await axios.get(`http://localhost:5000/api/user/all-users?query=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
