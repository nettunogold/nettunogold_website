import { cn } from "@/lib/utils";

// Luci dorate sfumate sullo sfondo (puro CSS, nessun JavaScript).
// "intensity" regola quanto sono visibili. Sono sfumature radiali e non
// elementi sfocati con filter: blur, che il telefono dovrebbe ricalcolare a
// ogni fotogramma (era la causa principale della lentezza su mobile). Si
// muovono solo da tablet in su.
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
        className="absolute -top-1/2 left-1/2 h-[56rem] w-[56rem] -translate-x-1/2 rounded-full md:animate-aurora"
        style={{ background: `radial-gradient(circle, rgba(201,162,39,${0.26 * intensity}) 0%, rgba(201,162,39,${0.1 * intensity}) 35%, transparent 70%)` }}
      />
      <div
        className="absolute -left-60 top-1/4 h-[42rem] w-[42rem] rounded-full md:animate-aurora [animation-delay:-6s]"
        style={{ background: `radial-gradient(circle, rgba(240,199,94,${0.11 * intensity}) 0%, rgba(240,199,94,${0.04 * intensity}) 35%, transparent 70%)` }}
      />
      <div
        className="absolute -right-60 -bottom-20 h-[44rem] w-[44rem] rounded-full md:animate-aurora [animation-delay:-11s]"
        style={{ background: `radial-gradient(circle, rgba(140,106,29,${0.2 * intensity}) 0%, rgba(140,106,29,${0.07 * intensity}) 35%, transparent 70%)` }}
      />
      {grid && <div className="absolute inset-0 bg-grid opacity-60" />}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
