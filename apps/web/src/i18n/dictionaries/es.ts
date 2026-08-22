import type { Dictionary } from "../dictionary";

export const es: Dictionary = {
  app: {
    title: "I Ching",
  },
  nav: {
    diario: "Diario",
  },
  home: {
    tagline: "Un espacio de calma para tus consultas al I Ching.",
    newConsultation: "Nueva consulta",
    viewDiario: "Ver diario",
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
  },
  diario: {
    title: "Diario",
    empty: "Todavía no hay consultas guardadas.",
    searchPlaceholder: "Buscar en preguntas y notas…",
    filterByHexagramLabel: "Hexagrama",
    filterAll: "Todos",
    consultOn: (fecha) => `Consulta del ${fecha}`,
  },
  settings: {
    languageLabel: "Idioma",
    themeLight: "Modo claro",
    themeDark: "Modo oscuro",
  },
  common: {
    loading: "Cargando…",
  },
};
