import Link from "next/link";
import Image from "next/image";
import { CalendarRange, Coins, ArrowUpRight } from "lucide-react";
import type { Series } from "@/lib/schemas/series";
import { Badge } from "@/components/ui/Badge";
import { formatDateRangeIt, formatNumberIt } from "@/lib/utils";

export function SeriesCard({ series, flightCount }: { series: Series; flightCount: number }) {
  return (
    <Link href={`/tornei/serie/${series.slug}`} className="card-modern border-gradient-gold group flex w-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={series.images[0]}
          alt={`Locandina ${series.title}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10]/30 to-transparent" />
        <Badge className="absolute left-3 top-3">
          Multi-day · {flightCount} {flightCount === 1 ? "tappa" : "tappe"}
        </Badge>
        <span className="glass absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-gold-light opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-gold-light">
          {series.title}
        </h3>
        {series.description ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">{series.description}</p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2 text-sm">
          <span className="flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5 text-foreground/80">
            <CalendarRange size={14} className="text-gold" />
            {formatDateRangeIt(series.startDate, series.endDate)}
          </span>
          {series.guaranteed ? (
            <span className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 font-bold text-gold-light">
              <Coins size={14} />
              {formatNumberIt(series.guaranteed)} garantiti
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
