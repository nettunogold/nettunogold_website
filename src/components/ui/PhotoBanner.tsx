import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

// Foto della sala a tutta larghezza, in stile "cinematografico": sfumata nel
// fondo scuro, con titolo e dati in sovraimpressione.
export function PhotoBanner({
  src,
  alt,
  eyebrow,
  title,
  stats = [],
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  stats?: { value: string; label: string }[];
  className?: string;
  priority?: boolean;
}) {
  return (
    <Reveal>
      <figure
        className={cn(
          "group relative isolate overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_50px_100px_-50px_rgba(201,162,39,0.45)]",
          "aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]",
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1280px) 100vw, 1216px"
          className="photo-tone -z-10 object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-105"
        />
        {/* Sfumature: fondo e lato sinistro scuri per leggere il testo, alone dorato */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/80 via-background/10 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gold/10 mix-blend-overlay" />

        <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 sm:p-10">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-heading-gradient sm:text-5xl">
            {title}
          </h2>
          {stats.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {stats.map((s) => (
                <span key={s.label} className="glass inline-flex items-baseline gap-2 rounded-full px-4 py-2">
                  <span className="font-display text-lg font-bold text-gold-gradient">{s.value}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">{s.label}</span>
                </span>
              ))}
            </div>
          )}
        </figcaption>
      </figure>
    </Reveal>
  );
}
