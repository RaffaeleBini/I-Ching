import type { HexagramContent, HexagramData, Locale } from "../types/hexagram";
import { LOCALES } from "../types/hexagram";
import { getTrigramsForHexagramNumber } from "./hexagrams-index";

/**
 * Base de datos de los 64 hexagramas.
 *
 * Decisión de contenido (ver plan de proyecto): ninguno de los dos PDF de
 * referencia disponibles puede usarse como fuente de los textos
 * interpretativos (ambos son material protegido por copyright, derivado de
 * Richard Wilhelm). El contenido definitivo se redactará a partir de la
 * traducción de James Legge (1899, dominio público), reescrita en tono
 * propio — tarea de contenido independiente de esta iteración de ingeniería.
 *
 * Por eso, en esta primera iteración:
 * - Los campos estructurales (número, trigramas, símbolo Unicode) están
 *   completos y verificados para los 64 hexagramas: son datos de dominio
 *   público (símbolo Unicode calculado con una fórmula determinista; los
 *   trigramas derivan de la tabla verificada en `hexagrams-index.ts`).
 * - Solo los hexagramas 1 y 2 tienen contenido interpretativo real de
 *   ejemplo (juicio, imagen, líneas), escrito de forma original en las 3
 *   lenguas soportadas, para validar el diseño de la interfaz.
 * - Los hexagramas 3 a 64 usan placeholders explícitos y localizados, tanto
 *   para el nombre chino tradicional (que no se afirma sin verificar) como
 *   para el contenido interpretativo, de forma que rellenar los textos
 *   definitivos más adelante sea un simple reemplazo de datos, sin tocar
 *   código. `hexagrams.test.ts` valida que la estructura no se rompa.
 */

const PLACEHOLDER_NAME: Record<Locale, (numero: number) => string> = {
  es: (numero) => `Hexagrama ${numero}`,
  gl: (numero) => `Hexagrama ${numero}`,
  it: (numero) => `Esagramma ${numero}`,
};

const PLACEHOLDER_JUICIO: Record<Locale, (numero: number) => string> = {
  es: (numero) =>
    `[PENDIENTE es: juicio del hexagrama ${numero} — por redactar a partir de Legge]`,
  gl: (numero) =>
    `[PENDENTE gl: xuízo do hexagrama ${numero} — por redactar a partir de Legge]`,
  it: (numero) =>
    `[IN SOSPESO it: giudizio dell'esagramma ${numero} — da scrivere sulla base di Legge]`,
};

const PLACEHOLDER_IMAGEN: Record<Locale, (numero: number) => string> = {
  es: (numero) =>
    `[PENDIENTE es: imagen del hexagrama ${numero} — por redactar a partir de Legge]`,
  gl: (numero) =>
    `[PENDENTE gl: imaxe do hexagrama ${numero} — por redactar a partir de Legge]`,
  it: (numero) =>
    `[IN SOSPESO it: immagine dell'esagramma ${numero} — da scrivere sulla base di Legge]`,
};

const PLACEHOLDER_LINEA: Record<Locale, (numero: number, linea: number) => string> = {
  es: (numero, linea) =>
    `[PENDIENTE es: texto de la línea ${linea} del hexagrama ${numero}]`,
  gl: (numero, linea) =>
    `[PENDENTE gl: texto da liña ${linea} do hexagrama ${numero}]`,
  it: (numero, linea) =>
    `[IN SOSPESO it: testo della linea ${linea} dell'esagramma ${numero}]`,
};

function buildPlaceholderContent(numero: number): Record<Locale, HexagramContent> {
  const contenido = {} as Record<Locale, HexagramContent>;
  for (const locale of LOCALES) {
    contenido[locale] = {
      juicio: PLACEHOLDER_JUICIO[locale](numero),
      imagen: PLACEHOLDER_IMAGEN[locale](numero),
      lineas: [1, 2, 3, 4, 5, 6].map((linea) => ({
        numero: linea as 1 | 2 | 3 | 4 | 5 | 6,
        texto: PLACEHOLDER_LINEA[locale](numero, linea),
      })),
    };
  }
  return contenido;
}

function unicodeSymbolFor(numero: number): string {
  // Bloque Unicode "Yijing Hexagram Symbols" (U+4DC0–U+4DFF), ordenado según
  // la secuencia tradicional King Wen: U+4DC0 = hexagrama 1, U+4DFF = hexagrama 64.
  return String.fromCodePoint(0x4dc0 + (numero - 1));
}

