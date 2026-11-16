import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";
import { businessInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contatti & Dove siamo",
  description:
    "Come raggiungere Nettuno Gold a Villanova di Castenaso (Bologna): indirizzo, telefono, WhatsApp, email e social.",
};

const address = `${businessInfo.address.street}, ${businessInfo.address.postalCode} ${businessInfo.address.city} (${businessInfo.address.region})`;

const contacts = [
  { icon: MapPin, label: "Indirizzo", value: address, href: businessInfo.mapLink, external: true },
  { icon: Phone, label: "Telefono", value: businessInfo.phone, href: businessInfo.phoneHref, external: false },
  { icon: MessageCircle, label: "WhatsApp", value: "Scrivici su WhatsApp", href: businessInfo.whatsappHref, external: true },
  { icon: Mail, label: "Email", value: businessInfo.email, href: `mailto:${businessInfo.email}`, external: false },
];

const socialClass =
  "glass flex h-12 w-12 items-center justify-center rounded-full text-gold-light transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50";

export default function ContattiPage() {
  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title="Dove siamo"
        subtitle="Siamo a Villanova di Castenaso, a pochi minuti da Bologna. Scrivici o vieni a trovarci."
      />
      <div className="pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <div className="card-static h-full overflow-hidden p-2">
                <iframe
                  title="Mappa: posizione di Nettuno Gold"
                  src={businessInfo.mapEmbedSrc}
                  className="h-96 w-full rounded-[1.1rem] grayscale-[0.4] contrast-[1.05] lg:h-full lg:min-h-[520px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            <div className="flex flex-col gap-3 lg:col-span-2">
              {contacts.map((c, i) => (
                <Reveal key={c.label} delay={0.06 * i}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="card-modern group flex items-center gap-4 p-5"
                  >
                    <span className="icon-orb h-11 w-11 shrink-0">
                      <c.icon size={19} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{c.label}</span>
                      <span className="block break-words font-medium text-foreground transition-colors group-hover:text-gold-light">
                        {c.value}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-light"
                    />
                  </a>
                </Reveal>
              ))}

              

              <Reveal delay={0.3} className="flex gap-3 pt-1">
                <a href={businessInfo.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Nettuno Gold su Instagram" className={socialClass}>
                  <InstagramIcon width={20} height={20} />
                </a>
                <a href={businessInfo.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Nettuno Gold su Facebook" className={socialClass}>
                  <FacebookIcon width={20} height={20} />
                </a>
              </Reveal>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
