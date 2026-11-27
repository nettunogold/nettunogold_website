import type { Metadata } from "next";
import { getUpcomingEvents } from "@/lib/data/events";
import { getActiveSeries, getAllSeries } from "@/lib/data/series";
import { Container } from "@/components/ui/Container";
import { TorneiExplorer } from "@/components/events/TorneiExplorer";
import { SeriesCard } from "@/components/events/SeriesCard";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PageBanner } from "@/components/ui/PageBanner";

// Le pagine sono generate in anticipo; questa impostazione le rigenera al
// massimo ogni ora, così i tornei che diventano passati spariscono da soli
// anche senza un nuovo salvataggio dal pannello.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Calendario Tornei",
  description:
    "Calendario dei prossimi tornei di poker sportivo a Nettuno Gold Bologna: date, buy-in, stack iniziale, formato e montepremi garantito.",
};

export default function TorneiPage() {
  const upcomingEvents = getUpcomingEvents();

  // La lista mostra tutti i tornei in programma, compresi i singoli flight
  // dei multi-day (Day 1A, Final Day...), segnalati con il nome della serie.
  const seriesTitles = Object.fromEntries(getAllSeries().map((series) => [series.slug, series.title]));

  const activeSeries = getActiveSeries();

  return (
    <>
      <PageBanner
        src="/sala/tavolo-nettuno-gold.jpg"
        alt="Giocatori al tavolo Nettuno Gold durante un torneo"
        title="Tornei"
      />
      <div className="pb-16 pt-10 sm:pt-14 md:pb-24">
        <Container className="flex flex-col gap-14 sm:gap-20">
          {activeSeries.length > 0 && (
            <div className="flex flex-col gap-6">
              <SectionTag>Multi-Day in programma</SectionTag>
              <div
                className={
                  activeSeries.length === 1
                    ? "grid grid-cols-1"
                    : "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
                }
              >
                {activeSeries.map((series) => (
                  <SeriesCard
                    key={series.slug}
                    series={series}
                    wide={activeSeries.length === 1}
                    flightCount={
                      upcomingEvents.filter((event) => event.seriesSlug === series.slug).length
                    }
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-6">
            <SectionTag>Tornei in Programma</SectionTag>
            <TorneiExplorer events={upcomingEvents} seriesTitles={seriesTitles} />
          </div>
        </Container>
      </div>
    </>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <Reveal y={10}>
      <Eyebrow>{children}</Eyebrow>
    </Reveal>
  );
}
