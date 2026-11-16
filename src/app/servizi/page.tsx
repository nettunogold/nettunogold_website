import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoBanner } from "@/components/ui/PhotoBanner";
import { businessInfo } from "@/lib/site-config";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "La Sala e i Servizi",
  description:
    "18 tavoli da Texas Hold'em, staff professionale, bar con servizio al tavolo e tutti i servizi della sala di Nettuno Gold a Bologna.",
};

export default function ServiziPage() {
  return (
    <>
      <PageHero
        title="La Sala"
      />
      <div className="pb-16 md:pb-24">
        <Container className="flex flex-col gap-12">
          <PhotoBanner
            priority
            src="/sala/sala-panoramica.jpg"
            alt="Panoramica della sala di Nettuno Gold con i tavoli numerati e i monitor dei tornei"
            title="Uno spazio pensato per il gioco"
            stats={[
              { value: `${businessInfo.stats.areaSqm} m²`, label: "Di sala" },
              { value: `${businessInfo.stats.tables}`, label: "Tavoli" },
              { value: `${businessInfo.stats.maxPlayers}`, label: "Posti" },
            ]}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={0.05 * (i % 3)} className="flex">
                <div className="card-modern group flex w-full flex-col gap-4 p-7">
                  <span className="icon-orb h-12 w-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                    <ServiceIcon name={service.icon} size={22} />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
