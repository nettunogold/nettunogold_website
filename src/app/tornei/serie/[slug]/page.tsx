import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarRange } from "lucide-react";
import { getAllSeries, getSeriesBySlug } from "@/lib/data/series";
import { getEventsBySeriesSlug } from "@/lib/data/events";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { DetailShell, DetailTitle, GuaranteedPanel, DescriptionCard } from "@/components/events/Detail";
import { formatDateRangeIt, formatDateRangeShortIt } from "@/lib/utils";
import { FlightCard } from "@/components/events/card-parts";

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

  // Tipo e date: su telefono sopra la locandina (date in forma breve, così
  // stanno sulla stessa riga), da computer sopra il titolo.
  const kicker = (short: boolean) => (
    <div className="flex flex-wrap gap-2">
      <Badge>Multi-day</Badge>
      <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-foreground/90">
        <CalendarRange size={15} className="text-gold" />
        {short
          ? formatDateRangeShortIt(series.startDate, series.endDate)
          : formatDateRangeIt(series.startDate, series.endDate)}
      </span>
    </div>
  );

  return (
    <DetailShell
      backHref="/tornei"
      backLabel="Torna al calendario"
      backOnMobile={false}
      aboveImage={kicker(true)}
      images={series.images}
      imageAlt={`Locandina ${series.title}`}
    >
      <DetailTitle kicker={<div className="hidden lg:block">{kicker(false)}</div>}>
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
              <FlightCard key={flight.slug} flight={flight} />
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
