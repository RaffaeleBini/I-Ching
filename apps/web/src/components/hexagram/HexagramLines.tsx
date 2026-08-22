import type { LineValue } from "@iching/core";

interface HexagramLinesProps {
  /** De la línea 1 (abajo) a la línea 6 (arriba), como en el resto de la app. */
  lines: LineValue[];
  size?: "sm" | "lg";
}

function isYang(value: LineValue): boolean {
  return value === 7 || value === 9;
}

function isChanging(value: LineValue): boolean {
  return value === 6 || value === 9;
}

function LineBar({ value, size }: { value: LineValue; size: "sm" | "lg" }) {
  const height = size === "lg" ? "h-2.5" : "h-1.5";
  const barClasses = [height, "rounded-full", isChanging(value) ? "bg-accent" : "bg-ink"].join(
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
 * Dibuja las 6 líneas de un hexagrama, línea continua = yang, línea partida
 * = yin, resaltando en el color de acento las líneas mutantes (6 o 9).
 * El DOM se ordena de la línea 6 (arriba) a la 1 (abajo) porque flexbox en
 * columna apila los hijos de arriba hacia abajo.
 */
export function HexagramLines({ lines, size = "lg" }: HexagramLinesProps) {
  const topToBottom = [...lines].reverse();

  return (
    <div>
      <div className="flex flex-col gap-2" aria-hidden="true">
        {topToBottom.map((value, index) => (
          <LineBar key={lines.length - index} value={value} size={size} />
        ))}
      </div>
      <p className="sr-only">
        {lines
          .map((value, index) => {
            const tipo = isYang(value) ? "yang" : "yin";
            const mutante = isChanging(value) ? " mutante" : "";
            return `Línea ${index + 1}: ${tipo}${mutante}.`;
          })
          .join(" ")}
      </p>
    </div>
  );
}
