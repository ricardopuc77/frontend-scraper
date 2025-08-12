export type Option = { id: number | string; nombre: string };

export type RowItem = {
  id: number | string;
  nombre: string;
  area: string;
  institucion: string;
  puesto: string;
};

export type GetResourceResponse = {
  areas: Option[];
  instituciones: Option[];
  puestos: Option[];
}