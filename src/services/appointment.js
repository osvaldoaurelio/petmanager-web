import api from './api';

export const listAppointments = async () => {
  const { data } = await api.get('appointments');

  return data;
};

export const getDailyAppointments = async () => {
  const { data } = await api.get('appointments/daily');

  return data;
};

export const storeAppointment = async ({ pet_id, description, date }) => {
  const appointment = { pet_id, description, date };
  const { data } = await api.post('appointments', { appointment });

  return data;
};

export const showAppointment = async ({ id }) => {
  const { data } = await api.get(`appointments/${id}`);

  return data;
};

export const updateAppointment = async (
  { pet_id, description, date },
  { id }
) => {
  const appointment = { pet_id, description, date };
  const { data } = await api.put(`appointments/${id}`, { appointment });

  return data;
};

export const removeAppointment = async ({ id }) => {
  return await api.delete(`appointments/${id}`);
};
