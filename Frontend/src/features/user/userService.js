import api from '../../api/api';
export const fetchUsersByQuery = async (query,currentUserId) => {
  try {

    const response = await api.get(`api/user/all-users?query=${query}&currentUserId=${currentUserId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
