import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, Coins, Layers, Ticket, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { it } from "date-fns/locale";
import type { Event } from "@/lib/schemas/event";
import { cn, formatNumberIt } from "@/lib/utils";

// Pezzi comuni delle card dei tornei nella versione da telefono: la data in
// un riquadro, i dati economici su una sola striscia e il riepilogo
// (data + titolo + orario + dati) usato sia nella home sia nel calendario.

// "time": orario sotto la data, nello stesso riquadro.
export function DateTile({ date, time, className }: { date: string; time?: string; className?: string }) {
  const d = parseISO(date);
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col items-center overflow-hidden rounded-xl border border-gold/20 bg-gold/[0.06]",
        time ? "w-16" : "w-14",
        className
      )}
    >
      <div className="flex flex-col items-center py-2">
        <span className="text-[10px] font-semibold uppercase leading-none tracking-[0.12em] text-foreground/60">
          {format(d, "EEE", { locale: it })}
        </span>
        <span className="tabular mt-1 font-display text-2xl font-semibold leading-none text-foreground">
          {format(d, "d")}
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase leading-none tracking-[0.12em] text-gold-light">
          {format(d, "MMM", { locale: it })}
        </span>
      </div>
      {time ? (
        <span className="tabular flex w-full items-center justify-center gap-1 border-t border-gold/15 bg-black/30 py-1.5 text-[11px] font-semibold leading-none text-foreground/85">
          <Clock size={11} className="shrink-0 text-gold/80" />
          {time}
        </span>
      ) : null}
    </div>
  );
}

// Locandina come sfondo appena accennato, sfumata verso il nero in basso.
// Va dentro un contenitore "relative overflow-hidden"; il contenuto sopra
// deve essere "relative".
export function PosterBackdrop({ src }: { src: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.22] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/75 to-background" />
    </div>
  );
}

// Card di un flight nella pagina del multi-day.
export function FlightCard({ flight }: { flight: Event }) {
  const items: StatItem[] = [{ label: "Buy-in", value: formatNumberIt(flight.buyIn), icon: Ticket }];
  if (flight.startingStack) items.push({ label: "Stack", value: formatNumberIt(flight.startingStack), icon: Layers });
  if (flight.levelDurationMinutes) items.push({ label: "Livelli", value: `${flight.levelDurationMinutes} min`, icon: Timer });

  return (
    <Link href={`/eventi/${flight.slug}`} className="card-soft group relative block overflow-hidden p-3.5 sm:p-4">
      <PosterBackdrop src={flight.images[0]} />
      <div className="relative flex flex-col gap-3.5">
        <div className="flex items-center gap-3.5">
          <DateTile date={flight.date} time={flight.time} />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {flight.phase && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-light/90">{flight.phase}</span>
            )}
            <h3 className="line-clamp-2 font-display text-[17px] font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-gold-light sm:text-lg">
              {flight.title}
            </h3>
          </div>
          <ChevronRight size={18} className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-gold-light" />
        </div>
        <StatStrip
          items={items}
          highlight={flight.guaranteed ? { label: "Garantito", value: formatNumberIt(flight.guaranteed) } : undefined}
        />
      </div>
    </Link>
  );
}

export type StatItem = { label: string; value: string; gold?: boolean; icon?: LucideIcon };

// Dati affiancati e separati da una riga sottile. Compaiono solo quelli
// presenti: niente colonne con il trattino. "highlight": riga dorata a tutta
// larghezza in fondo al blocco (es. il garantito, quando c'è).
export function StatStrip({ items, highlight }: { items: StatItem[]; highlight?: { label: string; value: string } }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-black/45">
      <div
        className="grid divide-x divide-white/[0.07]"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((item) => (
          <div key={item.label} className="flex min-w-0 flex-col gap-1 px-3 py-2.5">
            <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-muted">
              {item.icon ? <item.icon size={11} className="shrink-0 text-gold/80" /> : null}
              <span className="truncate">{item.label}</span>
            </span>
            <span
              className={cn(
                "tabular truncate text-[15px] font-semibold leading-tight",
                item.gold ? "text-gold-light" : "text-foreground"
              )}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
      {highlight ? (
        <div className="flex items-center justify-between gap-3 border-t border-gold/20 bg-gold/[0.08] px-3 py-2.5">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-gold-light">
            <Coins size={12} className="shrink-0" />
            {highlight.label}
          </span>
          <span className="tabular text-base font-bold leading-tight text-gold-light">{highlight.value}</span>
        </div>
      ) : null}
    </div>
  );
}

export function eventStats(event: Event): StatItem[] {
  const items: StatItem[] = [{ label: "Buy-in", value: formatNumberIt(event.buyIn) }];
  if (event.startingStack) items.push({ label: "Stack", value: formatNumberIt(event.startingStack) });
  if (event.guaranteed) items.push({ label: "Garantito", value: formatNumberIt(event.guaranteed), gold: true });
  return items;
}

export function EventSummary({
  event,
  seriesTitle,
  aside,
}: {
  event: Event;
  seriesTitle?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-3.5">
        <DateTile date={event.date} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {seriesTitle && (
            <span className="flex min-w-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-gold-light/90">
              <Layers size={12} className="shrink-0" />
              <span className="truncate">
                {seriesTitle}
                {event.phase ? ` · ${event.phase}` : ""}
              </span>
            </span>
          )}
          <h3 className="line-clamp-2 font-display text-[17px] font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-gold-light">
            {event.title}
          </h3>
          <span className="tabular flex items-center gap-1.5 text-sm text-foreground/70">
            <Clock size={13} className="text-gold/80" />
            Ore {event.time}
          </span>
        </div>
        {aside}
      </div>
      <StatStrip items={eventStats(event)} />
    </div>
  );
}
