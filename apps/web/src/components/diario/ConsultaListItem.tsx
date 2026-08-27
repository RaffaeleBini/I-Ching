import { Link } from "react-router-dom";
import type { Consulta } from "@iching/core";
import { getHexagramData } from "@iching/core";
import { useDictionary } from "../../i18n";
import { useSettingsStore } from "../../store/settingsStore";

interface ConsultaListItemProps {
  consulta: Consulta;
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        d="M12 3.5l2.47 5.51 5.98.59-4.51 4.03 1.32 5.87L12 16.6l-5.26 2.9 1.32-5.87-4.51-4.03 5.98-.59L12 3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ConsultaListItem({ consulta }: ConsultaListItemProps) {
  const t = useDictionary();
  const locale = useSettingsStore((state) => state.locale);
  const hexagram = getHexagramData(consulta.hexagrama_principal);
  const fecha = new Date(consulta.fecha).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      to={`/resultado/${consulta.id}`}
      className="flex items-start gap-4 rounded-xl border border-border bg-surface-raised p-4 transition-colors hover:border-accent"
    >
      <span className="font-serif text-2xl leading-none" aria-hidden="true">
        {hexagram.simbolo_unicode}
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 truncate text-ink">
          {consulta.favorito && (
            <span className="text-accent" aria-label={t.diario.favoriteBadge}>
              <StarIcon />
            </span>
          )}
          <span className="truncate">{consulta.pregunta || t.resultado.withoutQuestion}</span>
        </p>
        <p className="mt-1 text-xs text-ink-muted">
          {hexagram.nombre[locale]} · {t.diario.consultOn(fecha)}
        </p>
      </div>
    </Link>
  );
}
