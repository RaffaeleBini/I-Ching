import { useMemo, useState } from "react";
import { getAllHexagrams } from "@iching/core";
import { useDictionary } from "../i18n";
import { useSettingsStore } from "../store/settingsStore";
import { TextInput } from "../components/ui/TextInput";
import { HexagramGridItem } from "../components/referencia/HexagramGridItem";

/**
 * Acceso libre a los 64 hexagramas sin necesidad de "consultar" (modo
 * estudio/consulta, ver spec §4.3). No depende de ninguna consulta guardada.
 */
export function ReferenciaPage() {
  const t = useDictionary();
  const locale = useSettingsStore((state) => state.locale);
  const [query, setQuery] = useState("");
  const hexagrams = useMemo(() => getAllHexagrams(), []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return hexagrams;
    return hexagrams.filter((hexagram) => {
      const nombre = hexagram.nombre[locale].toLowerCase();
      return nombre.includes(needle) || String(hexagram.numero).includes(needle);
    });
  }, [hexagrams, locale, query]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-2xl text-ink">{t.referencia.title}</h1>

      <TextInput
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t.referencia.searchPlaceholder}
        aria-label={t.referencia.searchPlaceholder}
        className="max-w-xs"
      />

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {filtered.map((hexagram) => (
          <HexagramGridItem key={hexagram.numero} hexagram={hexagram} />
        ))}
      </div>
    </div>
  );
}
