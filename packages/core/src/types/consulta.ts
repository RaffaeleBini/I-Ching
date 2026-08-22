import type { LineValue } from "./hexagram";

/**
 * Una consulta guardada en el diario del usuario.
 * Persistida localmente (IndexedDB en web, ver `@iching/storage-indexeddb`);
 * este tipo vive en el core porque es dato de dominio, no detalle de storage.
 */
export interface Consulta {
  id: string;
  /** Timestamp en milisegundos (epoch), momento de la consulta. */
  fecha: number;
  pregunta: string | null;
  /** Exactamente 6 valores, de la línea 1 (abajo) a la línea 6 (arriba). */
  lineas: LineValue[];
  hexagrama_principal: number;
  hexagrama_resultante: number | null;
  nota_usuario: string;
  favorito: boolean;
}

export interface NuevaConsultaInput {
  pregunta: string | null;
}
