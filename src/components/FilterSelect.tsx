import type { Option } from "../types";

export default function FilterSelect({
  value, onChange, placeholder, options, disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: Option[];
  disabled?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="h-10 w-full rounded-xl border border-slate-200/80 bg-white px-3 text-sm outline-none disabled:opacity-60 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.id} value={String(o.id)}>{o.nombre}</option>
      ))}
    </select>
  );
}
