# I Ching — App de consultas

Aplicación minimalista y contemplativa para consultas al I Ching mediante el método tradicional
de las 3 monedas, con diario personal. 100% local, sin cuentas ni backend. Ver
[`spec-iching-app.md`](./spec-iching-app.md) para la especificación completa del proyecto.

Estado actual: **primera iteración — nucleo funcional mínimo** (motor de consulta + 3 pantallas
esenciales: Nueva consulta, Resultado, Diario). Referencia de los 64 hexagramas, Ajustes
(exportar/importar), PWA y la app móvil quedan para iteraciones siguientes.

## Estructura del monorepo

```
packages/
  core/                 # @iching/core — motor de generación y modelo de datos, sin dependencias de UI/navegador
  storage-indexeddb/    # @iching/storage-indexeddb — adapter de persistencia (Dexie/IndexedDB)
apps/
  web/                  # @iching/web — app React + Vite
```

## Contenido de los 64 hexagramas

Ninguno de los dos PDF de referencia usados durante la planificación puede emplearse como fuente
de los textos interpretativos: ambos son material derivado de la traducción de Richard Wilhelm,
protegida por copyright (por eso no se versionan en este repo — ver `.gitignore`). El contenido
definitivo se redactará a partir de la traducción de **James Legge (1899, dominio público)**,
reescrita en tono propio. Por ahora:

- Los 64 hexagramas tienen sus **datos estructurales completos y verificados** (número,
  trigramas, símbolo Unicode).
- Solo los hexagramas **1 (Qián) y 2 (Kūn)** tienen contenido interpretativo real de ejemplo, en
  español, gallego e italiano.
- Los hexagramas 3-64 usan **placeholders explícitos** (`[PENDIENTE ...]`) para el nombre chino
  tradicional y el contenido interpretativo — rellenarlos es una tarea de contenido, no de
  ingeniería (ver `packages/core/src/data/hexagrams.ts`).

## Desarrollo

Requiere Node ≥20 y pnpm (usar `corepack pnpm ...` si `pnpm` no está en el PATH del sistema).

```bash
pnpm install

# Tests
pnpm --filter @iching/core test
pnpm --filter @iching/storage-indexeddb test

# Servidor de desarrollo
pnpm --filter @iching/web dev

# Build de producción
pnpm --filter @iching/web build

# Todo el monorepo
pnpm -r test
pnpm -r build
```

## Idiomas y tema

La interfaz está disponible en español, gallego e italiano (selector en la cabecera), y admite
modo claro/oscuro (también en la cabecera, respeta `prefers-color-scheme` en el primer uso). El
contenido interpretativo de los hexagramas sigue el mismo idioma seleccionado; por ahora solo los
hexagramas 1 y 2 tienen texto real en las 3 lenguas.
