import type { LineValue } from "@iching/core";
import { useDictionary } from "../../i18n";

interface CoinTossAnimationProps {
  revealedLines: LineValue[];
  status: "tossing" | "revealing";
}

function isYang(value: LineValue): boolean {
  return value === 7 || value === 9;
}

function isChanging(value: LineValue): boolean {
  return value === 6 || value === 9;
}

function Slot({ value }: { value: LineValue | undefined }) {
  if (value === undefined) {
    return <div className="h-2.5 rounded-full border border-dashed border-border" />;
  }

  const barClasses = ["h-2.5", "rounded-full", isChanging(value) ? "bg-accent" : "bg-ink"].join(
    " ",
  );

  if (isYang(value)) {
    return <div className={barClasses} />;
  }

  return (
    <div className="flex items-center gap-[12%]">
      <div className={[barClasses, "flex-1"].join(" ")} />
      <div className={[barClasses, "flex-1"].join(" ")} />
    </div>
  );
}

/**
 * Construcción visual y progresiva del hexagrama, línea por línea, mientras
 * `consultaStore.start()` va lanzando las monedas. CSS puro (sin librería de
 * animación): `animate-pulse` en el texto de estado, respetando
 * `prefers-reduced-motion` de forma global (ver styles/index.css).
 */
export function CoinTossAnimation({ revealedLines, status }: CoinTossAnimationProps) {
  const t = useDictionary();
  const slots: (LineValue | undefined)[] = Array.from(
    { length: 6 },
    (_, index) => revealedLines[index],
  );
  const topToBottom = [...slots].reverse();

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex w-56 flex-col gap-3">
        {topToBottom.map((value, index) => (
          <Slot key={index} value={value} />
        ))}
      </div>
      <p className="animate-pulse text-sm text-ink-muted" role="status" aria-live="polite">
        {status === "tossing"
          ? t.nuevaConsulta.tossingLine(Math.min(revealedLines.length + 1, 6))
          : t.nuevaConsulta.revealing}
      </p>
    </div>
  );
}
