import type { Consulta, LineValue } from "@iching/core";

const VALID_LINE_VALUES: readonly number[] = [6, 7, 8, 9];

function isLineValue(value: unknown): value is LineValue {
  return typeof value === "number" && VALID_LINE_VALUES.includes(value);
}

function isHexagramNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 64;
}

function isConsulta(value: unknown): value is Consulta {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const c = value as Record<string, unknown>;
  return (
    typeof c.id === "string" &&
    c.id.length > 0 &&
    typeof c.fecha === "number" &&
    (c.pregunta === null || typeof c.pregunta === "string") &&
    Array.isArray(c.lineas) &&
    c.lineas.length === 6 &&
    c.lineas.every(isLineValue) &&
    isHexagramNumber(c.hexagrama_principal) &&
    (c.hexagrama_resultante === null || isHexagramNumber(c.hexagrama_resultante)) &&
    typeof c.nota_usuario === "string" &&
    typeof c.favorito === "boolean"
  );
}

export interface ParsedBackup {
  valid: Consulta[];
  skipped: number;
}

/**
 * Interpreta un archivo de copia de seguridad exportado desde Ajustes.
 * Cada entrada se valida por separado: una entrada corrupta o de un formato
 * distinto se descarta (contabilizada en `skipped`) sin abortar el resto de
 * la importación. Lanza si el archivo no es JSON válido o no es una lista.
 */
export function parseConsultasBackup(json: string): ParsedBackup {
  const data: unknown = JSON.parse(json);
  if (!Array.isArray(data)) {
    throw new Error("El archivo no contiene una lista de consultas.");
  }

  const valid: Consulta[] = [];
  let skipped = 0;
  for (const item of data) {
    if (isConsulta(item)) {
      valid.push(item);
    } else {
      skipped += 1;
    }
  }
  return { valid, skipped };
}
