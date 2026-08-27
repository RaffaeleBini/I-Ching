import type { Dictionary } from "../dictionary";

export const es: Dictionary = {
  app: {
    title: "I Ching",
  },
  nav: {
    diario: "Diario",
    referencia: "Referencia",
    ajustes: "Ajustes",
  },
  home: {
    tagline: "Un espacio de calma para tus consultas al I Ching.",
    newConsultation: "Nueva consulta",
    viewDiario: "Ver diario",
    viewReferencia: "Explorar los 64 hexagramas",
  },
  nuevaConsulta: {
    title: "Nueva consulta",
    questionLabel: "Tu pregunta (opcional)",
    questionPlaceholder: "¿Qué te gustaría preguntar?",
    skipAnimation: "Saltar animación",
    startButton: "Lanzar las monedas",
    tossingLine: (linea) => `Lanzando línea ${linea} de 6…`,
    revealing: "Revelando el hexagrama…",
  },
  resultado: {
    principalTitle: "Hexagrama principal",
    resultanteTitle: "Hexagrama resultante",
    juicioLabel: "El juicio",
    imagenLabel: "La imagen",
    lineasMutantesLabel: "Líneas mutantes",
    notaLabel: "Tu reflexión",
    notaPlaceholder: "Escribe aquí tus propias notas sobre esta consulta…",
    notaSaved: "Guardado",
    withoutQuestion: "Sin pregunta",
    backToDiario: "Volver al diario",
    notFound: "No se encontró esta consulta.",
    favoriteAdd: "Marcar como favorita",
    favoriteRemove: "Quitar de favoritas",
  },
  diario: {
    title: "Diario",
    empty: "Todavía no hay consultas guardadas.",
    searchPlaceholder: "Buscar en preguntas y notas…",
    filterByHexagramLabel: "Hexagrama",
    filterAll: "Todos",
    favoriteOnlyLabel: "Solo favoritas",
    favoriteBadge: "Favorita",
    consultOn: (fecha) => `Consulta del ${fecha}`,
  },
  referencia: {
    title: "Referencia",
    searchPlaceholder: "Buscar por número o nombre…",
    lineasLabel: "Las líneas",
    trigramaSuperiorLabel: "Trigrama superior",
    trigramaInferiorLabel: "Trigrama inferior",
    backToReferencia: "Volver a la referencia",
  },
  settings: {
    languageLabel: "Idioma",
    themeLight: "Modo claro",
    themeDark: "Modo oscuro",
  },
  ajustes: {
    title: "Ajustes",
    description: "Gestiona una copia de seguridad local de tu diario de consultas.",
    exportTitle: "Exportar diario",
    exportDescription:
      "Descarga todas tus consultas guardadas en un archivo JSON, para conservarlas o llevarlas a otro dispositivo.",
    exportButton: "Descargar copia de seguridad",
    exportEmpty: "Todavía no hay consultas guardadas para exportar.",
    importTitle: "Importar diario",
    importDescription:
      "Selecciona un archivo JSON exportado previamente para restaurar o añadir consultas a tu diario. Las consultas con el mismo identificador se actualizan; el resto se añaden.",
    importButton: "Seleccionar archivo…",
    importSuccess: (importadas, omitidas) =>
      omitidas > 0
        ? `Se importaron ${importadas} consulta(s); se omitieron ${omitidas} entrada(s) no válida(s).`
        : `Se importaron ${importadas} consulta(s).`,
    importError: "No se pudo leer el archivo. Verifica que sea una copia de seguridad válida.",
  },
  common: {
    loading: "Cargando…",
  },
};
