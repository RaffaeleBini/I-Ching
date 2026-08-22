import { describe, expect, it } from "vitest";
import { LOCALES } from "../types/hexagram";
import { getAllHexagrams, getHexagramData } from "./hexagrams";

describe("base de datos de hexagramas", () => {
  it("contiene exactamente 64 hexagramas", () => {
    expect(getAllHexagrams()).toHaveLength(64);
  });

  it("tiene los números 1-64 exactamente una vez cada uno", () => {
    const numeros = getAllHexagrams()
      .map((h) => h.numero)
      .sort((a, b) => a - b);
    expect(numeros).toEqual(Array.from({ length: 64 }, (_, i) => i + 1));
  });

  it("cada hexagrama tiene exactamente 6 líneas numeradas 1-6 en cada idioma", () => {
    for (const hexagrama of getAllHexagrams()) {
      for (const locale of LOCALES) {
        const numerosLinea = hexagrama.contenido[locale].lineas
          .map((l) => l.numero)
          .sort((a, b) => a - b);
        expect(numerosLinea).toEqual([1, 2, 3, 4, 5, 6]);
      }
    }
  });

  it("no tiene strings vacíos en ningún campo de texto (ni siquiera en los placeholders)", () => {
    for (const hexagrama of getAllHexagrams()) {
      expect(hexagrama.nombre_chino.length).toBeGreaterThan(0);
      expect(hexagrama.simbolo_unicode.length).toBeGreaterThan(0);
      for (const locale of LOCALES) {
        expect(hexagrama.nombre[locale].length).toBeGreaterThan(0);
        expect(hexagrama.contenido[locale].juicio.length).toBeGreaterThan(0);
        expect(hexagrama.contenido[locale].imagen.length).toBeGreaterThan(0);
        for (const linea of hexagrama.contenido[locale].lineas) {
          expect(linea.texto.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("getHexagramData(1) es Qián / Lo Creativo con contenido real (no placeholder)", () => {
    const hex1 = getHexagramData(1);
    expect(hex1.trigrama_superior).toBe("Qián");
    expect(hex1.trigrama_inferior).toBe("Qián");
    expect(hex1.nombre.es).toBe("Lo Creativo");
    expect(hex1.contenido.es.juicio).not.toMatch(/PENDIENTE/);
  });

  it("getHexagramData(2) es Kūn / Lo Receptivo con contenido real (no placeholder)", () => {
    const hex2 = getHexagramData(2);
    expect(hex2.trigrama_superior).toBe("Kūn");
    expect(hex2.trigrama_inferior).toBe("Kūn");
    expect(hex2.nombre.es).toBe("Lo Receptivo");
    expect(hex2.contenido.es.juicio).not.toMatch(/PENDIENTE/);
  });

  it("getHexagramData lanza un error para un número fuera de rango", () => {
    expect(() => getHexagramData(0)).toThrow();
    expect(() => getHexagramData(65)).toThrow();
  });

  it("los símbolos Unicode son únicos y caen en el bloque Yijing Hexagram Symbols", () => {
    const simbolos = getAllHexagrams().map((h) => h.simbolo_unicode);
    expect(new Set(simbolos).size).toBe(64);
    for (const simbolo of simbolos) {
      const codePoint = simbolo.codePointAt(0)!;
      expect(codePoint).toBeGreaterThanOrEqual(0x4dc0);
      expect(codePoint).toBeLessThanOrEqual(0x4dff);
    }
  });
});
