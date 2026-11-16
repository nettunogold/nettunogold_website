import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

type Tile = {
  src: string;
  alt: string;
  className: string;
  sizes: string;
};

const tiles: Tile[] = [
  {
    src: "/sala/sala-panoramica.jpg",
    alt: "Panoramica della sala di Nettuno Gold durante un torneo, con i tavoli numerati pieni di giocatori",
    className: "col-span-2 h-[13rem] sm:h-auto md:row-span-2",
    sizes: "(max-width: 768px) 100vw, 66vw",
  },
  {
    src: "/sala/tavolo-nettuno-gold.jpg",
    alt: "Un tavolo da gioco con il panno nero e oro firmato Nettuno Gold",
    className: "",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    src: "/sala/sala-piena.jpg",
    alt: "La sala piena di giocatori durante un torneo serale",
    className: "",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
];

// Home: "La nostra location". Mosaico di foto della sala (una grande e due
// piccole) seguito dall'anteprima dei servizi, in un'unica sezione.
export function SalaGallery() {
  const preview = services.slice(0, 6);

  return (
    <section className="relative py-14 sm:py-24 md:py-32">
      <Container className="flex flex-col gap-8 sm:gap-14">
        <SectionHeading
          eyebrow="Tutto quello che serve per giocare bene"
          eyebrowClassName="hidden sm:inline-flex"
          title="La nostra location"
          subtitle="Una sala ampia e luminosa, monitor con struttura e chip count in tempo reale, e una community che riempie i tavoli tutte le settimane."
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:h-[38rem] md:grid-cols-3 md:grid-rows-2">
          {tiles.map((tile, i) => (
            <Reveal key={tile.src} delay={0.1 * i} className={cn("min-h-0", tile.className)}>
              <figure className="group relative isolate h-full min-h-[9rem] overflow-hidden rounded-2xl sm:min-h-[16rem] sm:rounded-[1.75rem] border border-white/10 transition-colors duration-500 hover:border-gold/45">
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes={tile.sizes}
                  className="photo-tone -z-10 object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <div className="absolute inset-0 -z-10 bg-gold/10 mix-blend-overlay" />
                <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 [background:radial-gradient(500px_circle_at_50%_100%,rgba(201,162,39,0.25),transparent_60%)] group-hover:opacity-100" />
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {preview.map((service, i) => (
            <Reveal key={service.title} delay={0.06 * i} className="flex">
              <div className="card-modern group flex w-full flex-row items-start gap-4 p-5 sm:flex-col sm:p-7">
                <span className="icon-orb h-11 w-11 shrink-0 transition-transform sm:h-12 sm:w-12 duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                  <ServiceIcon name={service.icon} size={22} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">{service.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{service.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center">
          <Button href="/servizi" variant="secondary" size="lg">
            Vedi tutti i servizi <ArrowRight size={18} />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
