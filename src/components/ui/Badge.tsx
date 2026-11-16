import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-gold/35 bg-black/45 px-3 py-1 text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-gold-light backdrop-blur-md",
        className
      )}
    >
      {children}
    </span>
  );
}
