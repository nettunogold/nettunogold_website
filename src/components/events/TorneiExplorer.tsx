"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Coins } from "lucide-react";
import type { Event } from "@/lib/schemas/event";
import { formatDayNumber, formatMonthFullIt, formatNumberIt } from "@/lib/utils";

// Elenco dei tornei in programma, uno per riga.
export function TorneiExplorer({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return (
      <p className="card-static mx-auto max-w-md px-6 py-8 text-center text-muted">Nessun torneo programmato al momento.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {events.map((event) => (
        <TorneoRow key={event.slug} event={event} />
      ))}
    </div>
  );
}

function TorneoRow({ event }: { event: Event }) {
  return (
    <Link
      href={`/eventi/${event.slug}`}
      className="card-modern group relative flex overflow-hidden"
    >
      {/* Bagliore d'hover: spot dorato in alto a destra, invisibile a riposo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at 85% 0%, rgba(201,162,39,0.14), transparent 60%)",
        }}
      />

      {/* Locandina: grande, sfumata nel colore della card */}
      <div className="relative w-24 shrink-0 overflow-hidden sm:w-36 md:w-44">
        <Image
          src={event.images[0]}
          alt={`Locandina ${event.title}`}
          fill
          sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 176px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent from-40% to-surface" />
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-r from-transparent to-surface" />
      </div>

      {/* Data: numero grande, mese completo sotto */}
      <div className="flex w-20 shrink-0 flex-col items-center justify-center gap-0.5 border-r border-border-subtle/70 bg-surface-2/60 px-1 sm:w-24">
        <span className="font-sans text-3xl font-black leading-none tracking-tight text-gold-gradient sm:text-4xl">
          {formatDayNumber(event.date)}
        </span>
        <span className="text-center text-[9px] font-extrabold uppercase tracking-wide text-muted sm:text-[10px]">
          {formatMonthFullIt(event.date)}
        </span>
      </div>

      {/* Contenuto */}
      <div className="relative z-10 flex flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 sm:px-6">
        <div className="flex min-w-[140px] flex-col gap-1.5">
          <span className="font-sans text-base font-bold text-foreground transition-colors group-hover:text-gold-light sm:text-lg">
            {event.title}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground/90">
            <Clock size={14} className="text-gold" />
            {event.time}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex flex-col items-end rounded-xl border border-border-subtle bg-background/60 px-3.5 py-2 transition-colors group-hover:border-gold/30">
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted">Buy-in</span>
            <span className="text-lg font-bold text-foreground">{formatNumberIt(event.buyIn)}</span>
          </div>

          {event.guaranteed ? (
            <div className="relative flex flex-col items-end overflow-hidden rounded-xl border border-gold/40 bg-gold/10 px-3.5 py-2 shadow-[0_0_24px_-6px_rgba(201,162,39,0.65)]">
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gold-gradient opacity-[0.07]"
              />
              <span className="relative flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-gold-light">
                <Coins size={11} /> Garantito
              </span>
              <span className="relative text-lg font-bold text-gold-gradient">
                {formatNumberIt(event.guaranteed)}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
