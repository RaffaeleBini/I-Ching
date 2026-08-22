import type { LineValue } from "../types/hexagram";

/** Cara = yin (valor 2), cruz = yang (valor 3) — método tradicional de las 3 monedas. */
const YIN_COIN_VALUE = 2;
const YANG_COIN_VALUE = 3;

/**
 * Lanza una moneda virtual usando la Web Crypto API (`crypto.getRandomValues`)
 * en vez de `Math.random()`, por una aleatoriedad de mejor calidad, coherente
 * con el espíritu del oráculo (ver spec §3.2). Disponible tanto en navegadores
 * modernos como en Node.js 20+ (`globalThis.crypto`), lo que mantiene este
 * módulo ejecutable fuera del navegador.
 */
function tossOneCoin(): typeof YIN_COIN_VALUE | typeof YANG_COIN_VALUE {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  const value = buffer[0] ?? 0;
  return value % 2 === 0 ? YIN_COIN_VALUE : YANG_COIN_VALUE;
}

/**
 * Lanza las 3 monedas y suma su valor, produciendo una línea entre 6 y 9:
 * 6 = yin mutante, 7 = yang estable, 8 = yin estable, 9 = yang mutante.
 */
export function tossCoins(): LineValue {
  const sum = tossOneCoin() + tossOneCoin() + tossOneCoin();
  return sum as LineValue;
}
