"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Clock, Layers } from "lucide-react";
import { format, parseISO } from "date-fns";
import { it } from "date-fns/locale";
import type { Event } from "@/lib/schemas/event";
import { cn, formatNumberIt } from "@/lib/utils";
import { EventSummary, PosterBackdrop } from "@/components/events/card-parts";

const ease = [0.2, 0.8, 0.2, 1] as const;

// Elenco dei tornei in programma in stile "lobby": gruppi per mese e una riga
// per torneo con le informazioni chiave allineate in colonne.
export function TorneiExplorer({
  events,
  seriesTitles = {},
}: {
  events: Event[];
  seriesTitles?: Record<string, string>;
}) {
  const reduce = useReducedMotion();

  const groups = useMemo(() => {
    const map = new Map<string, Event[]>();
    for (const event of events) {
      const key = event.date.slice(0, 7);
      map.set(key, [...(map.get(key) ?? []), event]);
    }
    return [...map.entries()];
  }, [events]);

  if (events.length === 0) {
    return (
      <div className="card-soft mx-auto flex max-w-md flex-col items-center gap-2 px-6 py-10 text-center">
        <span className="font-display text-lg font-semibold text-foreground">Nessun torneo in programma</span>
        <span className="text-sm text-muted">Il calendario viene aggiornato spesso: torna a trovarci presto.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {groups.map(([month, list]) => (
        <section key={month} className="flex flex-col gap-3">
          <div className="flex items-center gap-4 px-1">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">
              {format(parseISO(`${month}-01`), "LLLL yyyy", { locale: it })}
            </h3>
            <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            <span className="tabular text-xs text-muted">
              {list.length} {list.length === 1 ? "torneo" : "tornei"}
            </span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {list.map((event, i) => (
              <motion.li
                key={event.slug}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.04, ease }}
              >
                <TorneoRow
                  event={event}
                  seriesTitle={event.seriesSlug ? (seriesTitles[event.seriesSlug] ?? event.seriesSlug) : undefined}
                />
              </motion.li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

// Colonna numerica a larghezza fissa: le colonne restano allineate tra una
// riga e l'altra anche quando un dato manca (al suo posto un trattino).
function Stat({ label, value, gold = false }: { label: string; value: number | null; gold?: boolean }) {
  return (
    <div className="flex w-[4.5rem] flex-col items-start gap-0.5 md:w-20 md:items-end">
      <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">{label}</span>
      <span
        className={cn(
          "tabular text-base font-semibold sm:text-lg",
          value == null ? "text-muted/50" : gold ? "text-gold-light" : "text-foreground"
        )}
      >
        {value == null ? "—" : formatNumberIt(value)}
      </span>
    </div>
  );
}

function TorneoRow({ event, seriesTitle }: { event: Event; seriesTitle?: string }) {
  return (
    <>
      {/* Telefono: data in evidenza, titolo leggibile e dati su una striscia. */}
      <Link href={`/eventi/${event.slug}`} className="card-soft group relative block overflow-hidden p-3.5 md:hidden">
        <PosterBackdrop src={event.images[0]} />
        <div className="relative">
          <EventSummary
            event={event}
            seriesTitle={seriesTitle}
            aside={<ChevronRight size={18} className="shrink-0 self-center text-muted" />}
          />
        </div>
      </Link>
      <TorneoRowWide event={event} seriesTitle={seriesTitle} />
    </>
  );
}

function TorneoRowWide({ event, seriesTitle }: { event: Event; seriesTitle?: string }) {
  const date = parseISO(event.date);

  return (
    <Link
      href={`/eventi/${event.slug}`}
      className="card-soft group hidden items-stretch gap-5 overflow-hidden p-3 md:flex"
    >
      {/* Locandina */}
      <div className="relative w-16 shrink-0 overflow-hidden rounded-xl bg-white/[0.03] sm:w-20">
        <Image
          src={event.images[0]}
          alt={`Locandina ${event.title}`}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
      </div>

      {/* Data */}
      <div className="flex w-12 shrink-0 flex-col items-center justify-center sm:w-14">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
          {format(date, "EEE", { locale: it })}
        </span>
        <span className="tabular font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
          {format(date, "d")}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/80">
          {format(date, "MMM", { locale: it })}
        </span>
      </div>

      <span aria-hidden="true" className="my-2 w-px shrink-0 bg-white/[0.06]" />

      {/* Contenuto */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 py-1 pr-1 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="flex min-w-0 flex-col gap-1.5">
          {seriesTitle && (
            <span className="flex w-fit max-w-full items-center gap-1.5 rounded-full border border-gold/20 bg-gold/[0.07] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-light/90">
              <Layers size={11} className="shrink-0" />
              <span className="truncate">
                {seriesTitle}
                {event.phase ? ` · ${event.phase}` : ""}
              </span>
            </span>
          )}
          <span className="line-clamp-2 font-display text-base font-semibold leading-snug md:truncate text-foreground transition-colors duration-300 group-hover:text-gold-light sm:text-lg">
            {event.title}
          </span>
          <span className="tabular flex items-center gap-1.5 text-sm text-foreground/70">
            <Clock size={13} className="text-gold/80" />
            {event.time}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <Stat label="Buy-in" value={event.buyIn} />
          <Stat label="Garantito" value={event.guaranteed} gold />
          <span className="hidden lg:block">
            <Stat label="Stack" value={event.startingStack} />
          </span>
          <span className="ml-auto hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-gold/30 group-hover:text-gold-light md:flex">
            <ChevronRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
