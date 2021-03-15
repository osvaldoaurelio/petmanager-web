import { create } from 'axios';

const api = create({
  baseURL: 'http://localhost:3010/api',
});

export default api;
