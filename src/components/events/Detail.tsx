import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Coins } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Aurora } from "@/components/ui/Aurora";
import { Reveal } from "@/components/ui/Reveal";
import { cn, formatNumberIt } from "@/lib/utils";

// Struttura comune delle schede torneo e multi-day: locandine a sinistra
// (fisse durante lo scroll su desktop), informazioni a destra.
export function DetailShell({
  backHref,
  backLabel,
  images,
  imageAlt,
  backOnMobile = true,
  aboveImage,
  children,
}: {
  backHref: string;
  backLabel: string;
  images: string[];
  imageAlt: string;
  // false: il link "indietro" in alto si vede solo da computer (su telefono
  // c'è già il pulsante in fondo alla pagina).
  backOnMobile?: boolean;
  // Contenuto mostrato sopra la locandina solo quando la pagina è su una
  // colonna (telefono e tablet).
  aboveImage?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative -mt-[var(--header-h)] pt-[calc(var(--header-h)+2rem)] pb-16 md:pb-24">
      <Aurora intensity={0.6} grid={false} className="h-[40rem]" />
      <Container className="relative flex flex-col gap-8">
        <Link
          href={backHref}
          className={cn(
            "glass w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-gold-light",
            backOnMobile ? "inline-flex" : "hidden lg:inline-flex"
          )}
        >
          <ArrowLeft size={16} /> {backLabel}
        </Link>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <Reveal className="lg:sticky lg:top-28">
            <div className="flex flex-col gap-4">
              {aboveImage ? <div className="lg:hidden">{aboveImage}</div> : null}
              {images.map((src, i) => (
                <div
                  key={src + i}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-[0_40px_80px_-40px_rgba(201,162,39,0.45)]"
                >
                  <Image
                    src={src}
                    alt={`${imageAlt}${images.length > 1 ? ` ${i + 1}` : ""}`}
                    width={0}
                    height={0}
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 520px"
                    style={{ width: "100%", height: "auto" }}
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">{children}</div>
        </div>
      </Container>
    </div>
  );
}

export function DetailTitle({ children, kicker }: { children: React.ReactNode; kicker?: React.ReactNode }) {
  return (
    <Reveal className="flex flex-col gap-4">
      {kicker}
      <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-heading-gradient sm:text-5xl">
        {children}
      </h1>
    </Reveal>
  );
}

export function StatTile({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl p-4 sm:p-5",
        highlight ? "border border-gold/35 bg-gradient-to-b from-white/[0.05] to-white/[0.015]" : "card-static"
      )}
    >
      <span className="icon-orb h-9 w-9">
        <Icon size={16} />
      </span>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</div>
        <div className={cn("mt-0.5 text-xl font-bold", highlight ? "text-gold-light" : "text-foreground")}>{value}</div>
      </div>
    </div>
  );
}

// Versione da telefono di StatTile: una riga (icona, nome, valore a destra)
// al posto del blocco in griglia.
export function StatRow({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl px-4 py-3",
        highlight ? "border border-gold/35 bg-gradient-to-b from-white/[0.05] to-white/[0.015]" : "card-static"
      )}
    >
      <span className="icon-orb h-8 w-8 shrink-0">
        <Icon size={15} />
      </span>
      <span className="flex-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
      <span className={cn("tabular text-lg font-bold", highlight ? "text-gold-light" : "text-foreground")}>{value}</span>
    </div>
  );
}

// "firstPrize": premio garantito al primo, mostrato sotto la cifra
// ("1.000 al primo"); se manca la riga non compare.
export function GuaranteedPanel({ label, amount, firstPrize }: { label: string; amount: number; firstPrize?: number | null }) {
  return (
    <Reveal>
      <div className="border-gradient-gold relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold/20 via-gold/5 to-transparent px-5 py-4 sm:p-7">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 bg-[radial-gradient(circle,rgba(201,162,39,0.25),transparent_70%)]" />
        <div className="relative flex items-center gap-4">
          <span className="icon-orb h-10 w-10 shrink-0 sm:h-12 sm:w-12">
            <Coins size={20} />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-light sm:text-xs sm:tracking-[0.18em]">{label}</div>
            <div className="font-sans text-[1.75rem] font-bold leading-tight tracking-tight text-gold-shine sm:text-4xl">{formatNumberIt(amount)}</div>
            {firstPrize ? (
              <div className="mt-0.5 text-sm font-semibold text-foreground/85 sm:text-base">
                <span className="tabular text-gold-light">{formatNumberIt(firstPrize)}</span> al primo
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function DescriptionCard({ text }: { text: string }) {
  return (
    <Reveal>
      <div className="card-static p-6 sm:p-7">
        <p className="whitespace-pre-line leading-relaxed text-foreground/80">{text}</p>
      </div>
    </Reveal>
  );
}
