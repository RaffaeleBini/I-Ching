import { create } from "zustand";
import {
  buildConsultation,
  getHexagramNumberFromLines,
  getResultingLines,
  tossCoins,
} from "@iching/core";
import type { Consulta, LineValue, NuevaConsultaInput } from "@iching/core";
import { consultaRepository } from "../lib/repository";

export type ConsultaFlowStatus = "idle" | "tossing" | "revealing" | "done";

interface ConsultaState {
  status: ConsultaFlowStatus;
  pregunta: string;
  skipAnimation: boolean;
  /** Líneas reveladas hasta el momento (para el renderizado progresivo). */
  revealedLines: LineValue[];
  consulta: Consulta | null;
  setPregunta: (pregunta: string) => void;
  setSkipAnimation: (skip: boolean) => void;
  start: () => Promise<Consulta>;
  reset: () => void;
}

/** Duración de cada lanzamiento visible; ver `prefers-reduced-motion` en styles/index.css. */
const TOSS_DELAY_MS = 550;
const REVEAL_DELAY_MS = 400;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Arma el objeto `Consulta` a partir de 6 líneas ya generadas. Duplica una
 * pequeña parte de lo que hace `buildConsultation()` del core (que genera
 * sus propias líneas de una vez) porque aquí necesitamos revelar cada línea
 * una por una para la animación; usar las mismas funciones exportadas por el
 * core (`getHexagramNumberFromLines`, `getResultingLines`) garantiza que el
 * resultado es idéntico al que produciría `buildConsultation`.
 */
function assembleConsulta(lines: LineValue[], pregunta: string | null): Consulta {
  const hexagrama_principal = getHexagramNumberFromLines(lines);
  const lineasResultantes = getResultingLines(lines);
  const hexagrama_resultante = lineasResultantes
    ? getHexagramNumberFromLines(lineasResultantes)
    : null;

  return {
    id: crypto.randomUUID(),
    fecha: Date.now(),
    pregunta,
    lineas: lines,
    hexagrama_principal,
    hexagrama_resultante,
    nota_usuario: "",
    favorito: false,
  };
}

/**
 * Estado transitorio del flujo "nueva consulta". Zustand en vez de Context:
 * el lanzamiento de monedas actualiza el estado 6 veces en secuencia fuera
 * del ciclo de render (orquestado por `start()`, una función async normal),
 * lo que encaja mejor con la API imperativa de Zustand que con Context.
 */
export const useConsultaStore = create<ConsultaState>()((set, get) => ({
  status: "idle",
  pregunta: "",
  skipAnimation: false,
  revealedLines: [],
  consulta: null,

  setPregunta: (pregunta) => set({ pregunta }),
  setSkipAnimation: (skip) => set({ skipAnimation: skip }),

  start: async () => {
    const { pregunta, skipAnimation } = get();
    const input: NuevaConsultaInput = { pregunta: pregunta.trim() || null };

    set({
      status: skipAnimation ? "revealing" : "tossing",
      revealedLines: [],
      consulta: null,
    });

    let consulta: Consulta;
    if (skipAnimation) {
      consulta = buildConsultation(input);
    } else {
      const lines: LineValue[] = [];
      for (let i = 0; i < 6; i += 1) {
        lines.push(tossCoins());
        set({ revealedLines: [...lines] });
        // eslint-disable-next-line no-await-in-loop -- la animación es intencionalmente secuencial
        await delay(TOSS_DELAY_MS);
      }
      set({ status: "revealing" });
      consulta = assembleConsulta(lines, input.pregunta);
      await delay(REVEAL_DELAY_MS);
    }

    await consultaRepository.save(consulta);
    set({ status: "done", consulta });
    return consulta;
  },

  reset: () => set({ status: "idle", pregunta: "", revealedLines: [], consulta: null }),
}));
