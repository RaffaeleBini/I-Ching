import { getAllHexagrams } from "@iching/core";
import { useDictionary } from "../../i18n";
import { useSettingsStore } from "../../store/settingsStore";
import { TextInput } from "../ui/TextInput";
import { Select } from "../ui/Select";

interface DiarioFiltersProps {
  text: string;
  hexagrama: number | null;
  favoritoOnly: boolean;
  onTextChange: (text: string) => void;
  onHexagramChange: (hexagrama: number | null) => void;
  onFavoritoOnlyChange: (favoritoOnly: boolean) => void;
}

export function DiarioFilters({
  text,
  hexagrama,
  favoritoOnly,
  onTextChange,
  onHexagramChange,
  onFavoritoOnlyChange,
}: DiarioFiltersProps) {
  const t = useDictionary();
  const locale = useSettingsStore((state) => state.locale);
  const hexagrams = getAllHexagrams();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <TextInput
        type="search"
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
        placeholder={t.diario.searchPlaceholder}
        aria-label={t.diario.searchPlaceholder}
        className="sm:max-w-xs"
      />
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="diario-hexagram-filter" className="text-sm text-ink-muted">
            {t.diario.filterByHexagramLabel}
          </label>
          <Select
            id="diario-hexagram-filter"
            value={hexagrama ?? ""}
            onChange={(event) =>
              onHexagramChange(event.target.value ? Number(event.target.value) : null)
            }
          >
            <option value="">{t.diario.filterAll}</option>
            {hexagrams.map((hexagram) => (
              <option key={hexagram.numero} value={hexagram.numero}>
                {hexagram.numero} · {hexagram.nombre[locale]}
              </option>
            ))}
          </Select>
        </div>

        <label className="flex items-center gap-2 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={favoritoOnly}
            onChange={(event) => onFavoritoOnlyChange(event.target.checked)}
            className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
          />
          {t.diario.favoriteOnlyLabel}
        </label>
      </div>
    </div>
  );
}
