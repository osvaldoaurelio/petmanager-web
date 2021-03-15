import api from '../services/api';

export const logInService = async ({ username, password }) => {
  const session = { username, password };
  const { data } = await api.post('sessions', { session });

  return data;
};

export const logUpService = async ({ name, username, password }) => {
  const user = { name, username, password };
  const { data } = await api.post('user_admins', { user });

  return data;
};
