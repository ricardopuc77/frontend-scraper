import { useState } from "react";
import FilterBar from "./components/FilterBar";
import DataTable from "./components/DataTable";
import type { GetResourceResponse, Option, RowItem } from "./types";
import api, { getResources } from "./services/api";
import { useQuery } from "@tanstack/react-query";

export default function App() {

  // Filtros
  const [areaId, setAreaId] = useState("");
  const [instId, setInstId] = useState("");
  const [puestoId, setPuestoId] = useState("");
  const [nombre, setNombre] = useState("");

  // Datos de la tabla
  const [rows, setRows] = useState<RowItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Traer catalogos
  const {
    data: resources,
    isLoading: loadingResources,
    error: resourcesError,
  } = useQuery<GetResourceResponse>({
    queryKey: ["resources"],
    queryFn: getResources,
    staleTime: 5 * 60 * 1000,
  });
  const handleSearch = async () => {

  };

  // si no llega data, inicializar como vacio
  const areas: Option[] = resources?.areas || [];
  const instituciones: Option[] = resources?.instituciones || [];
  const puestos: Option[] = resources?.puestos || [];

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Funcionarios</h1>
        <p className="text-gray-600 text-sm">Filtra por Área, Institución y Puesto</p>
      </header>

      {resourcesError && (
        <p className="text-red-600">
          No se pudieron cargar los catálogos
        </p>
      )}
      <FilterBar
        areaId={areaId} setAreaId={setAreaId} areas={areas}
        instId={instId} setInstId={setInstId} instituciones={instituciones}
        puestoId={puestoId} setPuestoId={setPuestoId} puestos={puestos}
        nombre={nombre} setNombre={setNombre}
        onSearch={handleSearch}
        searching={loading || loadingResources}
      />
      {loading && <p>Cargando…</p>}
      {err && <p className="text-red-600">{err}</p>}
      {!loading && !err && <DataTable rows={rows} />}
    </main>
  );
}
