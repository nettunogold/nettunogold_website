"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "./nav-links";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "glass-strong mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full pl-3 pr-2 transition-shadow duration-500 sm:pl-4",
          scrolled || open ? "shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]" : "shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]"
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Nettuno Gold, torna alla home">
          <Image
            src="/logo/nettuno-gold-emblem-180.png"
            alt="Emblema Nettuno Gold"
            width={180}
            height={202}
            className="h-10 w-auto transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105"
            priority
          />
          <span className="font-brand text-base font-bold tracking-[0.04em] text-gold-gradient sm:text-lg">
            NETTUNO GOLD
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  active ? "font-extrabold text-[#17130a]" : "font-medium text-foreground/75 hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-gold-gradient shadow-[0_6px_20px_-8px_rgba(201,162,39,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/tornei" size="sm">
            Calendario tornei
          </Button>
        </div>

        <button
          type="button"
          className="glass flex h-11 w-11 items-center justify-center rounded-full text-gold-light lg:hidden"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass-strong mx-auto mt-3 max-w-7xl overflow-hidden rounded-3xl p-3 lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const active = isActive(pathname, link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex min-h-[48px] items-center rounded-2xl px-4 text-base transition-colors",
                        active ? "bg-gold/15 font-extrabold text-gold-light" : "font-medium text-foreground/85 hover:bg-white/5"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <Button href="/tornei" className="mt-2 w-full">
                Calendario tornei
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
