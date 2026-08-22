import { useConsultaStore } from "../../store/consultaStore";

/**
 * Selectores agrupados del store de consulta, específicos de la
 * orquestación del lanzamiento de monedas — mantiene la página
 * `NuevaConsultaPage` desacoplada de la forma interna del store.
 */
export function useCoinTossAnimation() {
  const status = useConsultaStore((state) => state.status);
  const revealedLines = useConsultaStore((state) => state.revealedLines);
  const start = useConsultaStore((state) => state.start);
  const reset = useConsultaStore((state) => state.reset);
  return { status, revealedLines, start, reset };
}
