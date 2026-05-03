import api from './api';

export const getUserProfile = async () => {
  const userString = localStorage.getItem('user');
  if (!userString) throw new Error('No user logged in!');
  const user = JSON.parse(userString);
  const res = await api.get(`/api/user/user/${user._id}`);
  return res.data;
};

export const getUserStats = async (userId) => {
  const res = await api.get(`/api/user/stats/${userId}`);
  return res.data;
};

export const getUserPosts = async (userId) => {
  const res = await api.get(`/api/posts/userpost/${userId}`);
  return res.data.userPost;
};

export const deletePost = async (id) => {
  const res = await api.delete(`/api/posts/${id}`);
  return res.data;
};

export const submitUserProfile = async (formData) => {
  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => data.append(key, v));
    } else if (value !== null && value !== undefined) {
      data.append(key, value);
    }
  });
  const res = await api.post('/api/user/addUserDetails', data);
  return res.data;
};