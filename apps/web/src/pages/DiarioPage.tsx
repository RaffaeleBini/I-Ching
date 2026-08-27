import { useEffect, useMemo } from "react";
import { useDictionary } from "../i18n";
import { useDiarioStore } from "../store/diarioStore";
import { DiarioFilters } from "../components/diario/DiarioFilters";
import { ConsultaListItem } from "../components/diario/ConsultaListItem";

export function DiarioPage() {
  const t = useDictionary();
  const consultas = useDiarioStore((state) => state.consultas);
  const loading = useDiarioStore((state) => state.loading);
  const filters = useDiarioStore((state) => state.filters);
  const loadAll = useDiarioStore((state) => state.loadAll);
  const setTextFilter = useDiarioStore((state) => state.setTextFilter);
  const setHexagramFilter = useDiarioStore((state) => state.setHexagramFilter);
  const setFavoritoOnly = useDiarioStore((state) => state.setFavoritoOnly);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const filtered = useMemo(() => {
    const needle = filters.text.trim().toLowerCase();
    return consultas.filter((consulta) => {
      if (filters.hexagrama !== null && consulta.hexagrama_principal !== filters.hexagrama) {
        return false;
      }
      if (filters.favoritoOnly && !consulta.favorito) {
        return false;
      }
      if (needle) {
        const pregunta = consulta.pregunta?.toLowerCase() ?? "";
        const nota = consulta.nota_usuario.toLowerCase();
        if (!pregunta.includes(needle) && !nota.includes(needle)) {
          return false;
        }
      }
      return true;
    });
  }, [consultas, filters]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-2xl text-ink">{t.diario.title}</h1>

      <DiarioFilters
        text={filters.text}
        hexagrama={filters.hexagrama}
        favoritoOnly={filters.favoritoOnly}
        onTextChange={setTextFilter}
        onHexagramChange={setHexagramFilter}
        onFavoritoOnlyChange={setFavoritoOnly}
      />

      {loading ? (
        <p className="text-ink-muted">{t.common.loading}</p>
      ) : filtered.length === 0 ? (
        <p className="text-ink-muted">{t.diario.empty}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((consulta) => (
            <ConsultaListItem key={consulta.id} consulta={consulta} />
          ))}
        </div>
      )}
    </div>
  );
}
