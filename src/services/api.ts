import axios from 'axios';
import type { FuncionarioApi, GetResourcesResponse, RowItem, PagedResponse } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
});

// Helpers
const formatDate = (iso?: string | null) =>
  iso ? new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(new Date(iso)) : "";

const mapFuncionario = (f: FuncionarioApi): RowItem => ({
  id: f.id,
  nombre: f.nombre ?? "",
  area: f.area?.nombre ?? "",
  institucion: f.institucion?.nombre ?? "",
  puesto: f.puesto?.nombre ?? "",
  telefono: f.telefono ?? "",
  direccion: f.direccion ?? "",
  createdAt: formatDate(f.created_at),
  status: f.status ?? null,
});


// Endpoints
export const getResources = async () => {
  const { data } = await api.get<GetResourcesResponse>('/funcionarios/getResources');
  return data;
}

export type SearchParams = {
  areaId?: string;
  institucionId?: string;
  puestoId?: string;
  nombre?: string;
  page?: number;
  limit?: number;
};

export const searchFuncionarios = async (params: SearchParams) => {
  const { data } = await api.get<PagedResponse<FuncionarioApi>>("/funcionarios", { params });
  return {
    rows: data.data.map(mapFuncionario),
    total: data.total,
    page: data.page,
    limit: data.limit,
  };
};

export default api;