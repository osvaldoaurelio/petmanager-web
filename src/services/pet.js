import api from './api';

export const listPets = async () => {
  const { data } = await api.get('pets');

  return data;
};

export const storePet = async ({
  client_id,
  name,
  species,
  breed,
  description,
  gender,
}) => {
  const pet = { client_id, name, species, breed, description, gender };
  const { data } = await api.post('pets', { pet });

  return data;
};

export const showPet = async ({ id }) => {
  const { data } = await api.get(`pets/${id}`);

  return data;
};

export const updatePet = async (
  { client_id, name, species, breed, description, gender },
  { id }
) => {
  const pet = { client_id, name, species, breed, description, gender };
  const { data } = await api.put(`pets/${id}`, { pet });

  return data;
};

export const removePet = async ({ id }) => {
  return await api.delete(`pets/${id}`);
};
