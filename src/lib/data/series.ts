import { loadRawContent } from "@/lib/content-loader";
import { seriesSchema, type Series } from "@/lib/schemas/series";
import { getEvents } from "@/lib/data/events";
import { todayISO } from "@/lib/today";

// Nessuna cache in memoria: vedi il commento in src/lib/data/events.ts.
function parseAllSeries(): Series[] {
  const rawSeries = loadRawContent("serie");

  const parsed = rawSeries.map((raw, index) => {
    const result = seriesSchema.safeParse(raw);
    if (!result.success) {
      const details = result.error.issues
        .map((issue) => `  • campo "${issue.path.join(".") || "?"}": ${issue.message}`)
        .join("\n");
      throw new Error(`\n\nERRORE nella serie #${index + 1} in content/serie/:\n${details}\n`);
    }
    return result.data;
  });

  // Le date della serie sono quelle della scheda serie. I flight possono
  // solo ALLUNGARE il periodo, mai accorciarlo o nasconderla (un flight con
  // una data sbagliata non deve far sparire la serie):
  //  - se ci sono flight futuri oltre la data di fine, la fine si sposta lì;
  //  - se la serie risulta conclusa ma ha flight futuri (serie riproposta
  //    spostando i flight), il periodo diventa quello dei flight futuri.
  const today = todayISO();
  const events = getEvents();
  const withFlightDates = parsed.map((series) => {
    const upcoming = events
      .filter((event) => event.seriesSlug === series.slug && event.date >= today)
      .map((event) => event.date)
      .sort();
    if (upcoming.length === 0) return series;
    const lastFlight = upcoming[upcoming.length - 1];
    if (series.endDate >= today) {
      return { ...series, endDate: lastFlight > series.endDate ? lastFlight : series.endDate };
    }
    return { ...series, startDate: upcoming[0], endDate: lastFlight };
  });

  return withFlightDates.sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function getAllSeries(): Series[] {
  return parseAllSeries();
}

// Serie in corso o future (non ancora concluse).
export function getActiveSeries(): Series[] {
  const today = todayISO();
  return parseAllSeries().filter((series) => series.endDate >= today);
}

export function getSeriesBySlug(slug: string): Series | undefined {
  return parseAllSeries().find((series) => series.slug === slug);
}
