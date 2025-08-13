export function Field({ label, children, className = "" }: {
  label: string; children: React.ReactNode; className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-[12px] font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}
