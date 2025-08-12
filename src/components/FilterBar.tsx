import FilterSelect from "./FilterSelect";
import type { Option } from "../types";

type Props = {
  areaId: string; setAreaId: (v: string) => void; areas: Option[];
  instId: string; setInstId: (v: string) => void; instituciones: Option[];
  puestoId: string; setPuestoId: (v: string) => void; puestos: Option[];
  nombre: string; setNombre: (v: string) => void;
  onSearch: () => void;
  searching?: boolean;
};

export default function FilterBar({
  areaId, setAreaId, areas,
  instId, setInstId, instituciones,
  puestoId, setPuestoId, puestos,
  nombre, setNombre, onSearch, searching = false,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <FilterSelect label="Área" value={areaId} onChange={setAreaId} options={areas} disabled={searching} />
      <FilterSelect label="Institución" value={instId} onChange={setInstId} options={instituciones} disabled={searching} />
      <FilterSelect label="Puesto" value={puestoId} onChange={setPuestoId} options={puestos} disabled={searching} />
      <label className="block md:col-span-2">
        <span className="text-sm text-gray-700">Nombre</span>
        <input
          type="text"
          placeholder="Ej. Juan Pérez"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") onSearch(); }}
          className="mt-1 w-full border rounded-lg p-2"
        />
      </label>

      <div className="md:col-span-1 flex items-end">
        <button
          type="button"
          onClick={onSearch}
          disabled={searching}
          className="w-full md:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-60"
        >
          {searching ? "Buscando…" : "Buscar"}
        </button>
      </div>
    </div>
  );
}
