import { Building2, MapPin, Phone, User2 } from "lucide-react";
import type { RowItem } from "../types";

export default function DataTable({ rows }: { rows: RowItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
          <tr>
            <Th>Nombre</Th>
            <Th>Área</Th>
            <Th>Institución</Th>
            <Th>Puesto</Th>
            <Th className="hidden lg:table-cell">Teléfono</Th>
            <Th className="hidden lg:table-cell">Dirección</Th>
            <Th className="hidden md:table-cell">Creado</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}
              className={`border-b ${r.status === 3
                ? "bg-amber-50 hover:bg-amber-100 ring-1 ring-amber-200"
                : "hover:bg-slate-50/60"
                }`}>
              <Td>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-sky-50 p-2 text-sky-700">
                    <User2 className="size-4" />
                  </div>
                  <div className="min-w-[200px]">
                    <div className="font-medium text-slate-900"> {r.status === 3 ? "SIN NOMBRE" : r.nombre}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <Building2 className="size-3" />
                      <span className="whitespace-normal break-words">{r.institucion}</span>
                    </div>
                  </div>
                </div>
              </Td>
              <Td>{r.area}</Td>
              <Td className="max-w-[220px] whitespace-normal break-words">{r.institucion}</Td>
              <Td>{r.puesto}</Td>
              <Td className="hidden lg:table-cell">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="size-3.5" />
                  <span>{r.telefono || "-"}</span>
                </div>
              </Td>
              <Td className="hidden lg:table-cell max-w-[320px] whitespace-normal break-words">
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="size-3.5" />
                  <span className="whitespace-normal break-words">{r.direccion || "-"}</span>
                </div>
              </Td>
              <Td className="hidden md:table-cell text-slate-600">{r.createdAt || "-"}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`text-left p-3 font-medium ${className}`}>{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`p-3 align-top ${className}`}>{children}</td>;
}
