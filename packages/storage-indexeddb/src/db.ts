import Dexie, { type EntityTable } from "dexie";
import type { Consulta } from "@iching/core";

export class IchingDatabase extends Dexie {
  consultas!: EntityTable<Consulta, "id">;

  constructor(name = "ichingDB") {
    super(name);
    this.version(1).stores({
      // "id" como clave primaria (no auto-incremental: la genera el core con
      // crypto.randomUUID()); índices sobre los campos usados para filtrar
      // en el Diario (fecha para orden cronológico, hexagrama principal y
      // favorito para los filtros).
      consultas: "id, fecha, hexagrama_principal, favorito",
    });
  }
}
