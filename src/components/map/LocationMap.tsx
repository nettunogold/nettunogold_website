"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Navigation } from "lucide-react";
import { businessInfo } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { mapData } from "./map-data";

const LAT = 44.5041767;
const LON = 11.438587;
const W = mapData.width;
const H = mapData.height;
const ease = [0.2, 0.8, 0.2, 1] as const;

const directions = [
  { label: "Google Maps", href: businessInfo.mapLink },
  { label: "Apple Mappe", href: `https://maps.apple.com/?daddr=${LAT},${LON}&q=Nettuno%20Gold` },
  { label: "Waze", href: `https://waze.com/ul?ll=${LAT},${LON}&navigate=yes` },
];

// Mappa disegnata dal sito con i dati OpenStreetMap: nessun servizio esterno
// viene contattato all'apertura della pagina (quindi nessun cookie di terze
// parti). Le app di navigazione si aprono solo se il visitatore le sceglie.
export function LocationMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  // Leggero effetto profondità al passaggio del mouse.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const mapX = useTransform(sx, (v) => v * -10);
  const mapY = useTransform(sy, (v) => v * -10);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const show = inView || reduce;

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("relative isolate overflow-hidden rounded-[1.1rem] bg-[#0b0b0e]", className)}
    >
      {/* Mappa */}
      <motion.div className="absolute -inset-4" style={{ x: mapX, y: mapY }}>
        <motion.svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          initial={reduce ? false : { scale: 1.12, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.6, ease }}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="lm-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c9a227" stopOpacity="0.16" />
              <stop offset="60%" stopColor="#c9a227" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="lm-fade" cx="50%" cy="50%" r="62%">
              <stop offset="55%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.25" />
            </radialGradient>
            <mask id="lm-mask">
              <rect width={W} height={H} fill="url(#lm-fade)" />
            </mask>
            <pattern id="lm-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M80 0H0V80" fill="none" stroke="#fff" strokeOpacity="0.025" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width={W} height={H} fill="url(#lm-grid)" />

          <g mask="url(#lm-mask)" strokeLinecap="round" strokeLinejoin="round">
            <path d={mapData.green} fill="#c9a227" fillOpacity="0.035" />
            <path d={mapData.water} fill="#7fa6b8" fillOpacity="0.12" />
            <path d={mapData.waterway} fill="none" stroke="#7fa6b8" strokeOpacity="0.3" strokeWidth="4" />
            <path d={mapData.building} fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" />
            <path d={mapData.path} fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1.5" strokeDasharray="4 6" />
            <path d={mapData.rail} fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="2.5" strokeDasharray="10 8" />
            <path d={mapData.minor} fill="none" stroke="#ffffff" strokeOpacity="0.13" strokeWidth="4" />
            <path d={mapData.mid} fill="none" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="7" />
            <path d={mapData.major} fill="none" stroke="#0b0b0e" strokeWidth="15" />
            <path d={mapData.major} fill="none" stroke="#c9a227" strokeOpacity="0.42" strokeWidth="10" />
          </g>

          <circle cx={W / 2} cy={H / 2} r="420" fill="url(#lm-glow)" />

          {mapData.labels.map((l) => (
            <text
              key={l.name}
              x={l.x}
              y={l.y}
              dy="-9"
              transform={`rotate(${l.angle} ${l.x} ${l.y})`}
              textAnchor="middle"
              className="font-sans"
              fontSize={l.rank >= 3 ? 19 : 16}
              fontWeight={600}
              letterSpacing="1.5"
              fill={l.rank >= 3 ? "#f0c75e" : "#f5f2ea"}
              fillOpacity={l.rank >= 3 ? 0.55 : 0.4}
              style={{ paintOrder: "stroke", stroke: "#0b0b0e", strokeWidth: 5, strokeOpacity: 0.8 }}
            >
              {l.name.toUpperCase()}
            </text>
          ))}
        </motion.svg>
      </motion.div>

      {/* Bordi sfumati verso il colore della card */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_30px_#0b0b0e]" />

      {/* Segnaposto */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {!reduce &&
          [0, 1.3].map((delay) => (
            <motion.span
              key={delay}
              className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/50"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={show ? { scale: [0.4, 2.6], opacity: [0.7, 0] } : undefined}
              transition={{ duration: 2.6, delay: 1 + delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        <motion.div
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-[#0b0b0e]/90 shadow-[0_0_0_6px_rgba(201,162,39,0.10),0_10px_30px_-8px_rgba(201,162,39,0.55)] backdrop-blur"
          initial={reduce ? false : { y: -26, opacity: 0, scale: 0.8 }}
          animate={show ? { y: 0, opacity: 1, scale: 1 } : undefined}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.7 }}
        >
          <Image src="/logo/nettuno-gold-emblem-400.png" alt="" width={40} height={40} className="h-9 w-9 object-contain" />
        </motion.div>
      </div>

      {/* Etichetta del locale */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 mt-11 -translate-x-1/2 sm:ml-11 sm:mt-0 sm:-translate-x-0 sm:-translate-y-[115%]">
        <motion.div
          className="glass flex flex-col items-center whitespace-nowrap rounded-2xl px-4 py-2 sm:items-start"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 1.2, ease }}
        >
          <span className="font-brand text-sm font-semibold tracking-[0.04em] text-gold-light">Nettuno Gold</span>
          <span className="text-[11px] text-foreground/60">{businessInfo.address.street}</span>
        </motion.div>
      </div>

      {/* Nord e scala */}
      <div className="pointer-events-none absolute right-4 top-4 flex h-10 w-10 flex-col items-center justify-center rounded-full border border-white/10 bg-black/30 text-[10px] font-semibold text-foreground/70 backdrop-blur">
        <span className="h-0 w-0 border-x-[4px] border-b-[7px] border-x-transparent border-b-gold/80" />N
      </div>

      {/* Indicazioni stradali */}
      <motion.div
        className="absolute inset-x-3 bottom-3 flex flex-wrap items-center gap-2 sm:inset-x-4 sm:bottom-4"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={show ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: 1.4, ease }}
      >
        <span className="mr-1 hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60 sm:flex">
          <Navigation size={13} className="text-gold" />
          Portami qui
        </span>
        {directions.map((d) => (
          <a
            key={d.label}
            href={d.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-full px-3.5 py-2 text-xs font-semibold text-foreground transition-all duration-300 hover:-translate-y-px hover:border-gold/40 hover:text-gold-light sm:text-sm"
          >
            {d.label}
          </a>
        ))}
      </motion.div>

      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute left-4 top-4 text-[10px] text-foreground/30 transition-colors hover:text-foreground/60"
      >
        © OpenStreetMap
      </a>
    </div>
  );
}
