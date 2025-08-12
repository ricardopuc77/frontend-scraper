import type { Option } from "../types";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

export default function FilterSelect({
  label, value, onChange, options, placeholder = "Selecciona una opción",
}: Props) {
  return (
    <label className="block">
      <span className="text-sm text-gray-700">{label}</span>
      <select
        className="mt-1 w-full border rounded-lg p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.id} value={String(o.id)}>{o.nombre}</option>
        ))}
      </select>
    </label>
  );
}