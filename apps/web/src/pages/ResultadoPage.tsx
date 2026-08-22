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

/** `undefined` = cargando, `null` = no encontrada, objeto = cargada. */
type LoadState = Consulta | null | undefined;

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
