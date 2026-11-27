import Image from "next/image";

type Partner = {
  name: string;
  logo: string;
  width: number;
  height: number;
  /** Altezza a schermo: bilancia il peso visivo dei loghi. */
  className: string;
};

// Loghi su fondo trasparente. Poker Skill Events usa la versione "negativo"
// (scritta nera resa avorio, rosso invariato), l'unica leggibile su fondo
// scuro: l'originale "positivo" è in documentazione/foto_sito/loghi_partner.
const partners: Partner[] = [
  { name: "Euro Rounders", logo: "/partner/euro-rounders.png", width: 313, height: 91, className: "h-9 sm:h-11" },
  {
    name: "Poker Skill Events",
    logo: "/partner/poker-skill-events-negativo.png",
    width: 458,
    height: 164,
    className: "h-10 sm:h-12",
  },
];

// Con due soli loghi la sequenza viene ripetuta, così la fascia è sempre
// piena anche su schermi larghi. La traccia contiene due metà identiche e
// scorre di -50%: il ciclo è continuo, senza salti.
const REPEAT = 4;
const sequence = Array.from({ length: REPEAT }, () => partners).flat();

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="partner-marquee__group" aria-hidden={hidden || undefined}>
      {sequence.map((p, i) => (
        <li key={`${p.name}-${i}`} className="shrink-0">
          <Image
            src={p.logo}
            alt={hidden || i >= partners.length ? "" : p.name}
            width={p.width}
            height={p.height}
            sizes="200px"
            draggable={false}
            className={`${p.className} w-auto select-none object-contain`}
          />
        </li>
      ))}
    </ul>
  );
}

// Home: fascia "Official partner" a tutta larghezza, prima del footer.
export function PartnerBanner() {
  return (
    <section aria-labelledby="partner-title" className="relative pb-16 sm:pb-24">
      <h2
        id="partner-title"
        className="mb-5 text-center font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-light sm:mb-6 sm:text-xs"
      >
        Official partner
      </h2>

      <div className="partner-band">
        <div className="partner-marquee__track">
          <Group />
          <Group hidden />
        </div>
      </div>
    </section>
  );
}
