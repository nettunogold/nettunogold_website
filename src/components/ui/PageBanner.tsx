import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

// Intestazione di pagina "a fascia": una striscia sottile con una foto della
// sala sullo sfondo e il titolo della pagina sopra.
export function PageBanner({
  src,
  alt,
  eyebrow,
  title,
}: {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
}) {
  return (
    <Container className="pt-6 sm:pt-8">
      <section className="relative isolate flex h-36 items-center overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_40px_80px_-50px_rgba(201,162,39,0.45)] sm:h-44">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1216px"
          className="photo-tone -z-10 object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gold/10 mix-blend-overlay" />

        <div className="flex flex-col items-start gap-3 px-6 sm:px-10">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="font-display text-4xl font-bold leading-none tracking-tight text-heading-gradient sm:text-5xl">
            {title}
          </h1>
        </div>
      </section>
    </Container>
  );
}
