"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { GoldParticles } from "@/components/sections/GoldParticles";
const ease = [0.2, 0.8, 0.2, 1] as const;

// Hero: luci dorate in movimento, emblema fermo dentro un anello d'oro in
// lenta rotazione, nome in grande (font del marchio) con riflesso animato.
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const d = reduceMotion ? 0 : 1;
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 1 - 0.9 * d]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80 * d]);
  const emblemScale = useTransform(scrollYProgress, [0, 1], [1, 1 - 0.15 * d]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  });

  return (
    <section
      ref={heroRef}
      className="relative -mt-[var(--header-h)] flex min-h-[88svh] items-center sm:min-h-[100svh] overflow-hidden pt-[var(--header-h)]"
    >
      <Aurora intensity={1.15} />

      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="relative z-10 w-full">
        <Container className="flex flex-col items-center gap-7 py-10 text-center sm:gap-8 sm:py-16 md:py-24">
          <motion.div {...fadeUp(0)} style={{ scale: emblemScale }} className="relative flex items-center justify-center">
            <GoldParticles reduceMotion={reduceMotion} />

            {/* Anello d'oro in rotazione dietro l'emblema. Centrato sul cerchio del
                logo, che sta al 55,4% dell'altezza (sopra sporge il tridente). */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-[55.4%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 animate-spin-slow sm:h-80 sm:w-80"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(240,199,94,0.55) 60deg, transparent 140deg, transparent 200deg, rgba(201,162,39,0.4) 260deg, transparent 330deg)",
                WebkitMask: "radial-gradient(circle, transparent 62%, #000 63%, #000 66%, transparent 67%)",
                mask: "radial-gradient(circle, transparent 62%, #000 63%, #000 66%, transparent 67%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-[55.4%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(201,162,39,0.2),transparent_65%)] sm:h-96 sm:w-96"
            />

            <Image
              src="/logo/nettuno-gold-emblem-400.png"
              alt="Emblema Nettuno Gold: Nettuno con tridente in un cerchio dorato"
              width={400}
              height={450}
              priority
              className="relative z-10 h-48 w-auto drop-shadow-[0_0_45px_rgba(201,162,39,0.35)] sm:h-60"
            />
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            className="font-brand text-[3.2rem] font-bold leading-[1] tracking-[0.02em] text-gold-shine sm:text-7xl md:text-8xl"
          >
            NETTUNO
            <br className="sm:hidden" /> GOLD
          </motion.h1>

          <motion.div {...fadeUp(0.3)} className="hidden sm:block">
            <Eyebrow>Il punto di riferimento del Texas Hold&apos;em in Emilia Romagna</Eyebrow>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/tornei" size="lg">
              Calendario tornei <ArrowRight size={18} />
            </Button>
            <Button href="/contatti" variant="secondary" size="lg">
              <MapPin size={18} /> Come raggiungerci
            </Button>
          </motion.div>

        </Container>
      </motion.div>

      {/* Indicatore di scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        style={{ opacity: contentOpacity }}
        className="absolute inset-x-0 bottom-6 z-10 hidden justify-center md:flex"
      >
        <div className="glass flex h-10 w-6 items-start justify-center rounded-full p-1.5">
          <span className={reduceMotion ? "h-1.5 w-1.5 rounded-full bg-gold-light" : "ng-scroll-dot h-1.5 w-1.5 rounded-full bg-gold-light"} />
        </div>
      </motion.div>
    </section>
  );
}
