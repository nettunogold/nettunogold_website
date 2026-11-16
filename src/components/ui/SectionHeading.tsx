import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

// Etichetta a pillola con puntino luminoso, usata sopra i titoli.
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-gold-light",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-light opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-light" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Title = "h2",
  className,
  eyebrowClassName,
}: {
  eyebrow?: string;
  eyebrowClassName?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4 sm:gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && <Eyebrow className={eyebrowClassName}>{eyebrow}</Eyebrow>}
      <Title className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-heading-gradient sm:text-5xl md:text-6xl">
        {title}
      </Title>
      {subtitle && <p className="max-w-2xl text-base text-muted sm:text-lg leading-relaxed">{subtitle}</p>}
    </Reveal>
  );
}
