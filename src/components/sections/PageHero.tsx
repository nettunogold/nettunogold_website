import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Aurora } from "@/components/ui/Aurora";

// Intestazione delle pagine interne: luci dorate in movimento e griglia
// sottile, che scorrono sotto l'header trasparente.
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative -mt-[var(--header-h)] overflow-hidden pb-14 pt-[calc(var(--header-h)+4rem)] md:pb-20 md:pt-[calc(var(--header-h)+6rem)]">
      <Aurora intensity={0.8} />
      <Container className="relative z-10">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} subtitle={subtitle} />
      </Container>
    </section>
  );
}
