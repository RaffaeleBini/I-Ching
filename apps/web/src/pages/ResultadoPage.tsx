import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Consulta } from "@iching/core";
import { getHexagramData } from "@iching/core";
import { useDictionary } from "../i18n";
import { consultaRepository } from "../lib/repository";
import { HexagramLines } from "../components/hexagram/HexagramLines";
import { HexagramText } from "../components/hexagram/HexagramText";
import { Textarea } from "../components/ui/Textarea";
import { Card } from "../components/ui/Card";
import { IconButton } from "../components/ui/IconButton";

/** `undefined` = cargando, `null` = no encontrada, objeto = cargada. */
type LoadState = Consulta | null | undefined;

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M12 3.5l2.47 5.51 5.98.59-4.51 4.03 1.32 5.87L12 16.6l-5.26 2.9 1.32-5.87-4.51-4.03 5.98-.59L12 3.5Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ResultadoPage() {
  const { id } = useParams<{ id: string }>();
  const t = useDictionary();
  const [consulta, setConsulta] = useState<LoadState>(undefined);
  const [nota, setNota] = useState("");

  useEffect(() => {
    let cancelled = false;
    setConsulta(undefined);
    if (!id) {
      setConsulta(null);
      return;
    }
    void consultaRepository.getById(id).then((found) => {
      if (cancelled) return;
      setConsulta(found ?? null);
      setNota(found?.nota_usuario ?? "");
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSaveNota = useCallback(() => {
    if (!id || !consulta || nota === consulta.nota_usuario) return;
    void consultaRepository.update(id, { nota_usuario: nota }).then(() => {
      setConsulta((prev) => (prev ? { ...prev, nota_usuario: nota } : prev));
    });
  }, [id, consulta, nota]);

  const handleToggleFavorito = useCallback(() => {
    if (!id || !consulta) return;
    const favorito = !consulta.favorito;
    setConsulta((prev) => (prev ? { ...prev, favorito } : prev));
    void consultaRepository.update(id, { favorito });
  }, [id, consulta]);

  if (consulta === undefined) {
    return <p className="text-ink-muted">{t.common.loading}</p>;
  }

  if (consulta === null) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-ink-muted">{t.resultado.notFound}</p>
        <Link to="/diario" className="text-accent underline">
          {t.resultado.backToDiario}
        </Link>
      </div>
    );
  }

  const principal = getHexagramData(consulta.hexagrama_principal);
  const resultante = consulta.hexagrama_resultante
    ? getHexagramData(consulta.hexagrama_resultante)
    : null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end">
        <IconButton
          label={consulta.favorito ? t.resultado.favoriteRemove : t.resultado.favoriteAdd}
          onClick={handleToggleFavorito}
          aria-pressed={consulta.favorito}
          className={consulta.favorito ? "text-accent" : undefined}
        >
          <StarIcon filled={consulta.favorito} />
        </IconButton>
      </div>

      {consulta.pregunta && (
        <p className="text-center font-serif italic text-ink-muted">
          &ldquo;{consulta.pregunta}&rdquo;
        </p>
      )}

      <div className="flex justify-center">
        <HexagramLines lines={consulta.lineas} />
      </div>

      <Card>
        <HexagramText
          hexagram={principal}
          title={t.resultado.principalTitle}
          lines={consulta.lineas}
        />
      </Card>

      {resultante && (
        <Card>
          <HexagramText hexagram={resultante} title={t.resultado.resultanteTitle} />
        </Card>
      )}

      <div>
        <label htmlFor="nota" className="mb-1.5 block text-sm text-ink-muted">
          {t.resultado.notaLabel}
        </label>
        <Textarea
          id="nota"
          value={nota}
          onChange={(event) => setNota(event.target.value)}
          onBlur={handleSaveNota}
          placeholder={t.resultado.notaPlaceholder}
        />
      </div>
    </div>
  );
}
