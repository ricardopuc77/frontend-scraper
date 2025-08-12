import axios from 'axios';
import type { GetResourceResponse } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
});

export const getResources = async () => {
  const { data } = await api.get<GetResourceResponse>('/funcionarios/getResources');
  return data;
}

export default api;