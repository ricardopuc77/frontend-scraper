import type { RowItem } from "../types";

export default function DataTable({ rows }: { rows: RowItem[] }) {
  if (!rows.length) return <p className="text-sm text-gray-600">Sin resultados</p>;

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <Th>Nombre</Th><Th>Área</Th><Th>Institución</Th><Th>Puesto</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t">
              <Td>{r.nombre}</Td>
              <Td>{r.area}</Td>
              <Td>{r.institucion}</Td>
              <Td>{r.puesto}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="p-2 font-medium text-gray-700">{children}</th>
);
const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="p-2 align-top">{children}</td>
);
