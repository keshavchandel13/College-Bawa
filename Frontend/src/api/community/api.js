import api from '../../api/api';

export const fetchCommunities = (query = '', page = 1) =>
  api.get(`/api/community?query=${encodeURIComponent(query)}&page=${page}`).then(r => r.data);

export const fetchTrending = () =>
  api.get('/api/community/trending').then(r => r.data);

export const createCommunity = (payload) =>
  api.post('/api/community', payload).then(r => r.data);

export const joinCommunity = (id) =>
  api.post(`/api/community/${id}/join`).then(r => r.data);

export const leaveCommunity = (id) =>
  api.post(`/api/community/${id}/leave`).then(r => r.data);

export const fetchMessages = (id) =>
  api.get(`/api/community/${id}/messages`).then(r => r.data);

export const sendMessage = (id, content) =>
  api.post(`/api/community/${id}/messages`, { content }).then(r => r.data);