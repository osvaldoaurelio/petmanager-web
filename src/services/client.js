import api from '../services/api';

export const listClients = async () => {
  const { data } = await api.get('clients');

  return data;
};

export const storeClient = async ({ name, cpf, address, phone }) => {
  const client = { name, cpf, address, phone };
  const { data } = await api.post('clients', { client });

  return data;
};

export const showClient = async ({ id }) => {
  const { data } = await api.get(`clients/${id}`);

  return data;
};

export const updateClient = async ({ name, cpf, address, phone }, { id }) => {
  const client = { name, cpf, address, phone };
  const { data } = await api.put(`clients/${id}`, { client });

  return data;
};

export const removeClient = async ({ id }) => {
  return await api.delete(`clients/${id}`);
};
