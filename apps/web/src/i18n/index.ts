import type { Locale } from "@iching/core";
import type { Dictionary } from "./dictionary";
import { es } from "./dictionaries/es";
import { gl } from "./dictionaries/gl";
import { it } from "./dictionaries/it";
import { useSettingsStore } from "../store/settingsStore";

const DICTIONARIES: Record<Locale, Dictionary> = { es, gl, it };

/**
 * Devuelve el diccionario completo para el idioma actual (leído de
 * settingsStore). Un solo hook, sin motor i18n externo: cada componente
 * accede a las claves como propiedades tipadas (`t.home.newConsultation`),
 * así que un error de clave es un error de compilación, no de runtime.
 */
export function useDictionary(): Dictionary {
  const locale = useSettingsStore((state) => state.locale);
  return DICTIONARIES[locale];
}

export const LOCALE_LABELS: Record<Locale, string> = {
  es: "ES",
  gl: "GL",
  it: "IT",
};
