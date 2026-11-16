import { ArrowRight } from "lucide-react";
import { getUpcomingEvents } from "@/lib/data/events";
import { getAllSeries } from "@/lib/data/series";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { EventCard } from "@/components/events/EventCard";

export function ProssimiTornei() {
  const events = getUpcomingEvents().slice(0, 4);
  const seriesTitles = Object.fromEntries(getAllSeries().map((series) => [series.slug, series.title]));

  return (
    <section className="relative py-14 sm:py-24 md:py-32">
      <Container className="flex flex-col gap-8 sm:gap-14">
        <SectionHeading
          title="Prossimi tornei"
          subtitle="I prossimi appuntamenti in sala."
        />

        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event, i) => (
              <Reveal key={event.slug} delay={0.08 * i} className="flex">
                <EventCard
                  event={event}
                  priority={i === 0}
                  seriesTitle={event.seriesSlug ? seriesTitles[event.seriesSlug] : undefined}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="card-static mx-auto max-w-md px-6 py-8 text-center text-muted">
            Nessun torneo programmato al momento. Torna a trovarci presto.
          </p>
        )}

        <Reveal className="flex justify-center">
          <Button href="/tornei" variant="secondary" size="lg">
            Vedi il calendario completo <ArrowRight size={18} />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
