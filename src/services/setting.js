import api from './api';

export const lastSettings = async () => {
  const { data } = await api.get('settings/last');

  return data;
};

export const storeSettings = async ({
  appointmentHalftime,
  appointmentPrice,
  maxServiceDayly,
}) => {
  const setting = {
    appointmentHalftime,
    appointmentPrice,
    maxServiceDayly,
  };
  const { data } = await api.post('settings', { setting });

  return data;
};
