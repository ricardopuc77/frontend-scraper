import * as XLSX from "xlsx";
import type { RowItem } from "../types";

const headers = [
  "Nombre",
  "Área",
  "Institución",
  "Puesto",
  "Teléfono",
  "Dirección",
  "Creado",
] as const;

type ExportRow = {
  [K in typeof headers[number]]: string;
};

function mapRows(rows: RowItem[]): ExportRow[] {
  return rows.map(r => ({
    "Nombre": r.nombre ?? "",
    "Área": r.area ?? "",
    "Institución": r.institucion ?? "",
    "Puesto": r.puesto ?? "",
    "Teléfono": r.telefono ?? "",
    "Dirección": r.direccion ?? "",
    "Creado": r.createdAt ?? "",
  }));
}

export function exportRowsToExcel(rows: RowItem[], filename = "funcionarios.xlsx") {
  const data = mapRows(rows);
  const ws = XLSX.utils.json_to_sheet(data, { header: headers as unknown as string[] });

  ws["!cols"] = [
    { wch: 60 }, // Nombre
    { wch: 60 }, // Área
    { wch: 60 }, // Institución
    { wch: 30 }, // Puesto
    { wch: 22 }, // Teléfono
    { wch: 60 }, // Dirección
    { wch: 16 }, // Creado
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Funcionarios");
  XLSX.writeFile(wb, filename);
}
