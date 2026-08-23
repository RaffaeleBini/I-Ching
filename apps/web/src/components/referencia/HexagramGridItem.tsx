import { Link } from "react-router-dom";
import type { HexagramData } from "@iching/core";
import { useSettingsStore } from "../../store/settingsStore";

interface HexagramGridItemProps {
  hexagram: HexagramData;
}

export function HexagramGridItem({ hexagram }: HexagramGridItemProps) {
  const locale = useSettingsStore((state) => state.locale);

  return (
    <Link
      to={`/referencia/${hexagram.numero}`}
      className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-surface-raised px-3 py-4 text-center transition-colors hover:border-accent"
    >
      <span className="font-serif text-3xl leading-none" aria-hidden="true">
        {hexagram.simbolo_unicode}
      </span>
      <span className="text-xs text-ink-muted">{hexagram.numero}</span>
      <span className="text-sm text-ink">{hexagram.nombre[locale]}</span>
    </Link>
  );
}
