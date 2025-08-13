import { Search, AlertCircle } from "lucide-react";

export function EmptyState() {
  return (
    <div className="px-6 py-12 text-center space-y-2">
      <div className="mx-auto w-fit rounded-2xl bg-slate-100 p-3 text-slate-500">
        <Search className="size-5" />
      </div>
      <h3 className="text-base font-semibold">Sin resultados</h3>
      <p className="text-sm text-slate-600">No encontramos coincidencias para tus filtros.</p>
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="px-6 py-12 text-center space-y-2">
      <div className="mx-auto w-fit rounded-2xl bg-red-50 p-3 text-red-600">
        <AlertCircle className="size-5" />
      </div>
      <h3 className="text-base font-semibold">Ocurrió un error</h3>
      <p className="text-sm text-slate-600">No pudimos cargar los datos. Intenta nuevamente.</p>
      <div className="pt-2">
        <button
          onClick={onRetry}
          className="h-9 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 border-b border-slate-100 bg-slate-50/40" />
      ))}
    </div>
  );
}
