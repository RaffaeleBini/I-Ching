/**
 * Idiomas soportados por la interfaz y por el contenido interpretativo.
 * `es` es el idioma base (fallback) del proyecto.
 */
export type Locale = "es" | "gl" | "it";

export const LOCALES: readonly Locale[] = ["es", "gl", "it"];

/**
 * Valor de una línea según el método de las 3 monedas:
 * 6 = yin mutante, 7 = yang estable, 8 = yin estable, 9 = yang mutante.
 */
export type LineValue = 6 | 7 | 8 | 9;

/**
 * Los 8 trigramas, identificados por su nombre en pinyin.
 * El orden aquí no implica secuencia; ver `hexagrams-index.ts` para el orden
 * usado en la tabla tradicional de secuencia King Wen.
 */
export const TRIGRAM_NAMES = [
  "Qián",
  "Zhèn",
  "Kǎn",
  "Gèn",
  "Kūn",
  "Xùn",
  "Lí",
  "Duì",
] as const;

export type TrigramName = (typeof TRIGRAM_NAMES)[number];

export interface LineText {
  numero: 1 | 2 | 3 | 4 | 5 | 6;
  texto: string;
}

/**
 * Contenido interpretativo de un hexagrama en un idioma concreto.
 * Este es el contenido que, según la decisión de proyecto, se basará en la
 * traducción de James Legge (1899, dominio público) reescrita en tono propio.
 * En esta primera iteración solo los hexagramas 1 y 2 tienen contenido real
 * de ejemplo; el resto usa placeholders explícitos (ver `data/hexagrams.ts`).
 */
export interface HexagramContent {
  juicio: string;
  imagen: string;
  lineas: LineText[];
}

export interface HexagramData {
  /** Número tradicional en la secuencia King Wen, 1-64. */
  numero: number;
  /**
   * Nombre chino tradicional (pinyin, y hanzi cuando está verificado).
   * Dato estructural de dominio público; en esta iteración solo se ha
   * verificado con confianza para los hexagramas 1 y 2 (ver data/hexagrams.ts).
   */
  nombre_chino: string;
  /** Nombre del hexagrama, localizado por idioma. */
  nombre: Record<Locale, string>;
  trigrama_superior: TrigramName;
  trigrama_inferior: TrigramName;
  /** Carácter Unicode del bloque "Yijing Hexagram Symbols" (U+4DC0–U+4DFF). */
  simbolo_unicode: string;
  /** Contenido interpretativo (juicio, imagen, líneas), localizado por idioma. */
  contenido: Record<Locale, HexagramContent>;
}
