import { describe, expect, it } from "vitest";
import type { LineValue } from "../types/hexagram";
import {
  getHexagramNumberFromLines,
  getHexagramNumberFromTrigrams,
  getStableLinesForHexagramNumber,
  getTrigramsForHexagramNumber,
  getTrigramsFromLines,
} from "../data/hexagrams-index";
import { generateLines, getResultingLines, isChangingLine } from "./hexagram";
import { tossCoins } from "./coins";

describe("tossCoins", () => {
  it("siempre devuelve un valor entre 6 y 9", () => {
    for (let i = 0; i < 500; i += 1) {
      const value = tossCoins();
      expect(value).toBeGreaterThanOrEqual(6);
      expect(value).toBeLessThanOrEqual(9);
    }
  });

  it("produce los 4 valores posibles con distribución no degenerada en muchas tiradas", () => {
    const counts = { 6: 0, 7: 0, 8: 0, 9: 0 };
    const totalTosses = 2000;
    for (let i = 0; i < totalTosses; i += 1) {
      counts[tossCoins()] += 1;
    }
    // Distribución teórica: 6→1/8, 7→3/8, 8→3/8, 9→1/8. No se exige exactitud,
    // solo que las 4 posibilidades aparezcan con una frecuencia razonable.
    expect(counts[6]).toBeGreaterThan(0);
    expect(counts[9]).toBeGreaterThan(0);
    expect(counts[7]).toBeGreaterThan(counts[6]);
    expect(counts[8]).toBeGreaterThan(counts[9]);
  });
});

describe("generateLines", () => {
  it("genera exactamente 6 líneas, cada una entre 6 y 9", () => {
    const lines = generateLines();
    expect(lines).toHaveLength(6);
    for (const line of lines) {
      expect([6, 7, 8, 9]).toContain(line);
    }
  });
});

describe("getResultingLines", () => {
  it("devuelve null si no hay líneas mutantes", () => {
    const lines: LineValue[] = [7, 8, 7, 8, 7, 8];
    expect(getResultingLines(lines)).toBeNull();
  });

  it("invierte la polaridad de las líneas mutantes (6→7, 9→8) y deja el resto igual", () => {
    const lines: LineValue[] = [6, 7, 8, 9, 7, 8];
    expect(getResultingLines(lines)).toEqual([7, 7, 8, 8, 7, 8]);
  });

  it("invierte todas las líneas si todas son mutantes", () => {
    const lines: LineValue[] = [9, 9, 9, 9, 9, 9];
    expect(getResultingLines(lines)).toEqual([8, 8, 8, 8, 8, 8]);
  });

  it("el hexagrama resultante es distinto del principal cuando hay líneas mutantes", () => {
    // Antes de la corrección, invertir solo la estabilidad (6→8, 9→7) dejaba
    // el patrón yin/yang intacto y el hexagrama resultante salía idéntico al
    // principal. La polaridad debe invertirse de verdad.
    const lines: LineValue[] = [7, 7, 9, 8, 7, 6];
    const principal = getHexagramNumberFromLines(lines);
    const resultantes = getResultingLines(lines)!;
    const resultante = getHexagramNumberFromLines(resultantes);
    expect(resultante).not.toBe(principal);
  });
});

describe("isChangingLine", () => {
  it("es true solo para 6 y 9", () => {
    expect(isChangingLine(6)).toBe(true);
    expect(isChangingLine(9)).toBe(true);
    expect(isChangingLine(7)).toBe(false);
    expect(isChangingLine(8)).toBe(false);
  });
});

describe("getTrigramsFromLines", () => {
  it("línea 1-3 determinan el trigrama inferior, línea 4-6 el superior", () => {
    const lines: LineValue[] = [7, 7, 7, 8, 8, 8]; // Qián abajo, Kūn arriba
    expect(getTrigramsFromLines(lines)).toEqual({ inferior: "Qián", superior: "Kūn" });
  });

  it("una línea mutante cuenta según su paridad (6 como yin, 9 como yang)", () => {
    const lines: LineValue[] = [6, 8, 8, 9, 7, 7]; // yin,yin,yin / yang,yang,yang
    expect(getTrigramsFromLines(lines)).toEqual({ inferior: "Kūn", superior: "Qián" });
  });
});

describe("getHexagramNumberFromLines", () => {
  it("todas las líneas yang estables (7) → hexagrama 1 (Qián/Qián)", () => {
    expect(getHexagramNumberFromLines([7, 7, 7, 7, 7, 7])).toBe(1);
  });

  it("todas las líneas yin estables (8) → hexagrama 2 (Kūn/Kūn)", () => {
    expect(getHexagramNumberFromLines([8, 8, 8, 8, 8, 8])).toBe(2);
  });

  it("Qián inferior (Cielo abajo) + Kūn superior (Tierra arriba) → hexagrama 11 (Tai/Paz)", () => {
    expect(getHexagramNumberFromLines([7, 7, 7, 8, 8, 8])).toBe(11);
  });

  it("Kūn inferior (Tierra abajo) + Qián superior (Cielo arriba) → hexagrama 12 (Pǐ/Estancamiento)", () => {
    expect(getHexagramNumberFromLines([8, 8, 8, 7, 7, 7])).toBe(12);
  });

  it("líneas mutantes determinan el hexagrama principal por su paridad, igual que las estables", () => {
    const conMutantes = getHexagramNumberFromLines([6, 6, 6, 9, 9, 9]);
    const conEstables = getHexagramNumberFromLines([8, 8, 8, 7, 7, 7]);
    expect(conMutantes).toBe(conEstables);
    expect(conMutantes).toBe(12);
  });
});

describe("getTrigramsForHexagramNumber", () => {
  it("es la inversa exacta de getHexagramNumberFromTrigrams para los 64 números", () => {
    for (let numero = 1; numero <= 64; numero += 1) {
      const { inferior, superior } = getTrigramsForHexagramNumber(numero);
      expect(getHexagramNumberFromTrigrams(inferior, superior)).toBe(numero);
    }
  });

  it("lanza un error para un número fuera de rango", () => {
    expect(() => getTrigramsForHexagramNumber(0)).toThrow();
    expect(() => getTrigramsForHexagramNumber(65)).toThrow();
  });
});

describe("getStableLinesForHexagramNumber", () => {
  it("produce 6 líneas estables (solo 7 u 8) que identifican el mismo hexagrama", () => {
    for (let numero = 1; numero <= 64; numero += 1) {
      const lines = getStableLinesForHexagramNumber(numero);
      expect(lines).toHaveLength(6);
      for (const line of lines) {
        expect([7, 8]).toContain(line);
      }
      expect(getHexagramNumberFromLines(lines)).toBe(numero);
    }
  });

  it("hexagrama 1 (Qián/Qián) es todo yang estable", () => {
    expect(getStableLinesForHexagramNumber(1)).toEqual([7, 7, 7, 7, 7, 7]);
  });

  it("hexagrama 2 (Kūn/Kūn) es todo yin estable", () => {
    expect(getStableLinesForHexagramNumber(2)).toEqual([8, 8, 8, 8, 8, 8]);
  });
});
