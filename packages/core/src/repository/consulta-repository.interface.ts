import type { Consulta } from "../types/consulta";

export interface ConsultaSearchFilters {
  /** Búsqueda de texto libre sobre pregunta y nota del usuario. */
  text?: string;
  /** Filtra por número de hexagrama principal. */
  hexagrama?: number;
  favoritoOnly?: boolean;
}

/**
 * Puerto de persistencia para las consultas del diario (patrón Ports & Adapters).
 * El core no depende de ninguna tecnología de almacenamiento concreta: en la
 * app web la implementa `@iching/storage-indexeddb` con Dexie/IndexedDB; en
 * una futura app móvil podría implementarla un adapter con SQLite, sin tocar
 * el core ni la UI que consume esta interfaz.
 */
export interface ConsultaRepository {
  save(consulta: Consulta): Promise<void>;
  getById(id: string): Promise<Consulta | undefined>;
  list(): Promise<Consulta[]>;
  update(id: string, changes: Partial<Omit<Consulta, "id">>): Promise<void>;
  remove(id: string): Promise<void>;
  search(filters: ConsultaSearchFilters): Promise<Consulta[]>;
}
