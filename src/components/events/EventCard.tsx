import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, Coins, Layers, ArrowUpRight } from "lucide-react";
import type { Event } from "@/lib/schemas/event";
import { Badge } from "@/components/ui/Badge";
import { formatDateIt, formatNumberIt } from "@/lib/utils";
import { EventSummary } from "@/components/events/card-parts";

// Nota: la card non risolve da sola il titolo della serie (event.seriesSlug)
// perché è usata anche dentro componenti client dove il layer dati basato
// su fs non può essere importato. Se serve mostrare il badge serie, il
// chiamante passa già "seriesTitle".
export function EventCard({
  event,
  priority = false,
  seriesTitle,
}: {
  event: Event;
  priority?: boolean;
  seriesTitle?: string;
}) {
  return (
    <Link href={`/eventi/${event.slug}`} className="card-modern group flex w-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[4/3]">
        <Image
          src={event.images[0]}
          alt={`Locandina ${event.title}`}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10]/20 to-transparent" />
        <div className="absolute left-3 top-3 hidden flex-wrap gap-2 sm:flex">
          {seriesTitle && (
            <Badge>
              {seriesTitle}
              {event.phase ? ` · ${event.phase}` : ""}
            </Badge>
          )}
        </div>
        <span className="glass absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-gold-light opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </span>
      </div>

      {/* Telefono: riepilogo compatto (data in evidenza, dati su una striscia) */}
      <div className="p-4 sm:hidden">
        <EventSummary event={event} seriesTitle={seriesTitle} />
      </div>

      <div className="relative hidden flex-1 flex-col gap-3 p-5 sm:flex">
        <h3 className="font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-gold-light">
          {event.title}
        </h3>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted">
          <span className="flex items-center gap-1.5 capitalize">
            <CalendarDays size={14} className="text-gold" />
            {formatDateIt(event.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-gold" />
            {event.time}
          </span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-2 text-sm">
          <div className="rounded-2xl bg-white/[0.04] px-3 py-2.5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Buy-in</div>
            <div className="font-bold text-foreground">{formatNumberIt(event.buyIn)}</div>
          </div>
          {event.startingStack ? (
            <div className="rounded-2xl bg-white/[0.04] px-3 py-2.5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Stack</div>
              <div className="flex items-center gap-1 font-bold text-foreground">
                <Layers size={12} className="text-gold" />
                {formatNumberIt(event.startingStack)}
              </div>
            </div>
          ) : null}
          {event.guaranteed ? (
            <div className="col-span-2 rounded-2xl border border-gold/30 bg-gold/10 px-3 py-2.5 shadow-[0_0_24px_-10px_rgba(201,162,39,0.8)]">
              <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-light">
                <Coins size={11} /> Garantito
              </div>
              <div className="text-base font-bold text-gold-gradient">{formatNumberIt(event.guaranteed)}</div>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
