import { useState } from "react";
import FilterBar from "./components/FilterBar";
import DataTable from "./components/DataTable";
import type { Option, RowItem } from "./types";
import api from "./services/api";

export default function App() {

  const [areas] = useState<Option[]>([]);
  const [instituciones] = useState<Option[]>([]);
  const [puestos] = useState<Option[]>([]);
  const [areaId, setAreaId] = useState("");
  const [instId, setInstId] = useState("");
  const [puestoId, setPuestoId] = useState("");
  const [nombre, setNombre] = useState("");
  const [rows, setRows] = useState<RowItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSearch = async () => {

  };

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Funcionarios</h1>
        <p className="text-gray-600 text-sm">Filtra por Área, Institución y Puesto</p>
      </header>

      <FilterBar
        areaId={areaId} setAreaId={setAreaId} areas={areas}
        instId={instId} setInstId={setInstId} instituciones={instituciones}
        puestoId={puestoId} setPuestoId={setPuestoId} puestos={puestos}
        nombre={nombre} setNombre={setNombre}
        onSearch={() => console.log("Buscar")}
      />
      <DataTable rows={rows} />
    </main>
  );
}
