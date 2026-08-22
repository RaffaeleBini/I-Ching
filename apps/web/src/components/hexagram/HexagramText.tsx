import type { HexagramData, LineValue } from "@iching/core";
import { useDictionary } from "../../i18n";
import { useSettingsStore } from "../../store/settingsStore";

interface HexagramTextProps {
  hexagram: HexagramData;
  title: string;
  /** Si se pasan, solo se muestran los textos de las líneas mutantes (6 o 9). */
  lines?: LineValue[];
}

export function HexagramText({ hexagram, title, lines }: HexagramTextProps) {
  const t = useDictionary();
  const locale = useSettingsStore((state) => state.locale);
  const contenido = hexagram.contenido[locale];
  const nombre = hexagram.nombre[locale];

  const changingLineNumbers = (lines ?? []).reduce<number[]>((acc, value, index) => {
    if (value === 6 || value === 9) acc.push(index + 1);
    return acc;
  }, []);

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-4xl leading-none" aria-hidden="true">
          {hexagram.simbolo_unicode}
        </span>
        <div>
          <p className="text-xs uppercase tracking-wide text-ink-muted">
            {title} · {hexagram.numero}
          </p>
          <h2 className="font-serif text-2xl text-ink">{nombre}</h2>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <section>
          <h3 className="text-xs font-medium uppercase tracking-wide text-ink-muted">
            {t.resultado.juicioLabel}
          </h3>
          <p className="mt-1 leading-relaxed text-ink">{contenido.juicio}</p>
        </section>

        <section>
          <h3 className="text-xs font-medium uppercase tracking-wide text-ink-muted">
            {t.resultado.imagenLabel}
          </h3>
          <p className="mt-1 leading-relaxed text-ink">{contenido.imagen}</p>
        </section>

        {changingLineNumbers.length > 0 && (
          <section>
            <h3 className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              {t.resultado.lineasMutantesLabel}
            </h3>
            <ul className="mt-1 space-y-2">
              {contenido.lineas
                .filter((linea) => changingLineNumbers.includes(linea.numero))
                .map((linea) => (
                  <li key={linea.numero} className="leading-relaxed text-ink">
                    <span className="font-medium text-accent">{linea.numero}.</span>{" "}
                    {linea.texto}
                  </li>
                ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
