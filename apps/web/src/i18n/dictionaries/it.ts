import type { Dictionary } from "../dictionary";

export const it: Dictionary = {
  app: {
    title: "I Ching",
  },
  nav: {
    diario: "Diario",
    referencia: "Riferimento",
  },
  home: {
    tagline: "Uno spazio di calma per le tue consultazioni dell'I Ching.",
    newConsultation: "Nuova consultazione",
    viewDiario: "Vedi il diario",
    viewReferencia: "Esplora i 64 esagrammi",
  },
  nuevaConsulta: {
    title: "Nuova consultazione",
    questionLabel: "La tua domanda (facoltativa)",
    questionPlaceholder: "Cosa vorresti chiedere?",
    skipAnimation: "Salta animazione",
    startButton: "Lancia le monete",
    tossingLine: (linea) => `Lancio della linea ${linea} di 6…`,
    revealing: "Rivelazione dell'esagramma…",
  },
  resultado: {
    principalTitle: "Esagramma principale",
    resultanteTitle: "Esagramma risultante",
    juicioLabel: "Il giudizio",
    imagenLabel: "L'immagine",
    lineasMutantesLabel: "Linee mutanti",
    notaLabel: "La tua riflessione",
    notaPlaceholder: "Scrivi qui le tue note su questa consultazione…",
    notaSaved: "Salvato",
    withoutQuestion: "Senza domanda",
    backToDiario: "Torna al diario",
    notFound: "Consultazione non trovata.",
  },
  diario: {
    title: "Diario",
    empty: "Ancora nessuna consultazione salvata.",
    searchPlaceholder: "Cerca tra domande e note…",
    filterByHexagramLabel: "Esagramma",
    filterAll: "Tutti",
    consultOn: (fecha) => `Consultazione del ${fecha}`,
  },
  referencia: {
    title: "Riferimento",
    searchPlaceholder: "Cerca per numero o nome…",
    lineasLabel: "Le linee",
    trigramaSuperiorLabel: "Trigramma superiore",
    trigramaInferiorLabel: "Trigramma inferiore",
    backToReferencia: "Torna al riferimento",
  },
  settings: {
    languageLabel: "Lingua",
    themeLight: "Modalità chiara",
    themeDark: "Modalità scura",
  },
  common: {
    loading: "Caricamento…",
  },
};
