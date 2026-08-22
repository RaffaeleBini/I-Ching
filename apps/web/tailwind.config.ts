import type { Config } from "tailwindcss";

/**
 * Paleta zen minimalista, con tokens semánticos definidos como variables CSS
 * (ver src/styles/index.css) para que modo claro y modo oscuro se resuelvan
 * automáticamente con la clase `.dark` en <html>, sin repetir `dark:` en
 * cada componente. Grises cálidos (familia "stone") para superficies y
 * texto, y un único acento desaturado (arcilla/terracota) para elementos
 * mutantes y llamadas a la acción — sin paleta de colores vistosa, coherente
 * con el principio de calma del proyecto.
 */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-raised": "rgb(var(--color-surface-raised) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-muted": "rgb(var(--color-ink-muted) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-ink": "rgb(var(--color-accent-ink) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["'Iowan Old Style'", "'Palatino Linotype'", "Georgia", "serif"],
        sans: [
          "'Inter'",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
