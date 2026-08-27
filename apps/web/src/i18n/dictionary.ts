/**
 * Forma de un diccionario de strings de la interfaz. Se define como una
 * interfaz TS (no claves string sueltas) para que el compilador señale de
 * inmediato si a un diccionario le falta una clave o si un componente usa
 * una clave inexistente — sin necesidad de un motor i18n externo.
 */
export interface Dictionary {
  app: {
    title: string;
  };
  nav: {
    diario: string;
    referencia: string;
    ajustes: string;
  };
  home: {
    tagline: string;
    newConsultation: string;
    viewDiario: string;
    viewReferencia: string;
  };
  nuevaConsulta: {
    title: string;
    questionLabel: string;
    questionPlaceholder: string;
    skipAnimation: string;
    startButton: string;
    tossingLine: (linea: number) => string;
    revealing: string;
  };
  resultado: {
    principalTitle: string;
    resultanteTitle: string;
    juicioLabel: string;
    imagenLabel: string;
    lineasMutantesLabel: string;
    notaLabel: string;
    notaPlaceholder: string;
    notaSaved: string;
    withoutQuestion: string;
    backToDiario: string;
    notFound: string;
    favoriteAdd: string;
    favoriteRemove: string;
  };
  diario: {
    title: string;
    empty: string;
    searchPlaceholder: string;
    filterByHexagramLabel: string;
    filterAll: string;
    favoriteOnlyLabel: string;
    favoriteBadge: string;
    consultOn: (fecha: string) => string;
  };
  referencia: {
    title: string;
    searchPlaceholder: string;
    lineasLabel: string;
    trigramaSuperiorLabel: string;
    trigramaInferiorLabel: string;
    backToReferencia: string;
  };
  settings: {
    languageLabel: string;
    themeLight: string;
    themeDark: string;
  };
  ajustes: {
    title: string;
    description: string;
    exportTitle: string;
    exportDescription: string;
    exportButton: string;
    exportEmpty: string;
    importTitle: string;
    importDescription: string;
    importButton: string;
    importSuccess: (importadas: number, omitidas: number) => string;
    importError: string;
  };
  common: {
    loading: string;
  };
}
