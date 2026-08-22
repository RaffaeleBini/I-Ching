// Punto de entrada público de @iching/core.
// Solo lo exportado aquí debe considerarse API estable para consumidores
// (apps/web hoy, una futura app React Native mañana).

export type {
  Locale,
  LineValue,
  TrigramName,
  LineText,
  HexagramContent,
  HexagramData,
} from "./types/hexagram";
export { LOCALES, TRIGRAM_NAMES } from "./types/hexagram";

export type { Consulta, NuevaConsultaInput } from "./types/consulta";

export { tossCoins } from "./engine/coins";
export { generateLines, getResultingLines, isChangingLine } from "./engine/hexagram";

export {
  getHexagramNumberFromLines,
  getHexagramNumberFromTrigrams,
  getTrigramsFromLines,
  getTrigramsForHexagramNumber,
} from "./data/hexagrams-index";
export type { HexagramTrigrams } from "./data/hexagrams-index";

export { getHexagramData, getAllHexagrams } from "./data/hexagrams";

export { buildConsultation } from "./utils/consulta-factory";

export type {
  ConsultaRepository,
  ConsultaSearchFilters,
} from "./repository/consulta-repository.interface";
