import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks } from "./nav-links";
import { businessInfo } from "@/lib/site-config";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";

const socialClass =
  "glass flex h-11 w-11 items-center justify-center rounded-full text-gold-light transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-4 px-3 pb-3 sm:mt-10 sm:px-5 sm:pb-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-56 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.13),rgba(201,162,39,0.04)_40%,transparent_70%)]"
        />

        {/* Invito all'azione */}
        <Container className="relative flex flex-col items-start justify-between gap-5 border-b border-white/[0.06] py-8 sm:gap-6 sm:py-10 md:flex-row md:items-center md:py-12">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-heading-gradient sm:text-3xl">
              Pronto a sederti al tavolo?
            </h2>
            <p className="mt-2 text-muted">Scopri i prossimi appuntamenti in sala.</p>
          </div>
          <Button href="/tornei" size="lg">
            Calendario tornei <ArrowRight size={18} />
          </Button>
        </Container>

        <Container className="relative py-10 sm:py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.2fr_1fr_1.4fr]">
            <div>
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo/nettuno-gold-emblem-180.png"
                  alt="Emblema Nettuno Gold"
                  width={180}
                  height={202}
                  className="h-11 w-auto"
                />
                <span className="font-brand text-lg font-bold tracking-[0.04em] text-gold-gradient">NETTUNO GOLD</span>
              </Link>
              <div className="mt-6 flex gap-3">
                <a href={businessInfo.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Nettuno Gold su Instagram" className={socialClass}>
                  <InstagramIcon width={18} height={18} />
                </a>
                <a href={businessInfo.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Nettuno Gold su Facebook" className={socialClass}>
                  <FacebookIcon width={18} height={18} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Il sito</h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted transition-colors hover:text-gold-light">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Contatti</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                  <a href={businessInfo.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">
                    {businessInfo.address.street}, {businessInfo.address.postalCode} {businessInfo.address.city} (
                    {businessInfo.address.region})
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={16} className="shrink-0 text-gold" />
                  <a href={businessInfo.phoneHref} className="hover:text-gold-light">
                    {businessInfo.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={16} className="shrink-0 text-gold" />
                  <a href={`mailto:${businessInfo.email}`} className="hover:text-gold-light">
                    {businessInfo.email}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <InstagramIcon width={16} height={16} className="shrink-0 text-gold" />
                  <a href={businessInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">
                    Instagram
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <FacebookIcon width={16} height={16} className="shrink-0 text-gold" />
                  <a href={businessInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Riga legale: P.IVA obbligatoria in home (art. 35 DPR 633/72); la
              sede è l'indirizzo già mostrato nei contatti qui sopra. */}
          <p className="mt-8 border-t border-white/[0.06] pt-6 text-[11px] leading-relaxed text-muted/60 sm:mt-10">
            © {year} {businessInfo.legalName} · P.IVA {businessInfo.vatNumber} ·{" "}
            <Link href="/privacy" className="underline-offset-2 transition-colors hover:text-gold-light hover:underline">
              Privacy
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}
