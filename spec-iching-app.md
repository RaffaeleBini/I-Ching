# Especificación Técnica — App de Consultas I Ching

**Versión:** 1.0
**Fecha:** Agosto 2026
**Plataformas:** Web (fase 1) → React Native / iOS + Android (fase 2)

---

## 1. Visión general

Una aplicación minimalista y contemplativa para hacer consultas al I Ching mediante el
método tradicional de las tres monedas, con un diario personal (journaling) donde el
usuario guarda cada consulta, su pregunta, el hexagrama resultante y sus propias
reflexiones. Todo funciona **100% local**, sin cuentas ni backend: los datos viven en el
dispositivo del usuario.

**Principios de diseño:**
- Simplicidad y calma (no gamificación, no notificaciones invasivas)
- Privacidad total (nada sale del dispositivo)
- Fiel al método tradicional, pero accesible para principiantes

---

## 2. Stack tecnológico

| Capa | Fase 1 (Web) | Fase 2 (Mobile) |
|---|---|---|
| Framework UI | React 18 + TypeScript | React Native (Expo) |
| Estilos | Tailwind CSS | NativeWind (Tailwind para RN) |
| Estado | Zustand o Context API | Mismo (código compartido) |
| Almacenamiento | IndexedDB (via `idb` o `Dexie.js`) | SQLite (`expo-sqlite`) o `AsyncStorage` |
| Routing | React Router | React Navigation |
| Lógica de negocio | Paquete compartido `@iching/core` | Reutilizado sin cambios |
| Build/Deploy | Vite + Vercel/Netlify | Expo EAS Build |

**Estrategia de código compartido:** desde el día 1, separar la lógica de negocio (generación
de hexagramas, base de datos de textos, algoritmos) en un paquete independiente
(`packages/core`) sin dependencias de UI. Esto evita reescribir todo al pasar a mobile.
Estructura tipo monorepo (`pnpm workspaces` o `Turborepo`).

---

## 3. El motor de consulta (core)

### 3.1 Generación del hexagrama — método de las 3 monedas

Por cada una de las 6 líneas (de abajo hacia arriba):
1. Lanzar 3 monedas virtuales (cara = 3, cruz = 2)
2. Sumar los 3 valores → resultado entre 6 y 9:
   - **6** → Yin cambiante (▬ ✕ ▬) → se convierte en Yang
   - **7** → Yang estable (▬▬▬)
   - **8** → Yin estable (▬ ▬)
   - **9** → Yang cambiante (▬▬▬ ✕) → se convierte en Yin

2. Repetir 6 veces, construyendo el hexagrama de la línea 1 (abajo) a la línea 6 (arriba)
3. Si hay líneas cambiantes, calcular automáticamente el **hexagrama resultante**
   (el que se forma al invertir esas líneas)

### 3.2 Aleatoriedad

Usar `crypto.getRandomValues()` (Web Crypto API) en vez de `Math.random()`, para una
aleatoriedad de mejor calidad — coherente con el espíritu del oráculo.

### 3.3 Base de datos de los 64 hexagramas

**⚠️ Punto crítico de derechos de autor:** las traducciones modernas más conocidas
(Wilhelm/Baynes, Alfred Huang, etc.) están protegidas por copyright y **no se pueden usar
sin licencia**. Recomendación:
- Usar la traducción de **James Legge (1899)**, que es de dominio público, como base
- Reescribir o adaptar el lenguaje a un tono propio y moderno (no copia literal)
- Opcional: encargar una traducción/interpretación original para diferenciarse

Cada hexagrama en la base de datos debe incluir:
```
{
  numero: 1-64,
  nombre_chino: string,
  nombre_es: string,
  trigrama_superior: string,
  trigrama_inferior: string,
  simbolo_unicode: string, // ䷀ etc.
  juicio: string,          // texto general del hexagrama
  imagen: string,          // "la imagen" simbólica
  lineas: [                // texto para cada una de las 6 líneas
    { numero: 1-6, texto: string }
  ]
}
```

---

## 4. Funcionalidades (MVP)

### 4.1 Nueva consulta
- Pantalla para escribir la pregunta (opcional pero recomendado)
- Animación de lanzamiento de monedas (6 tiradas, una por línea)
- Construcción visual del hexagrama línea por línea
- Resultado: hexagrama principal + (si aplica) hexagrama de transformación
- Texto interpretativo del juicio, la imagen y las líneas cambiantes

### 4.2 Diario / Journal
- Cada consulta se guarda automáticamente con: fecha, pregunta, hexagrama(s), líneas
- Campo de texto libre para que el usuario añada su propia reflexión/interpretación
- Posibilidad de editar la nota después (ej. "cómo se cumplió")
- Listado cronológico con filtro por hexagrama o búsqueda de texto

### 4.3 Consulta de un hexagrama (modo referencia)
- Acceso libre a los 64 hexagramas sin necesidad de "consultar" (modo estudio/consulta)

### 4.4 Exportar / Backup
- Como no hay cuenta ni nube, es importante permitir exportar el diario a JSON o PDF
  (para que el usuario no pierda su historial si cambia de dispositivo)
- Importar desde archivo exportado

---

## 5. Modelo de datos local

```
Consulta {
  id: uuid
  fecha: timestamp
  pregunta: string | null
  lineas: [6 valores: 6|7|8|9]
  hexagrama_principal: number (1-64)
  hexagrama_resultante: number | null
  nota_usuario: string
  favorito: boolean
}
```

Guardado en IndexedDB (web) / SQLite (mobile), en una sola tabla `consultas`. Sin
sincronización, sin servidor.

---

## 6. Pantallas principales

1. **Inicio** — botón grande "Nueva consulta" + accesos a diario y referencia
2. **Nueva consulta** — input de pregunta → animación → resultado
3. **Resultado de consulta** — hexagrama(s), textos, campo de nota
4. **Diario** — lista de consultas pasadas
5. **Detalle de consulta pasada** — igual que resultado, pero editable
6. **Referencia de hexagramas** — grid de 64, buscador
7. **Ajustes** — exportar/importar datos, modo oscuro, idioma

---

## 7. Requisitos no funcionales

- **Offline-first**: debe funcionar sin conexión (importante también para la versión PWA)
- **PWA**: instalable desde el navegador en fase web, como paso intermedio antes de mobile
- **Accesibilidad**: contraste adecuado, tamaños de fuente ajustables, soporte lector de pantalla
- **Idiomas**: español como base; diseñar strings preparados para i18n desde el inicio
- **Rendimiento**: animación de monedas fluida pero opcional (permitir "saltar animación")

---

## 8. Roadmap sugerido

| Fase | Contenido |
|---|---|
| **1. MVP Web** | Consulta + resultado + diario local + 64 hexagramas (referencia) |
| **2. PWA** | Instalable, offline, exportar/importar |
| **3. Mobile (RN)** | Reutilizar `@iching/core`, adaptar UI a NativeWind |
| **4. Mejoras** | Modo tallos de milenrama, temas visuales, notificación diaria opcional de reflexión |

---

## 9. Preguntas abiertas para siguiente iteración

- ¿Se quiere monetizar (versión gratuita + premium con más traducciones/temas)?
- ¿Interfaz solo en español o multi-idioma desde el MVP?
- ¿Se desea un modo "meditación guiada" antes de la consulta (breathing/timer)?
- ¿Diseño visual: minimalista/zen, oriental tradicional, o moderno neutro?
