import Link from "next/link";
import Image from "next/image";
import { CalendarRange, ArrowUpRight, Layers } from "lucide-react";
import type { Series } from "@/lib/schemas/series";
import { cn, formatDateRangeIt, formatNumberIt } from "@/lib/utils";

// Card di una serie multi-day: locandina con sfumatura morbida, informazioni
// su vetro leggero, reazione all'hover delicata.
// "wide": versione orizzontale a tutta larghezza, usata quando la serie in
// programma è una sola (evita una card stretta con tanto spazio vuoto).
export function SeriesCard({
  series,
  flightCount,
  wide = false,
}: {
  series: Series;
  flightCount: number;
  wide?: boolean;
}) {
  return (
    <Link
      href={`/tornei/serie/${series.slug}`}
      className={cn("card-soft group flex w-full flex-col overflow-hidden", wide && "md:flex-row")}
    >
      <div className={cn("relative aspect-[16/9] w-full overflow-hidden", wide && "md:aspect-auto md:min-h-[15rem] md:w-[46%] md:shrink-0")}>
        <Image
          src={series.images[0]}
          alt={`Locandina ${series.title}`}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={cn("absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent", wide && "md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-background/80")} />
        <span className="glass absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/90">
          <Layers size={11} className="text-gold-light" />
          Multi-day
          {flightCount > 0 ? ` · ${flightCount} ${flightCount === 1 ? "tappa" : "tappe"}` : ""}
        </span>
        <span className="glass absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-foreground/80 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-gold-light">
          <ArrowUpRight size={15} />
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col gap-3 p-5", wide && "md:justify-center md:gap-4 md:p-8")}>
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-gold-light">
          {series.title}
        </h3>
        {series.description ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">{series.description}</p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-white/[0.06] pt-4">
          <span className="flex items-center gap-1.5 text-sm text-foreground/75">
            <CalendarRange size={14} className="text-gold/80" />
            {formatDateRangeIt(series.startDate, series.endDate)}
          </span>
          {series.guaranteed ? (
            <span className="flex flex-col items-end">
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">Garantito</span>
              <span className="tabular text-base font-semibold text-gold-light">{formatNumberIt(series.guaranteed)}</span>
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