function buildPlaceholderHexagram(numero: number): HexagramData {
  const { inferior, superior } = getTrigramsForHexagramNumber(numero);
  const nombre = {} as Record<Locale, string>;
  for (const locale of LOCALES) {
    nombre[locale] = PLACEHOLDER_NAME[locale](numero);
  }
  return {
    numero,
    nombre_chino: "[PENDIENTE: nombre chino tradicional por verificar]",
    nombre,
    trigrama_superior: superior,
    trigrama_inferior: inferior,
    simbolo_unicode: unicodeSymbolFor(numero),
    contenido: buildPlaceholderContent(numero),
  };
}

const HEXAGRAM_1: HexagramData = {
  numero: 1,
  nombre_chino: "Qián 乾",
  nombre: {
    es: "Lo Creativo",
    gl: "O Creativo",
    it: "Il Creativo",
  },
  trigrama_superior: "Qián",
  trigrama_inferior: "Qián",
  simbolo_unicode: unicodeSymbolFor(1),
  contenido: {
    es: {
      juicio:
        "Lo Creativo es fuente de éxito sostenido a través de la perseverancia. Su fuerza se expresa en la constancia, no en la prisa.",
      imagen:
        "El cielo se mueve con un vigor incesante: así el que aspira a la excelencia se fortalece día a día sin descanso.",
      lineas: [
        {
          numero: 1,
          texto:
            "El potencial permanece oculto. No es momento de actuar; hay que confiar en la propia fuerza en silencio.",
        },
        {
          numero: 2,
          texto:
            "La influencia comienza a manifestarse. Es momento propicio para buscar el consejo de quienes ya recorrieron el camino.",
        },
        {
          numero: 3,
          texto:
            "La actividad constante trae éxito, pero también expone al riesgo si se descuida la vigilancia.",
        },
        {
          numero: 4,
          texto:
            "Se abren varios caminos posibles. Elegir con criterio propio, sin miedo a la duda, evita el error.",
        },
        {
          numero: 5,
          texto: "La influencia alcanza su plenitud y es reconocida por los demás.",
        },
        {
          numero: 6,
          texto:
            "El exceso de ambición, cuando ya se alcanzó la cumbre, puede aislar y traer arrepentimiento.",
        },
      ],
    },
    gl: {
      juicio:
        "O Creativo é fonte de éxito sostido a través da perseveranza. A súa forza exprésase na constancia, non na présa.",
      imagen:
        "O ceo móvese cun vigor incesante: así quen aspira á excelencia fortalécese día a día sen descanso.",
      lineas: [
        {
          numero: 1,
          texto:
            "O potencial permanece oculto. Non é momento de actuar; hai que confiar na propia forza en silencio.",
        },
        {
          numero: 2,
          texto:
            "A influencia comeza a manifestarse. É momento propicio para buscar o consello de quen xa percorreu o camiño.",
        },
        {
          numero: 3,
          texto:
            "A actividade constante trae éxito, pero tamén expón ao risco se se descoida a vixilancia.",
        },
        {
          numero: 4,
          texto:
            "Ábrense varios camiños posibles. Elixir con criterio propio, sen medo á dúbida, evita o erro.",
        },
        {
          numero: 5,
          texto: "A influencia alcanza a súa plenitude e é recoñecida polos demais.",
        },
        {
          numero: 6,
          texto:
            "O exceso de ambición, cando xa se alcanzou a cume, pode illar e traer arrepentimento.",
        },
      ],
    },
    it: {
      juicio:
        "Il Creativo è fonte di successo duraturo attraverso la perseveranza. La sua forza si esprime nella costanza, non nella fretta.",
      imagen:
        "Il cielo si muove con vigore incessante: così chi aspira all'eccellenza si rafforza giorno dopo giorno senza sosta.",
      lineas: [
        {
          numero: 1,
          texto:
            "Il potenziale resta nascosto. Non è il momento di agire; occorre confidare nella propria forza in silenzio.",
        },
        {
          numero: 2,
          texto:
            "L'influenza comincia a manifestarsi. È il momento propizio per cercare il consiglio di chi ha già percorso questa strada.",
        },
        {
          numero: 3,
          texto:
            "L'attività costante porta successo, ma espone anche al rischio se si trascura la vigilanza.",
        },
        {
          numero: 4,
          texto:
            "Si aprono diverse strade possibili. Scegliere con criterio proprio, senza timore del dubbio, evita l'errore.",
        },
        {
          numero: 5,
          texto: "L'influenza raggiunge la sua pienezza ed è riconosciuta dagli altri.",
        },
        {
          numero: 6,
          texto:
            "L'eccesso di ambizione, una volta raggiunta la vetta, può isolare e portare al rimpianto.",
        },
      ],
    },
  },
};

