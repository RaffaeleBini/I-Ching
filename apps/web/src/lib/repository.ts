import type { ConsultaRepository } from "@iching/core";
import { DexieConsultaRepository } from "@iching/storage-indexeddb";

/**
 * Composition root: único lugar de la app web donde se decide qué
 * implementación concreta de `ConsultaRepository` se usa. Los stores y
 * componentes solo conocen el tipo `ConsultaRepository` del core — si mañana
 * cambia el storage (o se inyecta un mock en tests), este es el único
 * archivo a tocar.
 */
export const consultaRepository: ConsultaRepository = new DexieConsultaRepository();
