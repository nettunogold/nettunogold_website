import { ArrowRight, CalendarHeart, Users, Trophy, LayoutGrid } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { businessInfo } from "@/lib/site-config";
import { formatNumberIt } from "@/lib/utils";

const stats = [
  { icon: CalendarHeart, value: `${new Date().getFullYear() - businessInfo.stats.since}+`, label: "Anni di attività" },
  { icon: Users, value: `${formatNumberIt(businessInfo.stats.members)}+`, label: "Soci" },
  { icon: Trophy, value: `${businessInfo.stats.tournamentsPerYear}`, label: "Tornei l'anno" },
  { icon: LayoutGrid, value: `${businessInfo.stats.tables}`, label: "Tavoli da gioco" },
];

const introText = `Nato nel ${businessInfo.stats.since}, Nettuno Gold è oggi uno dei punti di riferimento del Texas Hold'em nel bolognese: ${businessInfo.stats.areaSqm} m² di sala, ${businessInfo.stats.tables} tavoli e uno staff che segue ogni torneo dal primo all'ultimo livello.`;

export function ClubIntro() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]"
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

          <dl className="grid grid-cols-2 gap-3 sm:gap-5">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.08 * i} className={i % 2 === 1 ? "sm:translate-y-8" : ""}>
                <div className="card-modern flex flex-col gap-4 p-5 sm:p-7">
                  <span className="icon-orb h-11 w-11">
                    <stat.icon size={20} />
                  </span>
                  <div>
                    <dd className="font-display text-3xl font-bold tracking-tight text-gold-gradient sm:text-5xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">{stat.label}</dt>
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