const HEXAGRAM_2: HexagramData = {
  numero: 2,
  nombre_chino: "Kūn 坤",
  nombre: {
    es: "Lo Receptivo",
    gl: "O Receptivo",
    it: "Il Ricettivo",
  },
  trigrama_superior: "Kūn",
  trigrama_inferior: "Kūn",
  simbolo_unicode: unicodeSymbolFor(2),
  contenido: {
    es: {
      juicio:
        "Lo Receptivo prospera mediante la entrega y la perseverancia tranquila, como la yegua que avanza con firmeza y docilidad.",
      imagen:
        "La tierra en su amplitud todo lo sostiene: así quien cultiva un carácter generoso da cabida a cuanto lo rodea.",
      lineas: [
        {
          numero: 1,
          texto:
            "Los primeros signos de cambio, por pequeños que sean, anuncian lo que vendrá si no se les presta atención a tiempo.",
        },
        {
          numero: 2,
          texto:
            "La rectitud natural y sencilla, sin artificio, basta para que todo prospere.",
        },
        {
          numero: 3,
          texto:
            "Es tiempo de reservar los propios talentos y actuar con discreción, dejando que el mérito hable por sí solo.",
        },
        {
          numero: 4,
          texto:
            "La prudencia y el silencio protegen en un momento delicado; no es tiempo de destacar.",
        },
        {
          numero: 5,
          texto:
            "La moderación y la discreción, incluso en una posición elevada, traen la mejor fortuna.",
        },
        {
          numero: 6,
          texto:
            "Cuando la fuerza receptiva se enfrenta abiertamente a lo creativo, ambas partes resultan dañadas.",
        },
      ],
    },
    gl: {
      juicio:
        "O Receptivo prospera mediante a entrega e a perseveranza tranquila, coma a egua que avanza con firmeza e docilidade.",
      imagen:
        "A terra na súa amplitude todo o sostén: así quen cultiva un carácter xeneroso dá cabida a canto o rodea.",
      lineas: [
        {
          numero: 1,
          texto:
            "Os primeiros sinais de cambio, por pequenos que sexan, anuncian o que virá se non se lles presta atención a tempo.",
        },
        {
          numero: 2,
          texto:
            "A rectitude natural e sinxela, sen artificio, abonda para que todo prospere.",
        },
        {
          numero: 3,
          texto:
            "É tempo de reservar os propios talentos e actuar con discreción, deixando que o mérito fale por si só.",
        },
        {
          numero: 4,
          texto:
            "A prudencia e o silencio protexen nun momento delicado; non é tempo de destacar.",
        },
        {
          numero: 5,
          texto:
            "A moderación e a discreción, mesmo nunha posición elevada, traen a mellor fortuna.",
        },
        {
          numero: 6,
          texto:
            "Cando a forza receptiva se enfronta abertamente ao creativo, ambas as partes resultan danadas.",
        },
      ],
    },
    it: {
      juicio:
        "Il Ricettivo prospera attraverso l'abbandono fiducioso e la perseveranza tranquilla, come la cavalla che avanza con fermezza e docilità.",
      imagen:
        "La terra nella sua ampiezza sostiene ogni cosa: così chi coltiva un carattere generoso accoglie tutto ciò che lo circonda.",
      lineas: [
        {
          numero: 1,
          texto:
            "I primi segni di cambiamento, per quanto piccoli, annunciano ciò che verrà se non vi si presta attenzione in tempo.",
        },
        {
          numero: 2,
          texto:
            "La rettitudine naturale e semplice, senza artificio, basta perché tutto prosperi.",
        },
        {
          numero: 3,
          texto:
            "È tempo di riservare i propri talenti e agire con discrezione, lasciando che il merito parli da sé.",
        },
        {
          numero: 4,
          texto:
            "La prudenza e il silenzio proteggono in un momento delicato; non è tempo di distinguersi.",
        },
        {
          numero: 5,
          texto:
            "La moderazione e la discrezione, anche in una posizione elevata, portano la miglior fortuna.",
        },
        {
          numero: 6,
          texto:
            "Quando la forza ricettiva si scontra apertamente con quella creativa, entrambe le parti ne escono danneggiate.",
        },
      ],
    },
  },
};

const PLACEHOLDER_HEXAGRAMS: HexagramData[] = Array.from(
  { length: 62 },
  (_, index) => buildPlaceholderHexagram(index + 3),
);

export const HEXAGRAMS: readonly HexagramData[] = [
  HEXAGRAM_1,
  HEXAGRAM_2,
  ...PLACEHOLDER_HEXAGRAMS,
].sort((a, b) => a.numero - b.numero);

export function getHexagramData(numero: number): HexagramData {
  const hexagram = HEXAGRAMS.find((h) => h.numero === numero);
  if (!hexagram) {
    throw new Error(`No existe un hexagrama con número ${numero}`);
  }
  return hexagram;
}

export function getAllHexagrams(): readonly HexagramData[] {
  return HEXAGRAMS;
}
