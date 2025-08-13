
# Buscador de Funcionarios — Frontend

SPA en **React + Vite + TypeScript** para consultar un directorio de funcionarios con filtros por **Área**, **Institución**, **Puesto** y **Nombre**, tabla **paginada**, resaltado por **status** y **exportación a Excel**.


---

## 📦 Stack

- **React** (Vite + TypeScript)
- **Tailwind CSS v4** (con `@tailwindcss/postcss`)
- **TanStack Query** para fetch/cache
- **Axios** para HTTP
- **lucide-react** para iconos
- **SheetJS (xlsx)** para exportar a Excel

---

## ✅ Requisitos

- **Node 20 LTS** recomendado
- Backend accesible en `http://localhost:3001/api` (o lo que definas en `.env`)
- CORS habilitado para `http://localhost:5173`

---

## 🚀 Puesta en marcha

```bash
# 1) Instalar dependencias
npm install

# 2) Variables de entorno
.env
# actualiza VITE_API_URL si aplica

# 3) Levantar en desarrollo
npm run dev
# abre http://localhost:5173
```

### Scripts
```bash
npm run dev       # desarrollo
npm run build     # build de producción
```

---

## ⚙️ Configuración de Tailwind v4

**postcss.config.js**
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

**tailwind.config.js**
```js
/** @type {{import('tailwindcss').Config}} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**src/index.css**
```css
@import "tailwindcss";
```

> Si ves el error de PostCSS sobre Tailwind, verifica que uses `@tailwindcss/postcss` como arriba.

---

## 🔌 Variables de entorno

**.env.example**
```env
VITE_API_URL=http://localhost:3001/api
```

> Reinicia `npm run dev` tras cambiar `.env`.

---

## 🔗 Endpoints usados

- **GET** `/funcionarios/getResources` → catálogos de `areas`, `instituciones`, `puestos`.
- **GET** `/funcionarios` → **paginado**: acepta `area`, `institucion`, `puesto`, `nombre`, `page`, `limit` y responde:
  ```json
  {{
    "data": [/* funcionarios */],
    "total": 92,
    "page": 1,
    "limit": 10
  }}
  ```

El frontend **mapea** objetos anidados (`area`, `institucion`, `puesto`) a strings para la tabla y formatea `created_at`.

---

## ✨ Funcionalidad

- Filtros: **Área / Institución / Puesto** (selects) + **Nombre** (input).
- **Búsqueda** manual con botón *Buscar* (sincroniza filtros a la URL).
- **Paginación** consumiendo la del backend (Prev/Sig, “Mostrando X–Y de Z”).
- **Resaltado por status**: si `status === 3` la fila se pinta **amarilla**.
- **Regla en columna Nombre**: si `status === 3` se muestra **“SIN NOMBRE”**, si no, el nombre real.
- **Exportación a Excel**:
  - *Exportar*: itera páginas del backend y exporta todo.

---

## 🗂 Estructura del código

```
src/
  components/
    DataTable.tsx        # tabla y celdas (incluye estilos por status)
    FilterBar.tsx        # filtros (selects + input + botón)
    FilterSelect.tsx     # select
    Field.tsx            # label + contenedor de input
    States.tsx           # Empty / Error / Skeleton
    TopBar.tsx           # barra superior
  services/
    api.ts               # axios + getResources/searchFuncionarios + mappers
  types/
    index.ts             # tipos (Option, RowItem, FuncionarioApi, PagedResponse)
  utils/
    exportExcel.ts       # exportRowsToExcel (SheetJS)
  App.tsx
  main.tsx
  index.css
```

---

## 🧭 Flujo

1. Cargar catálogos (`/funcionarios/getResources`).
2. Usuario ajusta filtros y pulsa **Buscar**.
3. Se llama `/funcionarios` con filtros + `page`/`limit`, se mapea y se pinta la tabla.
4. Footer muestra paginación. Acciones de **Exportar** arriba de la tabla.

---

## 🛠 Troubleshooting

- **`TypeError: crypto.hash is not a function`** → usa **Node 20 LTS**, reinstala `node_modules`.
- **No se ven estilos** → Tailwind v4: revisa `postcss.config.js`, `tailwind.config.js`, `index.css` e intenta reiniciar el dev server.
- **CORS** → habilita `origin: http://localhost:5173` en el backend.

---