"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

import { AGE_GATE_STORAGE_KEY } from "@/lib/age-gate";

const EXIT_URL = "https://www.google.it";

// Disclaimer per i maggiorenni: compare alla prima visita, su qualunque
// pagina si entri. È già nell'HTML generato dal server (nessun ritardo) e
// viene nascosto via CSS quando <html> ha l'attributo data-age-ok.
export function AgeGate() {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-age-ok")) return;
    // Focus sul pulsante per chi usa la tastiera, senza mostrare l'anello
    // di focus a chi tocca o usa il mouse.
    document.getElementById("age-gate-confirm")?.focus({ preventScroll: true, focusVisible: false } as FocusOptions);
  }, []);

  const confirm = () => {
    try {
      localStorage.setItem(AGE_GATE_STORAGE_KEY, "1");
    } catch {
      // Navigazione privata o memoria bloccata: vale solo per questa visita.
    }
    setLeaving(true);
    window.setTimeout(() => document.documentElement.setAttribute("data-age-ok", ""), 220);
  };

  return (
    <div
      className="age-gate fixed inset-0 z-[100] flex items-center justify-center p-4"
      data-leaving={leaving || undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-text"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-background/85 backdrop-blur-md" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(201,162,39,0.16),transparent_65%)]"
      />

      <div className="age-gate__card relative w-full max-w-[26rem] overflow-hidden rounded-[2rem] border border-white/10 bg-surface px-6 pb-6 pt-8 text-center shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(201,162,39,0.08)] sm:px-9 sm:pb-8 sm:pt-10">
        <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <div className="flex items-center justify-center gap-2.5">
          <Image src="/logo/nettuno-gold-emblem-180.png" alt="" width={180} height={202} className="h-9 w-auto" priority />
          <span className="font-brand text-base font-bold tracking-[0.04em] text-gold-gradient">NETTUNO GOLD</span>
        </div>

        <div className="mx-auto mt-7 flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-b from-gold/15 to-gold/[0.03] shadow-[0_0_40px_-10px_rgba(201,162,39,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <span className="font-display text-[2rem] font-extrabold tracking-tight text-gold-gradient">18+</span>
        </div>

        <h2 id="age-gate-title" className="mt-6 font-display text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-[1.7rem]">
          Accesso riservato ai maggiorenni
        </h2>
        <p id="age-gate-text" className="mt-3 text-[15px] leading-relaxed text-foreground/70">
          Il sito di Nettuno Gold è riservato a chi ha compiuto 18 anni. Entrando confermi di essere
          maggiorenne.
        </p>

        <div className="mt-7 flex flex-col gap-2.5">
          <Button id="age-gate-confirm" type="button" size="lg" onClick={confirm} className="w-full">
            Ho almeno 18 anni, entra
          </Button>
          <a
            href={EXIT_URL}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full text-sm font-semibold text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light/70"
          >
            Sono minorenne, esci
          </a>
        </div>

        
      </div>
    </div>
  );
}
