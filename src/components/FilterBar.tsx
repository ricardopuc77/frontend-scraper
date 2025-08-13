import { Search, Filter as FilterIcon } from "lucide-react";
import type { Option } from "../types";
import { Field } from "./Field";
import FilterSelect from "./FilterSelect";

export default function FilterBar({
  areas, instituciones, puestos,
  areaId, setAreaId, instId, setInstId, puestoId, setPuestoId,
  nombre, setNombre, onSearch, searching,
}: {
  areas: Option[]; instituciones: Option[]; puestos: Option[];
  areaId: string; setAreaId: (v: string) => void;
  instId: string; setInstId: (v: string) => void;
  puestoId: string; setPuestoId: (v: string) => void;
  nombre: string; setNombre: (v: string) => void;
  onSearch: () => void; searching?: boolean;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-4 md:p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sky-700 mb-3">
        <FilterIcon className="size-4" />
        <span className="text-xs font-medium uppercase tracking-wide">Filtros</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
        <Field label="Área" className="md:col-span-3">
          <FilterSelect
            value={areaId}
            onChange={setAreaId}
            placeholder="Todas"
            options={areas}
          />
        </Field>

        <Field label="Institución" className="md:col-span-3">
          <FilterSelect
            value={instId}
            onChange={setInstId}
            placeholder="Todas"
            options={instituciones}
          />
        </Field>

        <Field label="Puesto" className="md:col-span-3">
          <FilterSelect
            value={puestoId}
            onChange={setPuestoId}
            placeholder="Todos"
            options={puestos}
          />
        </Field>

        <Field label="Nombre" className="md:col-span-2">
          <input
            type="text"
            placeholder="Ej. Joaquín"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") onSearch(); }}
            className="h-10 w-full rounded-xl border border-slate-200/80 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
          />
        </Field>

        <div className="md:col-span-1 flex items-end">
          <button
            type="button"
            onClick={onSearch}
            disabled={searching}
            className="h-10 w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 text-white px-4 text-sm font-medium hover:bg-sky-700 active:bg-sky-800 disabled:opacity-60 transition-colors"
          >
            <Search className="size-4" />
            {searching ? "Buscando…" : "Buscar"}
          </button>
        </div>
      </div>
    </section>
  );
}
