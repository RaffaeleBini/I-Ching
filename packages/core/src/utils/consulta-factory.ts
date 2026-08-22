import { getHexagramNumberFromLines } from "../data/hexagrams-index";
import { generateLines, getResultingLines } from "../engine/hexagram";
import type { Consulta, NuevaConsultaInput } from "../types/consulta";

/**
 * Orquesta una consulta completa: genera las 6 líneas, calcula el hexagrama
 * principal y, si corresponde, el resultante, y arma el objeto `Consulta`
 * listo para guardarse (id y fecha incluidos). No accede a ningún storage:
 * quien llame a esta función decide si y cómo persistir el resultado.
 */
export function buildConsultation(input: NuevaConsultaInput): Consulta {
  const lineas = generateLines();
  const hexagrama_principal = getHexagramNumberFromLines(lineas);
  const lineasResultantes = getResultingLines(lineas);
  const hexagrama_resultante = lineasResultantes
    ? getHexagramNumberFromLines(lineasResultantes)
    : null;

  return {
    id: crypto.randomUUID(),
    fecha: Date.now(),
    pregunta: input.pregunta,
    lineas,
    hexagrama_principal,
    hexagrama_resultante,
    nota_usuario: "",
    favorito: false,
  };
}
