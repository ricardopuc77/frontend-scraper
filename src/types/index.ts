export type Option = { id: number | string; nombre: string };
export type CatalogMini = { id: number | string; nombre: string };

export type FuncionarioApi = {
  id: number | string;
  nombre: string;
  area?: CatalogMini | null;
  institucion?: CatalogMini | null;
  puesto?: CatalogMini | null;
  telefono?: string | null;
  direccion?: string | null;
  created_at?: string | null;
  status?: number | null;
};

export type RowItem = {
  id: number | string;
  nombre: string;
  area: string;
  institucion: string;
  puesto: string;
  telefono?: string;
  direccion?: string;
  createdAt?: string;
  status?: number | null;
};

export type GetResourcesResponse = {
  areas: Option[];
  instituciones: Option[];
  puestos: Option[];
}