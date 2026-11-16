import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CalendarRange, Clock, Layers, Timer } from "lucide-react";
import { getAllSeries, getSeriesBySlug } from "@/lib/data/series";
import { getEventsBySeriesSlug } from "@/lib/data/events";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { DetailShell, DetailTitle, GuaranteedPanel, DescriptionCard } from "@/components/events/Detail";
import { formatDateRangeIt, formatDayNumber, formatMonthFullIt, formatNumberIt } from "@/lib/utils";

// Le pagine sono generate in anticipo; questa impostazione le rigenera al
// massimo ogni ora, così i tornei che diventano passati spariscono da soli
// anche senza un nuovo salvataggio dal pannello.
export const revalidate = 3600;

export function generateStaticParams() {
  return getAllSeries().map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) return {};

  const description = series.description ?? series.title;

  return {
    title: series.title,
    description,
    openGraph: {
      title: series.title,
      description,
      images: series.images.map((url) => ({ url })),
    },
  };
}

export default async function SeriePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) notFound();

  const flights = getEventsBySeriesSlug(series.slug);

  return (
    <DetailShell backHref="/tornei" backLabel="Torna al calendario" images={series.images} imageAlt={`Locandina ${series.title}`}>
      <DetailTitle
        kicker={
          <div className="flex flex-wrap gap-2">
            <Badge>Multi-day</Badge>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-foreground/90">
              <CalendarRange size={15} className="text-gold" />
              {formatDateRangeIt(series.startDate, series.endDate)}
            </span>
          </div>
        }
      >
        {series.title}
      </DetailTitle>

      {series.guaranteed ? <GuaranteedPanel label="Montepremi garantito complessivo" amount={series.guaranteed} /> : null}

      <Reveal className="flex flex-col gap-3">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">Tappe e flight</h2>

        {flights.length === 0 ? (
          <p className="card-static p-5 text-muted">Nessuna tappa pubblicata per il momento.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {flights.map((flight) => (
              <Link key={flight.slug} href={`/eventi/${flight.slug}`} className="card-modern group flex items-stretch overflow-hidden">
                <div className="flex w-20 shrink-0 flex-col items-center justify-center gap-0.5 border-r border-white/[0.06] bg-white/[0.03] sm:w-24">
                  <span className="font-display text-3xl font-extrabold leading-none tracking-tight text-gold-gradient">
                    {formatDayNumber(flight.date)}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-muted">{formatMonthFullIt(flight.date)}</span>
                </div>
                <div className="flex flex-1 flex-col gap-2 px-4 py-4 sm:px-5">
                  <div className="flex flex-wrap items-center gap-2">
                    {flight.phase && <Badge>{flight.phase}</Badge>}
                    <span className="font-semibold text-foreground transition-colors group-hover:text-gold-light">{series.title}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                    <span className="flex items-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 py-1">
                      <Clock size={13} className="text-gold" />
                      {flight.time}
                    </span>
                    <span className="rounded-full bg-white/[0.05] px-2.5 py-1">
                      Buy-in <strong className="text-foreground">{formatNumberIt(flight.buyIn)}</strong>
                    </span>
                    {flight.startingStack ? (
                      <span className="flex items-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 py-1">
                        <Layers size={13} className="text-gold" />
                        {formatNumberIt(flight.startingStack)}
                      </span>
                    ) : null}
                    {flight.levelDurationMinutes ? (
                      <span className="flex items-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 py-1">
                        <Timer size={13} className="text-gold" />
                        {flight.levelDurationMinutes} min
                      </span>
                    ) : null}
                  </div>
                </div>
                <span className="hidden items-center pr-5 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gold-light sm:flex">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        )}
      </Reveal>

      {series.description ? <DescriptionCard text={series.description} /> : null}

      <Reveal>
        <Button href="/tornei" size="lg" className="w-full sm:w-auto">
          Altri tornei <ArrowRight size={18} />
        </Button>
      </Reveal>
    </DetailShell>
  );
}
