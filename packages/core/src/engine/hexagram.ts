import type { LineValue } from "../types/hexagram";
import { tossCoins } from "./coins";

/** Genera las 6 líneas de un hexagrama, de la línea 1 (abajo) a la línea 6 (arriba). */
export function generateLines(): LineValue[] {
  return Array.from({ length: 6 }, () => tossCoins());
}

export function isChangingLine(line: LineValue): boolean {
  return line === 6 || line === 9;
}

/**
 * Si el hexagrama tiene líneas mutantes, calcula el hexagrama resultante
 * invirtiendo su polaridad (6 = yin mutante → 7 = yang estable; 9 = yang
 * mutante → 8 = yin estable); las líneas estables no cambian. Es la
 * inversión de polaridad, no solo de estabilidad, lo que hace que el
 * hexagrama resultante sea (normalmente) distinto del principal — ver spec
 * §3.1. Devuelve `null` si no hay ninguna línea mutante.
 */
export function getResultingLines(lines: LineValue[]): LineValue[] | null {
  if (!lines.some(isChangingLine)) {
    return null;
  }

  return lines.map((line): LineValue => {
    if (line === 6) return 7;
    if (line === 9) return 8;
    return line;
  });
}
