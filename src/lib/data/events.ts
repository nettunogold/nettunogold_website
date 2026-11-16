import { loadRawContent } from "@/lib/content-loader";
import { eventSchema, type Event } from "@/lib/schemas/event";
import { todayISO } from "@/lib/today";

function formatZodIssues(issues: { path: PropertyKey[]; message: string }[]) {
  return issues
    .map((issue) => `  • campo "${issue.path.map(String).join(".") || "?"}": ${issue.message}`)
    .join("\n");
}

// Nessuna cache in memoria: i file vengono riletti a ogni chiamata. Il
// volume di contenuti è ridotto (poche decine di file), quindi il costo è
// trascurabile — ed è indispensabile per vedere subito, anche in sviluppo,
// i contenuti appena salvati dal pannello CMS senza dover riavviare il
// server (con una cache "una volta sola" il processo non si accorgerebbe
// mai dei nuovi file scritti su disco dal CMS).
function parseAllEvents(): Event[] {
  const rawEvents = loadRawContent("eventi");

  const parsed = rawEvents.map((raw, index) => {
    const result = eventSchema.safeParse(raw);
    if (!result.success) {
      throw new Error(
        `\n\nERRORE nel torneo #${index + 1} in content/eventi/:\n` +
          `${formatZodIssues(result.error.issues)}\n\n` +
          `Apri il file dell'evento indicato in "content/eventi/" e correggi i campi sopra elencati.\n`
      );
    }
    return { event: result.data, explicitSlug: Boolean((raw as { slug?: unknown })?.slug) };
  });

  // Slug unici: lo slug automatico è "titolo-GG-MM", quindi due tornei con lo
  // stesso nome nello stesso giorno di anni diversi (es. un torneo annuale
  // creato di nuovo invece di spostare la data) avrebbero lo stesso
  // indirizzo. In quel caso si aggiunge l'anno.
  const counts = new Map<string, number>();
  for (const { event } of parsed) counts.set(event.slug, (counts.get(event.slug) ?? 0) + 1);
  const events = parsed.map(({ event, explicitSlug }) =>
    !explicitSlug && (counts.get(event.slug) ?? 0) > 1
      ? { ...event, slug: `${event.slug}-${event.date.slice(0, 4)}` }
      : event
  );

  return events.sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
}

export function getEvents(): Event[] {
  return parseAllEvents();
}

export function getUpcomingEvents(limit?: number): Event[] {
  const today = todayISO();
  const upcoming = parseAllEvents().filter((event) => event.date >= today);
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

export function getPastEvents(): Event[] {
  const today = todayISO();
  return parseAllEvents()
    .filter((event) => event.date < today)
    .sort((a, b) => `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`));
}

export function getEventBySlug(slug: string): Event | undefined {
  return parseAllEvents().find((event) => event.slug === slug);
}

// Tutti i flight/tornei collegati a una serie (es. tutti i Day di un
// festival), ordinati cronologicamente. Usata dalla pagina della serie.
export function getEventsBySeriesSlug(seriesSlug: string): Event[] {
  return parseAllEvents().filter((event) => event.seriesSlug === seriesSlug);
}
