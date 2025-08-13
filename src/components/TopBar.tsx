export default function TopBar() {
  return (
    <div className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="w-full px-5  px-5 md:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="https://www.yucatan.gob.mx/img/logo-yucatan.svg?v=250609" alt="logo" />
          <span className="font-semibold tracking-tight">Directorio Público</span>
        </div>
      </div>
    </div>
  );
}
