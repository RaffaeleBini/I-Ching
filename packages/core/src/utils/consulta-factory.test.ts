import { describe, expect, it } from "vitest";
import { buildConsultation } from "./consulta-factory";

describe("buildConsultation", () => {
  it("produce una Consulta con id, fecha y 6 líneas válidas", () => {
    const consulta = buildConsultation({ pregunta: "¿Debo emprender este camino?" });

    expect(consulta.id).toMatch(/^[0-9a-f-]{36}$/i);
    expect(consulta.fecha).toBeGreaterThan(0);
    expect(consulta.pregunta).toBe("¿Debo emprender este camino?");
    expect(consulta.lineas).toHaveLength(6);
    for (const linea of consulta.lineas) {
      expect([6, 7, 8, 9]).toContain(linea);
    }
    expect(consulta.hexagrama_principal).toBeGreaterThanOrEqual(1);
    expect(consulta.hexagrama_principal).toBeLessThanOrEqual(64);
    expect(consulta.nota_usuario).toBe("");
    expect(consulta.favorito).toBe(false);
  });

  it("acepta pregunta null (la pregunta es opcional)", () => {
    const consulta = buildConsultation({ pregunta: null });
    expect(consulta.pregunta).toBeNull();
  });

  it("hexagrama_resultante es null cuando no hay líneas mutantes, y un número 1-64 cuando sí las hay", () => {
    // No podemos forzar el azar del motor de monedas, pero podemos verificar
    // la consistencia lógica repitiendo hasta cubrir ambos casos.
    let vistoSinMutantes = false;
    let vistoConMutantes = false;
    for (let i = 0; i < 200 && (!vistoSinMutantes || !vistoConMutantes); i += 1) {
      const consulta = buildConsultation({ pregunta: null });
      const tieneMutantes = consulta.lineas.some((l) => l === 6 || l === 9);
      if (tieneMutantes) {
        vistoConMutantes = true;
        expect(consulta.hexagrama_resultante).toBeGreaterThanOrEqual(1);
        expect(consulta.hexagrama_resultante).toBeLessThanOrEqual(64);
      } else {
        vistoSinMutantes = true;
        expect(consulta.hexagrama_resultante).toBeNull();
      }
    }
    expect(vistoSinMutantes).toBe(true);
    expect(vistoConMutantes).toBe(true);
  });
});
