import axios from 'axios';
const  api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BACKEND_URL}/api/auth`
});
export const googleAuth = (code) => api.get(`/google?code=${code}`);