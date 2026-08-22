import { useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDictionary } from "../i18n";
import { useConsultaStore } from "../store/consultaStore";
import { useCoinTossAnimation } from "../components/coins/useCoinTossAnimation";
import { CoinTossAnimation } from "../components/coins/CoinTossAnimation";
import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/Textarea";

export function NuevaConsultaPage() {
  const t = useDictionary();
  const navigate = useNavigate();
  const pregunta = useConsultaStore((state) => state.pregunta);
  const setPregunta = useConsultaStore((state) => state.setPregunta);
  const skipAnimation = useConsultaStore((state) => state.skipAnimation);
  const setSkipAnimation = useConsultaStore((state) => state.setSkipAnimation);
  const consulta = useConsultaStore((state) => state.consulta);
  const { status, revealedLines, start, reset } = useCoinTossAnimation();

  useEffect(() => {
    // Cada visita a esta página empieza un flujo de consulta limpio.
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo al montar
  }, []);

  useEffect(() => {
    if (status === "done" && consulta) {
      navigate(`/resultado/${consulta.id}`, { replace: true });
    }
  }, [status, consulta, navigate]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void start();
  }

  if (status === "tossing" || status === "revealing") {
    return <CoinTossAnimation revealedLines={revealedLines} status={status} />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h1 className="font-serif text-2xl text-ink">{t.nuevaConsulta.title}</h1>

      <div>
        <label htmlFor="pregunta" className="mb-1.5 block text-sm text-ink-muted">
          {t.nuevaConsulta.questionLabel}
        </label>
        <Textarea
          id="pregunta"
          value={pregunta}
          onChange={(event) => setPregunta(event.target.value)}
          placeholder={t.nuevaConsulta.questionPlaceholder}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink-muted">
        <input
          type="checkbox"
          checked={skipAnimation}
          onChange={(event) => setSkipAnimation(event.target.checked)}
          className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
        />
        {t.nuevaConsulta.skipAnimation}
      </label>

      <Button type="submit">{t.nuevaConsulta.startButton}</Button>
    </form>
  );
}
