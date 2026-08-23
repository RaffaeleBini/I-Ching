import type { Dictionary } from "../dictionary";

export const gl: Dictionary = {
  app: {
    title: "I Ching",
  },
  nav: {
    diario: "Diario",
    referencia: "Referencia",
  },
  home: {
    tagline: "Un espazo de calma para as túas consultas ao I Ching.",
    newConsultation: "Nova consulta",
    viewDiario: "Ver diario",
    viewReferencia: "Explorar os 64 hexagramas",
  },
  nuevaConsulta: {
    title: "Nova consulta",
    questionLabel: "A túa pregunta (opcional)",
    questionPlaceholder: "Que che gustaría preguntar?",
    skipAnimation: "Saltar animación",
    startButton: "Lanzar as moedas",
    tossingLine: (linea) => `Lanzando a liña ${linea} de 6…`,
    revealing: "Revelando o hexagrama…",
  },
  resultado: {
    principalTitle: "Hexagrama principal",
    resultanteTitle: "Hexagrama resultante",
    juicioLabel: "O xuízo",
    imagenLabel: "A imaxe",
    lineasMutantesLabel: "Liñas mutantes",
    notaLabel: "A túa reflexión",
    notaPlaceholder: "Escribe aquí as túas propias notas sobre esta consulta…",
    notaSaved: "Gardado",
    withoutQuestion: "Sen pregunta",
    backToDiario: "Volver ao diario",
    notFound: "Non se atopou esta consulta.",
  },
  diario: {
    title: "Diario",
    empty: "Aínda non hai consultas gardadas.",
    searchPlaceholder: "Buscar en preguntas e notas…",
    filterByHexagramLabel: "Hexagrama",
    filterAll: "Todos",
    consultOn: (fecha) => `Consulta do ${fecha}`,
  },
  referencia: {
    title: "Referencia",
    searchPlaceholder: "Buscar por número ou nome…",
    lineasLabel: "As liñas",
    trigramaSuperiorLabel: "Trigrama superior",
    trigramaInferiorLabel: "Trigrama inferior",
    backToReferencia: "Volver á referencia",
  },
  settings: {
    languageLabel: "Idioma",
    themeLight: "Modo claro",
    themeDark: "Modo escuro",
  },
  common: {
    loading: "Cargando…",
  },
};
