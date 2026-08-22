import { describe, expect, it } from "vitest";
import { buildConsultation } from "./utils/consulta-factory";
import { generateLines } from "./engine/hexagram";
import { getAllHexagrams } from "./data/hexagrams";

/**
 * Test de portabilidad: @iching/core debe funcionar en Node.js puro, sin
 * `window`, `document` ni IndexedDB — condición necesaria para poder
 * reutilizarlo tal cual en una futura app React Native (ver plan de
 * proyecto, punto de verificación 14). Vitest para este paquete corre con
 * `environment: "node"` (ver vitest.config.ts), así que si estas
 * aserciones pasan, no hay ninguna dependencia oculta del DOM.
 */
describe("portabilidad del core (entorno Node puro)", () => {
  it("no depende de window, document ni indexedDB", () => {
    expect("window" in globalThis).toBe(false);
    expect("document" in globalThis).toBe(false);
    expect("indexedDB" in globalThis).toBe(false);
  });

  it("generateLines() y buildConsultation() funcionan en Node sin ningún adapter de storage", () => {
    const lines = generateLines();
    expect(lines).toHaveLength(6);

    const consulta = buildConsultation({ pregunta: "test de portabilidad" });
    expect(consulta.hexagrama_principal).toBeGreaterThanOrEqual(1);

    expect(getAllHexagrams()).toHaveLength(64);
  });
});
