import { create } from "zustand";
import type { Consulta } from "@iching/core";
import { consultaRepository } from "../lib/repository";

interface DiarioFilters {
  text: string;
  hexagrama: number | null;
  favoritoOnly: boolean;
}

interface DiarioState {
  consultas: Consulta[];
  loading: boolean;
  filters: DiarioFilters;
  loadAll: () => Promise<void>;
  setTextFilter: (text: string) => void;
  setHexagramFilter: (hexagrama: number | null) => void;
  setFavoritoOnly: (favoritoOnly: boolean) => void;
}

/** Cache reactiva de la lista de consultas persistidas, para el Diario. */
export const useDiarioStore = create<DiarioState>()((set) => ({
  consultas: [],
  loading: false,
  filters: { text: "", hexagrama: null, favoritoOnly: false },

  loadAll: async () => {
    set({ loading: true });
    const consultas = await consultaRepository.list();
    set({ consultas, loading: false });
  },

  setTextFilter: (text) => set((state) => ({ filters: { ...state.filters, text } })),
  setHexagramFilter: (hexagrama) =>
    set((state) => ({ filters: { ...state.filters, hexagrama } })),
  setFavoritoOnly: (favoritoOnly) =>
    set((state) => ({ filters: { ...state.filters, favoritoOnly } })),
}));
