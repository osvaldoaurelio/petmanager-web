import api from './api';

export const listServices = async () => {
  const { data } = await api.get('services');

  return data;
};

export const getDailyServices = async () => {
  const { data } = await api.get('services/daily');

  return data;
};

export const storeService = async ({
  pet_id,
  description,
  initial_date,
  final_date,
  price,
}) => {
  const service = { pet_id, description, initial_date, final_date, price };
  const { data } = await api.post('services', { service });

  return data;
};

export const showService = async ({ id }) => {
  const { data } = await api.get(`services/${id}`);

  return data;
};

export const updateService = async (
  { pet_id, description, initial_date, final_date, price },
  { id }
) => {
  const service = { pet_id, description, initial_date, final_date, price };
  const { data } = await api.put(`services/${id}`, { service });

  return data;
};

export const removeService = async ({ id }) => {
  return await api.delete(`services/${id}`);
};
