import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { businessInfo } from "@/lib/site-config";
import { LocationMap } from "@/components/map/LocationMap";

const address = `${businessInfo.address.street}, ${businessInfo.address.postalCode} ${businessInfo.address.city} (${businessInfo.address.region})`;

const contacts = [
  { icon: MapPin, label: "Indirizzo", value: address, href: businessInfo.mapLink, external: true },
  { icon: Phone, label: "Telefono", value: businessInfo.phone, href: businessInfo.phoneHref, external: false },
  { icon: MessageCircle, label: "WhatsApp", value: "Scrivici su WhatsApp", href: businessInfo.whatsappHref, external: true },
  { icon: Mail, label: "Email", value: businessInfo.email, href: `mailto:${businessInfo.email}`, external: false },
];

export function ContattiMappa() {
  return (
    <section className="relative py-14 sm:py-24 md:py-32">
      <Container className="flex flex-col gap-8 sm:gap-14">
        <SectionHeading eyebrow="Dove siamo" title="Vieni a trovarci" />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="card-static h-full overflow-hidden p-2">
              <LocationMap className="h-72 w-full sm:h-96 lg:h-full lg:min-h-[400px]" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {contacts.map((c, i) => (
              <Reveal key={c.label} delay={0.07 * i}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="card-modern group flex items-center gap-4 p-4 sm:p-5"
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
                  <ArrowUpRight size={18} className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-light" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
