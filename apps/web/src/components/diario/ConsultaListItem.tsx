import { Link } from "react-router-dom";
import type { Consulta } from "@iching/core";
import { getHexagramData } from "@iching/core";
import { useDictionary } from "../../i18n";
import { useSettingsStore } from "../../store/settingsStore";

interface ConsultaListItemProps {
  consulta: Consulta;
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
        <p className="truncate text-ink">
          {consulta.pregunta || t.resultado.withoutQuestion}
        </p>
        <p className="mt-1 text-xs text-ink-muted">
          {hexagram.nombre[locale]} · {t.diario.consultOn(fecha)}
        </p>
      </div>
    </Link>
  );
}
