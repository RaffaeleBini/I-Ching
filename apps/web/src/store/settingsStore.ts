import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@iching/core";

export type Theme = "light" | "dark";

interface SettingsState {
  locale: Locale;
  theme: Theme;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

function detectPreferredTheme(): Theme {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Preferencias de usuario (idioma, tema): persistidas en localStorage, no en
 * IndexedDB — no son parte del diario de consultas, sino de la
 * configuración del dispositivo/navegador (ver plan de proyecto §4).
 * `theme` arranca respetando `prefers-color-scheme`; a partir de la primera
 * elección explícita del usuario, `persist` la recuerda y tiene prioridad.
 */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      locale: "es",
      theme: detectPreferredTheme(),
      setLocale: (locale) => set({ locale }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === "light" ? "dark" : "light" }),
    }),
    {
      name: "iching-settings",
    },
  ),
);
