import { useEffect, useRef, useState } from "react";
import TopBar from "./components/TopBar";
import FilterBar from "./components/FilterBar";
import DataTable from "./components/DataTable";
import { EmptyState, ErrorState, TableSkeleton } from "./components/States";
import type { Option, RowItem, GetResourcesResponse } from "./types";
import { getResources, searchFuncionarios } from "./services/api";
import { useQuery } from "@tanstack/react-query";
import { exportRowsToExcel } from "./utils/exportExcel";

export default function App() {
  // Filtros
  const [areaId, setAreaId] = useState("");
  const [instId, setInstId] = useState("");
  const [puestoId, setPuestoId] = useState("");
  const [nombre, setNombre] = useState("");

  // Paginación
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);

  // Tabla
  const [rows, setRows] = useState<RowItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Catálogos
  const { data: resources, isLoading: loadingResources } = useQuery<GetResourcesResponse>({
    queryKey: ["resources"],
    queryFn: getResources,
    staleTime: 5 * 60 * 1000,
  });

  const areas: Option[] = resources?.areas ?? [];
  const instituciones: Option[] = resources?.instituciones ?? [];
  const puestos: Option[] = resources?.puestos ?? [];

  // Hidratar desde URL
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const q = new URLSearchParams(window.location.search);
    setAreaId(q.get("area") || "");
    setInstId(q.get("institucion") || "");
    setPuestoId(q.get("puesto") || "");
    setNombre(q.get("nombre") || "");
    setPage(Number(q.get("page") || 1));
    setLimit(Number(q.get("limit") || 20));
  }, []);

  // Buscar (con paginación)
  const runSearch = async (nextPage = page, nextLimit = limit) => {
    setLoading(true);
    setErr(null);
    try {
      const { rows, total, page: srvPage, limit: srvLimit } = await searchFuncionarios({
        areaId: areaId || undefined,
        institucionId: instId || undefined,
        puestoId: puestoId || undefined,
        nombre: nombre || undefined,
        page: nextPage,
        limit: nextLimit,
      });

      setRows(rows);
      setTotal(total);
      setPage(srvPage);
      setLimit(srvLimit);

      // sincroniza URL
      const u = new URL(window.location.href);
      const s = new URLSearchParams();
      if (areaId) s.set("area", areaId);
      if (instId) s.set("institucion", instId);
      if (puestoId) s.set("puesto", puestoId);
      if (nombre) s.set("nombre", nombre);
      s.set("page", String(srvPage));
      s.set("limit", String(srvLimit));
      u.search = s.toString();
      window.history.replaceState({}, "", u.toString());
    } catch {
      setErr("Error al cargar resultados");
    } finally {
      setLoading(false);
    }
  };

  // Click en Buscar → reinicia a página 1
  const handleSearch = () => runSearch(1, limit);

  // Paginación
  const hasPrev = page > 1;
  const hasNext = page * limit < total;
  const first = total ? (page - 1) * limit + 1 : 0;
  const last = Math.min(page * limit, total);

  const onExportAll = async () => {
    const pageSize = Math.max(50, limit);
    const collected: RowItem[] = [];
    let p = 1;

    try {
      setLoading(true);
      setErr(null);

      while (true) {
        const res = await searchFuncionarios({
          areaId: areaId || undefined,
          institucionId: instId || undefined,
          puestoId: puestoId || undefined,
          nombre: nombre || undefined,
          page: p,
          limit: pageSize,
        });
        collected.push(...res.rows);
        const fetched = p * pageSize;
        if (fetched >= res.total || res.rows.length === 0) break;
        p++;
      }

      if (collected.length) {
        exportRowsToExcel(collected, "funcionarios_filtrados.xlsx");
      }
    } catch {
      setErr("No se pudo exportar los datos");
    } finally {
      setLoading(false);
    }
  };

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
          onSearch={handleSearch}
          searching={loading || loadingResources}
        />

        <section className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm overflow-hidden">
          {/* Barra de acciones */}
          <div className="flex flex-wrap items-center gap-2 justify-end px-4 md:px-5 py-3 border-b border-slate-200 bg-white/60">
            <button
              onClick={onExportAll}
              disabled={loading}
              className="h-9 px-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-sm disabled:opacity-50"
            >
              Exportar
            </button>
          </div>
          {err ? (
            <ErrorState onRetry={() => runSearch(page, limit)} />
          ) : loading ? (
            <TableSkeleton />
          ) : rows.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <DataTable rows={rows} />
              <footer className="flex flex-wrap items-center gap-3 justify-between border-t border-slate-200 bg-white/60 px-4 md:px-5 py-3 text-xs text-slate-600">
                <span>
                  Mostrando <b>{first}-{last}</b> de <b>{total}</b>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={!hasPrev}
                    onClick={() => runSearch(page - 1, limit)}
                    className="h-8 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <button
                    disabled={!hasNext}
                    onClick={() => runSearch(page + 1, limit)}
                    className="h-8 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </div>
              </footer>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
