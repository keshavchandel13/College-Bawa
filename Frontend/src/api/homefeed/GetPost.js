import axios from "axios";

export const getposts = async (token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }
    };
    const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts`, config);
    return res.data;
  } catch (err) {
    if(err.response && err.response.status===401 && err.response.data.message ==="Access denied: No token provided"){
      localStorage.removeItem('user')
      window.location.href = '/login'

    }
    console.error("Error occurred while fetching posts:", err.message); 
    return null;
  }
};
