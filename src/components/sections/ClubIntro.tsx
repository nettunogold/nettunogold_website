import { ArrowRight, Users, Trophy, LayoutGrid } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { businessInfo } from "@/lib/site-config";
import { cn, formatNumberIt } from "@/lib/utils";

const stats = [
  { icon: Users, value: `${formatNumberIt(businessInfo.stats.members)}+`, label: "Soci" },
  { icon: LayoutGrid, value: `${businessInfo.stats.tables}`, label: "Tavoli da gioco" },
  { icon: Trophy, value: `${businessInfo.stats.tournamentsPerYear}`, label: "Tornei l'anno" },
];

const introText = `Nettuno Gold è oggi uno dei punti di riferimento del Texas Hold'em nel bolognese: ${businessInfo.stats.areaSqm} m² di sala, ${businessInfo.stats.tables} tavoli e uno staff che segue ogni torneo dal primo all'ultimo livello.`;

export function ClubIntro() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-64 top-1/2 h-[48rem] w-[48rem] -translate-y-1/2 bg-[radial-gradient(circle,rgba(201,162,39,0.09),rgba(201,162,39,0.03)_40%,transparent_70%)]"
      />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5 sm:gap-6">
            <SectionHeading eyebrow="Il Club" title="Una casa per il poker a Bologna" align="left" />
            <Reveal delay={0.1} className="flex flex-col gap-4 text-lg leading-relaxed text-foreground/75">
              <p>{introText}</p>
              <p>Un ambiente elegante e curato, pensato per chi il poker lo vive con passione.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <Button href="/il-club" variant="secondary">
                Scopri la storia del club <ArrowRight size={18} />
              </Button>
            </Reveal>
          </div>

          {/* Telefono: righe a tutta larghezza. Tablet: tre blocchi affiancati.
              Computer: il primo dato in evidenza su tutta la riga, gli altri due sotto. */}
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-2 lg:gap-5">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.08 * i} className={cn("h-full", i === 0 && "lg:col-span-2")}>
                <div
                  className={cn(
                    "card-modern flex h-full items-center gap-4 px-5 py-4 sm:flex-col sm:items-start sm:p-6 lg:p-7",
                    i === 0 && "lg:flex-row lg:items-center lg:gap-6"
                  )}
                >
                  <span className={cn("icon-orb h-11 w-11 shrink-0", i === 0 && "lg:h-14 lg:w-14")}>
                    <stat.icon size={i === 0 ? 22 : 20} />
                  </span>
                  <div>
                    <dd className="font-display text-3xl font-bold leading-none tracking-tight text-gold-gradient sm:text-4xl lg:text-5xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">{stat.label}</dt>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
