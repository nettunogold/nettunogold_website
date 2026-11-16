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

  // Date della serie ricavate dai suoi flight, quando ne ha: il calendario
  // reale sono i flight. Così, se lo staff sposta i flight a nuove date
  // (es. per riproporre la serie senza ricrearla), la serie torna visibile
  // e mostra le date giuste anche se le date nella scheda serie non sono
  // state aggiornate.
  const events = getEvents();
  const withFlightDates = parsed.map((series) => {
    const dates = events.filter((event) => event.seriesSlug === series.slug).map((event) => event.date).sort();
    if (dates.length === 0) return series;
    return { ...series, startDate: dates[0], endDate: dates[dates.length - 1] };
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
