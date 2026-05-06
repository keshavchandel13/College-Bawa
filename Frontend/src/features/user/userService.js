import api from '../../api/api';

export const fetchUsersByQuery = async (
  query,
  currentUserId,
  signal,
  { page = 1, limit = 20 } = {}
) => {
  const params = new URLSearchParams({
    query: query.trim(),
    currentUserId,
    page,
    limit,
  });

  const response = await api.get(`/api/user/all-users?${params}`, { signal });
  return response.data.users;
};