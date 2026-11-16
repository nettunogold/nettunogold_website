import { cn } from "@/lib/utils";

// Luci dorate sfumate che si muovono lentamente sullo sfondo (puro CSS,
// nessun JavaScript). "intensity" regola quanto sono visibili.
export function Aurora({
  className,
  intensity = 1,
  grid = true,
}: {
  className?: string;
  intensity?: number;
  grid?: boolean;
}) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute -top-1/3 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-[110px] animate-aurora"
        style={{ background: `radial-gradient(circle, rgba(201,162,39,${0.32 * intensity}), transparent 65%)` }}
      />
      <div
        className="absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full blur-[120px] animate-aurora [animation-delay:-6s]"
        style={{ background: `radial-gradient(circle, rgba(240,199,94,${0.14 * intensity}), transparent 65%)` }}
      />
      <div
        className="absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full blur-[120px] animate-aurora [animation-delay:-11s]"
        style={{ background: `radial-gradient(circle, rgba(140,106,29,${0.25 * intensity}), transparent 65%)` }}
      />
      {grid && <div className="absolute inset-0 bg-grid opacity-60" />}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
