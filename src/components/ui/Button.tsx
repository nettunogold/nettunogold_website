import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const variantClasses: Record<NonNullable<ButtonBaseProps["variant"]>, string> = {
  primary:
    "btn-shine bg-gold-gradient text-[#17130a] font-bold shadow-[0_4px_18px_-8px_rgba(201,162,39,0.75),inset_0_1px_0_rgba(255,255,255,0.35)] hover:shadow-[0_6px_24px_-8px_rgba(201,162,39,0.9),inset_0_1px_0_rgba(255,255,255,0.35)] hover:-translate-y-px",
  secondary:
    "glass text-foreground font-semibold hover:border-gold/50 hover:text-gold-light hover:-translate-y-0.5",
  ghost: "bg-transparent text-foreground hover:text-gold-light",
};

const sizeClasses: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  sm: "px-5 py-2.5 text-sm min-h-[44px]",
  md: "px-6 py-3 text-sm sm:text-base min-h-[48px]",
  lg: "px-8 py-4 text-base min-h-[56px]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full tracking-tight transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonBaseProps & { href?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
