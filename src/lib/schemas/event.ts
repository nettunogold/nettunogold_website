import { z } from "zod";
import { slugify, dateSlugSuffix } from "@/lib/slug";
import { dayFieldSchema, monthFieldSchema, yearFieldSchema, isValidCalendarDate } from "@/lib/schemas/date-parts";
import { optionalNumber } from "@/lib/schemas/optional-number";

// Fuori dalla cartella delle immagini caricate (public/eventi): così dal
// pannello non si può eliminare per errore.
export const DEFAULT_EVENT_IMAGE = "/images/placeholder-torneo.svg";
// Percorso usato prima dello spostamento: i contenuti che lo contengono
// ancora vengono reindirizzati qui.
export const LEGACY_PLACEHOLDER = "/eventi/placeholder-torneo.svg";

const torneoGroupSchema = z
  .object({
    title: z
      .string("Il titolo del torneo è obbligatorio")
      .min(3, "Il titolo del torneo deve avere almeno 3 caratteri"),

    day: dayFieldSchema,
    month: monthFieldSchema,
    year: yearFieldSchema,

    time: z
      .string("L'orario è obbligatorio")
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "L'orario deve essere nel formato HH:MM (es. 20:00)"),
  })
  .refine((data) => isValidCalendarDate(Number(data.day), Number(data.month), Number(data.year)), {
    message: "La data inserita non esiste nel calendario (controlla giorno e mese)",
    path: ["day"],
  });

const serieGroupSchema = z.object({
  // Collega questo torneo a una Serie (content/serie/): usa lo slug della
  // serie, es. "pgs-spring-edition". Se non appartiene a nessuna serie: null.
  seriesSlug: z.string().nullable().default(null),

  // Etichetta del flight dentro una serie multiday, es. "Day 1A", "Day 2C",
  // "Final Day". Ha senso solo se seriesSlug è compilato. Altrimenti: null.
  phase: z.string().nullable().default(null),
});

const dettagliGroupSchema = z.object({
  buyIn: z.number("Il buy-in deve essere un numero (in euro)").nonnegative("Il buy-in non può essere negativo"),

  guaranteed: optionalNumber(z.number("Il garantito deve essere un numero (in euro)").nonnegative()),

  startingStack: optionalNumber(
    z.number("Lo stack iniziale deve essere un numero (in chips)").positive("Lo stack iniziale deve essere maggiore di zero")
  ),

  // Premio garantito al primo classificato (in euro). Compare solo nella
  // pagina del torneo, sotto il garantito. Se non c'è: null.
  firstPrize: optionalNumber(z.number("Il GTD primo deve essere un numero (in euro)").nonnegative()),

  // Prezzo speciale (euro, intero). Compare solo nella pagina del torneo.
  specialPrice: optionalNumber(
    z.number("Lo special price deve essere un numero (in euro)").int("Lo special price deve essere un numero intero").nonnegative()
  ),

  // Durata di un livello di blind, in minuti. Può cambiare con la struttura:
  // "20/25" (il pannello salva un numero se è uno solo, es. 20). Se non
  // nota: null.
  levelDurationMinutes: z
    .preprocess(
      (value) => (value === "" || value == null ? null : typeof value === "number" ? String(value) : value),
      z
        .string()
        .transform((v) => v.replace(/\s+/g, ""))
        .pipe(z.string().regex(/^\d+(\/\d+)*$/, "La durata dei livelli deve essere in minuti, es. 20 oppure 20/25"))
        .nullable()
    )
    .default(null),
});

const eventShape = z.object({
  // Generato automaticamente da titolo + data se non specificato: lo staff
  // non deve mai compilarlo a mano (vedi .transform() più sotto).
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Lo slug può contenere solo lettere minuscole, numeri e trattini (es. 'freezeout-garantito-3000')"
    )
    .nullable()
    .default(null),

  torneo: torneoGroupSchema,
  serie: serieGroupSchema.default({ seriesSlug: null, phase: null }),
  dettagli: dettagliGroupSchema,

  description: z
    .string()
    .nullable()
    .default(null)
    .transform((value) => (value && value.trim().length > 0 ? value : null)),

  // Una o più locandine: mostrate incolonnate, nell'ordine in cui sono
  // state aggiunte, nella scheda torneo. Il pannello salva una lista vuota
  // quando non ci sono locandine personalizzate: in quel caso si usa quella
  // di default (che il pannello non mostra né salva mai).
  images: z
    .array(z.string())
    .default([])
    .transform((list) => list.map((src) => (src === LEGACY_PLACEHOLDER ? DEFAULT_EVENT_IMAGE : src)))
    .transform((list) => (list.length > 0 ? list : [DEFAULT_EVENT_IMAGE])),
});

export const eventSchema = eventShape.transform((data) => {
  const date = `${data.torneo.year}-${data.torneo.month}-${data.torneo.day}`;

  return {
    title: data.torneo.title,
    slug: data.slug ?? `${slugify(data.torneo.title)}-${dateSlugSuffix(date)}`,
    date,
    time: data.torneo.time,
    buyIn: data.dettagli.buyIn,
    guaranteed: data.dettagli.guaranteed,
    startingStack: data.dettagli.startingStack,
    levelDurationMinutes: data.dettagli.levelDurationMinutes,
    firstPrize: data.dettagli.firstPrize,
    specialPrice: data.dettagli.specialPrice,
    seriesSlug: data.serie.seriesSlug,
    phase: data.serie.phase,
    description: data.description,
    images: data.images,
  };
});

export type Event = z.infer<typeof eventSchema>;
