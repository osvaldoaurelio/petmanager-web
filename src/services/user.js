import api from '../services/api';

export const listUsers = async () => {
  const { data } = await api.get('users');

  return data;
};

export const storeUser = async ({ name, username, password, is_admin }) => {
  const user = { name, username, password, is_admin };
  const { data } = await api.post('users', { user });

  return data;
};

export const showUser = async ({ id }) => {
  const { data } = await api.get(`users/${id}`);

  return data;
};

export const resetPassUser = async ({ password }, { id }) => {
  const user = { password };
  const { data } = await api.put(`users/${id}/pass`, { user });

  return data;
};

export const updateUser = async ({ name }, { id }) => {
  const user = { name };
  const { data } = await api.put(`users/${id}`, { user });

  return data;
};

export const removeUser = async ({ id }) => {
  return await api.delete(`users/${id}`);
};
