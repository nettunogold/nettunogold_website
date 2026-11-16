import type { Metadata } from "next";
import { Trophy, Target, Users2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoBanner } from "@/components/ui/PhotoBanner";
import { formatNumberIt } from "@/lib/utils";
import { businessInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Il Club",
  description:
    "La storia di Nettuno Gold, poker room di Bologna dal 2007: mission, valori e lo staff che rende possibile ogni torneo.",
};

const milestones = [
  {
    year: businessInfo.stats.since,
    title: "Le origini",
    text: "Nasce la realtà che oggi conosciamo come Nettuno Gold: pochi tavoli, una community di appassionati e la voglia di fare del poker un punto di riferimento cittadino.",
  },
  {
    year: businessInfo.stats.since + 6,
    title: "Crescita della sala",
    text: "La sala si amplia fino agli attuali 18 tavoli, con l'introduzione di uno staff dedicato alla gestione dei tornei e delle serate a tema.",
  },
  {
    year: 2025,
    title: "Nasce Nettuno Gold",
    text: "Il circolo cambia identità e diventa Nettuno Gold: nuovo brand, stessa community di quasi 2.000 soci e la stessa cura per ogni torneo.",
  },
];

const values = [
  {
    icon: Trophy,
    title: "Competenza",
    text: "Tornei gestiti da tournament director con anni di esperienza, per un gioco corretto e trasparente.",
  },
  {
    icon: Target,
    title: "Cura del dettaglio",
    text: "Dalla struttura livelli alla sala, ogni aspetto del torneo è pensato per l'esperienza del giocatore.",
  },
  {
    icon: Users2,
    title: "Community",
    text: "Quasi 2.000 soci: un club prima ancora che una sala da gioco, con eventi e serie stagionali dedicate.",
  },
  {
    icon: ShieldCheck,
    title: "Sicurezza",
    text: "Sala videosorvegliata e gioco regolamentato, per un ambiente affidabile in ogni torneo.",
  },
];

const staffRoles = [
  {
    role: "Tournament Director",
    text: "Coordina la struttura di ogni torneo, dalle blind ai regolamenti, garantendo il rispetto delle regole in ogni fase di gioco.",
  },
  {
    role: "Floorman",
    text: "Presente in sala durante tutto il torneo per gestire dispute, ruling e organizzazione dei tavoli.",
  },
  {
    role: "Dealer Team",
    text: "Squadra di dealer professionisti, formati per garantire ritmo di gioco e correttezza a ogni tavolo.",
  },
];

export default function IlClubPage() {
  return (
    <>
      <PageHero
        
        title="Il Club"
        subtitle="La storia, la mission e le persone che ogni giorno rendono Nettuno Gold un punto di riferimento per il poker a Bologna."
      />
      <div className="pb-16 md:pb-24">
        <Container className="flex flex-col gap-24">
          <PhotoBanner
            priority
            src="/sala/sala-piena.jpg"
            alt="La sala di Nettuno Gold piena di giocatori durante un torneo"
            eyebrow="La community"
            title="Quasi 2.000 soci, una sola passione"
            stats={[
              { value: `${formatNumberIt(businessInfo.stats.members)}+`, label: "Soci" },
              { value: `${businessInfo.stats.tournamentsPerYear}`, label: "Tornei l'anno" },
              { value: `Dal ${businessInfo.stats.since}`, label: "In attività" },
            ]}
          />

          {/* Storia: linea del tempo */}
          <section className="flex flex-col gap-10">
            <SectionHeading eyebrow="La nostra storia" title="Da idea a punto di riferimento" align="left" />
            <ol className="relative grid grid-cols-1 gap-5 md:grid-cols-3">
              {milestones.map((m, i) => (
                <Reveal as="li" key={m.title} delay={0.1 * i} className="relative flex">
                  <div className="card-modern flex w-full flex-col gap-3 p-7">
                    <span className="relative z-10 flex w-fit items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-gold-light shadow-[0_0_0_6px_rgba(201,162,39,0.15),0_0_18px_rgba(240,199,94,0.8)]" />
                      <span className="font-display text-3xl font-extrabold tracking-tight text-gold-gradient">{m.year}</span>
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground">{m.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{m.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </section>

          {/* Mission e valori */}
          <section className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <SectionHeading eyebrow="La nostra mission" title="Una sicurezza per il giocatore" align="left" />
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-foreground/75">
                  Offrire il miglior ambiente possibile per giocare a Texas Hold&apos;em a Bologna: tornei organizzati
                  con rigore, uno staff sempre presente e una sala pensata per far sentire ogni giocatore a proprio
                  agio, dal primo buy-in al tavolo finale.
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={0.07 * i} className="flex">
                  <div className="card-modern group flex w-full flex-col gap-4 p-7">
                    <span className="icon-orb h-12 w-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                      <v.icon size={22} />
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground">{v.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Staff */}
          <section className="flex flex-col gap-10">
            <SectionHeading eyebrow="Il nostro staff" title="Le persone dietro ogni torneo" />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {staffRoles.map((s, i) => (
                <Reveal key={s.role} delay={0.08 * i} className="flex">
                  <div className="card-modern border-gradient-gold flex w-full flex-col gap-3 overflow-hidden p-7">
                    <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 bg-[radial-gradient(circle,rgba(201,162,39,0.16),transparent_70%)]" />
                    <h3 className="relative font-display text-xl font-bold tracking-tight text-gold-gradient">{s.role}</h3>
                    <p className="relative text-sm leading-relaxed text-muted">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}
