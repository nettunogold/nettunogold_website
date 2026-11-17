import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock, Coins, Layers, Timer } from "lucide-react";
import { getEventBySlug, getEvents } from "@/lib/data/events";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { DetailShell, DetailTitle, StatRow, StatTile, GuaranteedPanel, DescriptionCard } from "@/components/events/Detail";
import { formatDateIt, formatNumberIt } from "@/lib/utils";

export function generateStaticParams() {
  return getEvents().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  const description = event.description ?? event.title;

  return {
    title: event.title,
    description,
    openGraph: {
      title: event.title,
      description,
      images: event.images.map((url) => ({ url })),
    },
  };
}

export default async function EventoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <DetailShell backHref="/tornei" backLabel="Torna al calendario" images={event.images} imageAlt={`Locandina ${event.title}`}>
      <DetailTitle
        kicker={
          <div className="flex flex-wrap gap-2">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/90">
              <CalendarDays size={15} className="text-gold" />
              {formatDateIt(event.date)}
            </span>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/90">
              <Clock size={15} className="text-gold" />
              {event.time}
            </span>
          </div>
        }
      >
        {event.title}
      </DetailTitle>

      {/* Telefono: tre righe. Da tablet in su: blocchi in griglia. */}
      <Reveal delay={0.05} className="flex flex-col gap-2 sm:hidden">
        <StatRow icon={Coins} label="Buy-in" value={formatNumberIt(event.buyIn)} highlight />
        {event.startingStack ? (
          <StatRow icon={Layers} label="Stack iniziale" value={formatNumberIt(event.startingStack)} />
        ) : null}
        <StatRow
          icon={Timer}
          label="Durata livelli"
          value={event.levelDurationMinutes ? `${event.levelDurationMinutes} min` : "—"}
        />
      </Reveal>

      <Reveal delay={0.05} className="hidden grid-cols-2 gap-3 sm:grid sm:grid-cols-3">
        <StatTile icon={Coins} label="Buy-in" value={formatNumberIt(event.buyIn)} highlight />
        {event.startingStack ? (
          <StatTile icon={Layers} label="Stack iniziale" value={formatNumberIt(event.startingStack)} />
        ) : null}
        <StatTile
          icon={Timer}
          label="Durata livelli"
          value={event.levelDurationMinutes ? `${event.levelDurationMinutes} min` : "—"}
        />
      </Reveal>

      {event.guaranteed ? (
        <GuaranteedPanel label="Montepremi garantito" amount={event.guaranteed} firstPrize={event.firstPrize} />
      ) : event.firstPrize ? (
        <GuaranteedPanel label="Garantito al primo" amount={event.firstPrize} />
      ) : null}

      {event.description ? <DescriptionCard text={event.description} /> : null}

      <Reveal>
        <Button href="/tornei" size="lg" className="w-full sm:w-auto">
          Altri tornei <ArrowRight size={18} />
        </Button>
      </Reveal>
    </DetailShell>
  );
}
