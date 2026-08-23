import type { LineValue, TrigramName } from "../types/hexagram";

/**
 * Orden de trigramas tal como aparece en la tabla tradicional de secuencia
 * King Wen (filas = trigrama inferior, columnas = trigrama superior).
 * Este orden y la tabla siguiente son dato estructural tradicional de dominio
 * público (aparece, en distintas presentaciones, en prácticamente cualquier
 * referencia sobre el I Ching), reconstruido aquí de forma independiente a
 * partir de los patrones binarios de los 8 trigramas — no copiado de ningún
 * PDF de referencia.
 */
const TRIGRAM_ORDER: TrigramName[] = [
  "Qián",
  "Zhèn",
  "Kǎn",
  "Gèn",
  "Kūn",
  "Xùn",
  "Lí",
  "Duì",
];

/**
 * Patrón binario de cada trigrama, de la línea inferior a la superior
 * (1 = yang/línea continua, 0 = yin/línea partida). Estos 8 patrones son un
 * hecho estructural fijo de la tradición del I Ching.
 */
const TRIGRAM_PATTERN: Record<TrigramName, readonly [0 | 1, 0 | 1, 0 | 1]> = {
  Qián: [1, 1, 1],
  Zhèn: [1, 0, 0],
  Kǎn: [0, 1, 0],
  Gèn: [0, 0, 1],
  Kūn: [0, 0, 0],
  Xùn: [0, 1, 1],
  Lí: [1, 0, 1],
  Duì: [1, 1, 0],
};

/**
 * Tabla tradicional King Wen: KING_WEN_TABLE[fila][columna] = número de
 * hexagrama (1-64), donde fila = índice del trigrama inferior en
 * TRIGRAM_ORDER y columna = índice del trigrama superior.
 * Verificada contra casos conocidos: [Qián][Qián] = 1, [Kūn][Kūn] = 2,
 * [Ch'ien inferior][K'un superior] = 11 (Tai/Paz).
 */
const KING_WEN_TABLE: readonly (readonly number[])[] = [
  [1, 34, 5, 26, 11, 9, 14, 43],
  [25, 51, 3, 27, 24, 42, 21, 17],
  [6, 40, 29, 4, 7, 59, 64, 47],
  [33, 62, 39, 52, 15, 53, 56, 31],
  [12, 16, 8, 23, 2, 20, 35, 45],
  [44, 32, 48, 18, 46, 57, 50, 28],
  [13, 55, 63, 22, 36, 37, 30, 49],
  [10, 54, 60, 41, 19, 61, 38, 58],
];

function toYangYin(value: LineValue): 0 | 1 {
  return value === 7 || value === 9 ? 1 : 0;
}

function findTrigram(pattern: readonly [0 | 1, 0 | 1, 0 | 1]): TrigramName {
  const found = TRIGRAM_ORDER.find((name) => {
    const candidate = TRIGRAM_PATTERN[name];
    return (
      candidate[0] === pattern[0] &&
      candidate[1] === pattern[1] &&
      candidate[2] === pattern[2]
    );
  });
  if (!found) {
    throw new Error(
      `No se encontró un trigrama para el patrón [${pattern.join(", ")}]`,
    );
  }
  return found;
}

export interface HexagramTrigrams {
  inferior: TrigramName;
  superior: TrigramName;
}

/** A partir de las 6 líneas, determina el trigrama inferior (1-3) y superior (4-6). */
export function getTrigramsFromLines(lines: LineValue[]): HexagramTrigrams {
  if (lines.length !== 6) {
    throw new Error("Se requieren exactamente 6 líneas para determinar los trigramas");
  }
  const binary = lines.map(toYangYin);
  const inferior = findTrigram([binary[0]!, binary[1]!, binary[2]!]);
  const superior = findTrigram([binary[3]!, binary[4]!, binary[5]!]);
  return { inferior, superior };
}

/** Número de hexagrama (1-64, secuencia King Wen) a partir de sus 6 líneas. */
export function getHexagramNumberFromLines(lines: LineValue[]): number {
  const { inferior, superior } = getTrigramsFromLines(lines);
  return getHexagramNumberFromTrigrams(inferior, superior);
}

export function getHexagramNumberFromTrigrams(
  inferior: TrigramName,
  superior: TrigramName,
): number {
  const rowIndex = TRIGRAM_ORDER.indexOf(inferior);
  const colIndex = TRIGRAM_ORDER.indexOf(superior);
  const numero = KING_WEN_TABLE[rowIndex]?.[colIndex];
  if (numero === undefined) {
    throw new Error(
      `No se pudo determinar el número de hexagrama para inferior=${inferior}, superior=${superior}`,
    );
  }
  return numero;
}

/**
 * Tabla inversa: para cada número de hexagrama (1-64), sus trigramas
 * inferior y superior. Derivada de KING_WEN_TABLE, así que siempre queda
 * consistente con el motor de búsqueda — sin riesgo de datos duplicados que
 * diverjan entre sí.
 */
export function getTrigramsForHexagramNumber(numero: number): HexagramTrigrams {
  for (let rowIndex = 0; rowIndex < TRIGRAM_ORDER.length; rowIndex += 1) {
    const row = KING_WEN_TABLE[rowIndex]!;
    const colIndex = row.indexOf(numero);
    if (colIndex !== -1) {
      return {
        inferior: TRIGRAM_ORDER[rowIndex]!,
        superior: TRIGRAM_ORDER[colIndex]!,
      };
    }
  }
  throw new Error(`Número de hexagrama fuera de rango: ${numero}`);
}

/**
 * Las 6 líneas "de referencia" (todas estables: 7 = yang, 8 = yin) de un
 * hexagrama, de la línea 1 (abajo) a la línea 6 (arriba). Útil para dibujar
 * el diagrama de un hexagrama fuera del contexto de una consulta concreta
 * (por ejemplo, en la pantalla de Referencia), donde no existe el concepto
 * de línea mutante.
 */
export function getStableLinesForHexagramNumber(numero: number): LineValue[] {
  const { inferior, superior } = getTrigramsForHexagramNumber(numero);
  const toLine = (bit: 0 | 1): LineValue => (bit === 1 ? 7 : 8);
  const inferiorPattern = TRIGRAM_PATTERN[inferior];
  const superiorPattern = TRIGRAM_PATTERN[superior];
  return [
    toLine(inferiorPattern[0]),
    toLine(inferiorPattern[1]),
    toLine(inferiorPattern[2]),
    toLine(superiorPattern[0]),
    toLine(superiorPattern[1]),
    toLine(superiorPattern[2]),
  ];
}
