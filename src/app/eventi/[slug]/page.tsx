import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock, Coins, Layers, Tag, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getEventBySlug, getEvents } from "@/lib/data/events";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { DetailShell, DetailTitle, StatRow, StatTile, GuaranteedPanel, DescriptionCard } from "@/components/events/Detail";
import { cn, formatDateIt, formatNumberIt } from "@/lib/utils";

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

  // Con quattro dati la griglia diventa 2×2 (special price e buy-in in alto).
  const stats: { icon: LucideIcon; label: string; value: string; highlight?: boolean | "soft" }[] = [
    ...(event.specialPrice != null
      ? [{ icon: Tag, label: "Special price", value: formatNumberIt(event.specialPrice), highlight: "soft" as const }]
      : []),
    { icon: Coins, label: "Buy-in", value: formatNumberIt(event.buyIn), highlight: true },
    ...(event.startingStack ? [{ icon: Layers, label: "Stack iniziale", value: formatNumberIt(event.startingStack) }] : []),
    { icon: Timer, label: "Durata livelli", value: event.levelDurationMinutes ? `${event.levelDurationMinutes} min` : "—" },
  ];

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

      {/* Telefono: una riga per dato. Da tablet in su: blocchi in griglia. */}
      <Reveal delay={0.05} className="flex flex-col gap-2 sm:hidden">
        {stats.map((stat) => (
          <StatRow key={stat.label} {...stat} />
        ))}
      </Reveal>

      <Reveal
        delay={0.05}
        className={cn("hidden gap-3 sm:grid", stats.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}
      >
        {stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
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
