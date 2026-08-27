import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSettingsStore } from "../store/settingsStore";
import { AppHeader } from "./AppHeader";

/** Aplica la clase `.dark` en <html> según el tema activo (ver tailwind.config.ts: darkMode "class"). */
function useApplyTheme() {
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
}

/**
 * Mantiene `<html lang>` sincronizado con el idioma elegido: sin esto, un
 * lector de pantalla seguiría aplicando las reglas de pronunciación del
 * idioma inicial (español) aunque la interfaz esté en gallego o italiano.
 */
function useApplyLocale() {
  const locale = useSettingsStore((state) => state.locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
}

/** Layout compartido por todas las rutas: cabecera fija + contenedor centrado con espacio en blanco. */
export function AppLayout() {
  useApplyTheme();
  useApplyLocale();

  return (
    <div className="min-h-screen bg-surface text-ink">
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}
