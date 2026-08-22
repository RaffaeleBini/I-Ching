import type {
  Consulta,
  ConsultaRepository,
  ConsultaSearchFilters,
} from "@iching/core";
import { IchingDatabase } from "./db";

/**
 * Implementación concreta de `ConsultaRepository` (puerto definido en
 * @iching/core) usando Dexie/IndexedDB. Es el único lugar del proyecto que
 * sabe que la persistencia web es IndexedDB — el core y la UI solo conocen
 * la interfaz.
 */
export class DexieConsultaRepository implements ConsultaRepository {
  private readonly db: IchingDatabase;

  constructor(db: IchingDatabase = new IchingDatabase()) {
    this.db = db;
  }

  async save(consulta: Consulta): Promise<void> {
    await this.db.consultas.put(consulta);
  }

  async getById(id: string): Promise<Consulta | undefined> {
    return this.db.consultas.get(id);
  }

  async list(): Promise<Consulta[]> {
    const consultas = await this.db.consultas.toArray();
    return consultas.sort((a, b) => b.fecha - a.fecha);
  }

  async update(id: string, changes: Partial<Omit<Consulta, "id">>): Promise<void> {
    const updated = await this.db.consultas.update(id, changes);
    if (updated === 0) {
      throw new Error(`No existe una consulta con id ${id}`);
    }
  }

  async remove(id: string): Promise<void> {
    await this.db.consultas.delete(id);
  }

  async search(filters: ConsultaSearchFilters): Promise<Consulta[]> {
    let consultas = await this.list();

    if (filters.hexagrama !== undefined) {
      consultas = consultas.filter((c) => c.hexagrama_principal === filters.hexagrama);
    }

    if (filters.favoritoOnly) {
      consultas = consultas.filter((c) => c.favorito);
    }

    if (filters.text) {
      const needle = filters.text.trim().toLowerCase();
      if (needle.length > 0) {
        consultas = consultas.filter((c) => {
          const pregunta = c.pregunta?.toLowerCase() ?? "";
          const nota = c.nota_usuario.toLowerCase();
          return pregunta.includes(needle) || nota.includes(needle);
        });
      }
    }

    return consultas;
  }
}
