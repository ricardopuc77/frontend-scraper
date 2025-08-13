import { useEffect, useRef, useState } from "react";
import TopBar from "./components/TopBar";
import FilterBar from "./components/FilterBar";
import DataTable from "./components/DataTable";
import { EmptyState, ErrorState, TableSkeleton } from "./components/States";
import type { Option, RowItem, GetResourcesResponse } from "./types";
import { getResources, searchFuncionarios } from "./services/api";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  // Filtros
  const [areaId, setAreaId] = useState("");
  const [instId, setInstId] = useState("");
  const [puestoId, setPuestoId] = useState("");
  const [nombre, setNombre] = useState("");

  // Tabla
  const [rows, setRows] = useState<RowItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Catálogos
  const { data: resources, isLoading: loadingResources, refetch: refetchResources } =
    useQuery<GetResourcesResponse>({
      queryKey: ["resources"],
      queryFn: getResources,
      staleTime: 5 * 60 * 1000,
    });

  const areas: Option[] = resources?.areas ?? [];
  const instituciones: Option[] = resources?.instituciones ?? [];
  const puestos: Option[] = resources?.puestos ?? [];

  // Hidratar filtros desde URL
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const q = new URLSearchParams(window.location.search);
    setAreaId(q.get("area") || "");
    setInstId(q.get("institucion") || "");
    setPuestoId(q.get("puesto") || "");
    setNombre(q.get("nombre") || "");
  }, []);

  // Buscar
  const runSearch = async () => {
    setLoading(true);
    setErr(null);
    try {
      const data = await searchFuncionarios({
        areaId: areaId || undefined,
        institucionId: instId || undefined,
        puestoId: puestoId || undefined,
        nombre: nombre || undefined,
      });
      setRows(data);

      const u = new URL(window.location.href);
      const s = new URLSearchParams();
      if (areaId) s.set("area", areaId);
      if (instId) s.set("institucion", instId);
      if (puestoId) s.set("puesto", puestoId);
      if (nombre) s.set("nombre", nombre);
      u.search = s.toString();
      window.history.replaceState({}, "", u.toString());
    } catch (e) {
      setErr("Error al cargar resultados");
    } finally {
      setLoading(false);
    }
  };

  // Auto-búsqueda si hay filtros en URL al cargar
  useEffect(() => {
    const hasAny =
      areaId !== "" || instId !== "" || puestoId !== "" || nombre.trim() !== "";
    if (hasAny && !loadingResources) runSearch();
  }, [loadingResources]);

  return (
    <div className="min-h-dvh bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <TopBar />

      <main className="w-full px-5 md:px-8 py-8 space-y-8">
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Funcionarios</h1>
          <p className="text-sm md:text-base text-slate-500">
            Filtra por Área, Institución, Puesto o busca por Nombre
          </p>
        </header>

        <FilterBar
          areas={areas}
          instituciones={instituciones}
          puestos={puestos}
          areaId={areaId} setAreaId={setAreaId}
          instId={instId} setInstId={setInstId}
          puestoId={puestoId} setPuestoId={setPuestoId}
          nombre={nombre} setNombre={setNombre}
          onSearch={runSearch}
          searching={loading || loadingResources}
        />

        <section className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm overflow-hidden">
          {err ? (
            <ErrorState onRetry={runSearch} />
          ) : loading ? (
            <TableSkeleton />
          ) : rows.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <DataTable rows={rows} />
              <footer className="flex items-center justify-between border-t border-slate-200 bg-white/60 px-4 md:px-5 py-3 text-xs text-slate-600">
                <span>Mostrando <b>{rows.length}</b> resultados</span>
                <div className="flex items-center gap-2">
                  <button className="h-8 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50">Anterior</button>
                  <button className="h-8 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50">Siguiente</button>
                </div>
              </footer>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
