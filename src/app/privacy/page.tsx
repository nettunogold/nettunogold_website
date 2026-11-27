import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { businessInfo } from "@/lib/site-config";

// Informativa privacy. Raggiungibile solo dal link nel footer: fuori dal menu,
// fuori dalla sitemap e nascosta ai motori di ricerca.
// Quando arriveranno account e iscrizioni ai tornei va aggiunta la sezione
// dedicata (dati del profilo, iscrizioni, Supabase, Brevo, Cloudflare).
export const metadata: Metadata = {
  title: "Privacy",
  description: "Informativa sul trattamento dei dati personali del sito di Nettuno Gold.",
  robots: { index: false, follow: true },
};

const LAST_UPDATE = "27 novembre 2026";

const { legalName, vatNumber, privacyEmail, address } = businessInfo;
const sede = `${address.street}, ${address.postalCode} Castenaso (${address.region})`;

function Mail() {
  return (
    <a href={`mailto:${privacyEmail}`} className="text-gold-light underline-offset-2 hover:underline">
      {privacyEmail}
    </a>
  );
}

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Titolare del trattamento",
    body: (
      <p>
        {legalName}, con sede in {sede}, P.IVA {vatNumber}. Per qualsiasi richiesta sulla privacy puoi
        scrivere a <Mail />.
      </p>
    ),
  },
  {
    title: "Quali dati trattiamo",
    body: (
      <ul>
        <li>
          <strong>Dati di navigazione.</strong> Come avviene per qualsiasi sito, i server che lo ospitano registrano
          automaticamente alcuni dati tecnici: indirizzo IP, tipo di browser e dispositivo, pagine visitate, data e
          ora. Servono solo a far funzionare il sito e a proteggerlo da abusi; non li usiamo per identificarti.
        </li>
        <li>
          <strong>Dati che ci invii tu.</strong> Se ci contatti via email, WhatsApp o telefono, usiamo i dati che ci
          comunichi (nome, recapito, contenuto del messaggio) solo per risponderti.
        </li>
      </ul>
    ),
  },
  {
    title: "Perché e su quale base",
    body: (
      <ul>
        <li>
          Funzionamento e sicurezza del sito: legittimo interesse del titolare (art. 6.1.f del Regolamento UE
          2016/679, «GDPR»).
        </li>
        <li>
          Risposta alle tue richieste: esecuzione di misure richieste da te (art. 6.1.b GDPR).
        </li>
      </ul>
    ),
  },
  {
    title: "Cookie e memoria del browser",
    body: (
      <>
        <p>
          Il sito <strong>non usa cookie di profilazione, né cookie di terze parti, né strumenti di statistica</strong>.
          La mappa della pagina Contatti è disegnata dal sito stesso e non si collega a servizi esterni.
        </p>
        <p>
          Nella memoria del tuo browser salviamo solo la conferma di maggiore età, così il messaggio non ricompare a
          ogni visita. È un dato tecnico, necessario al funzionamento del sito, che non richiede consenso: puoi
          cancellarlo in qualsiasi momento dalle impostazioni del browser.
        </p>
        <p>
          I link verso Instagram, Facebook, WhatsApp, Google Maps, Apple Mappe e Waze portano su siti esterni, che
          applicano le proprie informative privacy.
        </p>
      </>
    ),
  },
  {
    title: "Chi riceve i dati",
    body: (
      <>
        <p>I dati non vengono venduti né ceduti. Possono trattarli, per nostro conto, solo i fornitori dei servizi tecnici che usiamo:</p>
        <ul>
          <li>Netlify, Inc., che ospita il sito;</li>
          <li>i servizi di posta e messaggistica con cui ci scrivi (Google per l&apos;email, WhatsApp).</li>
        </ul>
        <p>
          Alcuni fornitori hanno sede negli Stati Uniti: il trasferimento avviene con le garanzie previste dal GDPR
          (decisione di adeguatezza «EU-US Data Privacy Framework» o clausole contrattuali standard).
        </p>
      </>
    ),
  },
  {
    title: "Per quanto tempo",
    body: (
      <ul>
        <li>Dati di navigazione: per il periodo limitato previsto dal fornitore di hosting per sicurezza e diagnostica.</li>
        <li>Messaggi: per il tempo necessario a gestire la tua richiesta.</li>
      </ul>
    ),
  },
  {
    title: "I tuoi diritti",
    body: (
      <>
        <p>
          Puoi chiedere in ogni momento di accedere ai tuoi dati, correggerli, cancellarli, limitarne il trattamento,
          opporti al trattamento o riceverli in formato portabile (artt. 15–22 GDPR), scrivendo a <Mail />.
        </p>
        <p>
          Se ritieni che il trattamento non sia corretto, puoi presentare reclamo al Garante per la protezione dei dati
          personali (
          <a
            href="https://www.garanteprivacy.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-light underline-offset-2 hover:underline"
          >
            garanteprivacy.it
          </a>
          ).
        </p>
      </>
    ),
  },
  {
    title: "Minori",
    body: <p>Il sito è riservato ai maggiorenni. Non raccogliamo consapevolmente dati di minori di 18 anni.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy" subtitle="Come trattiamo i dati personali di chi visita il sito." />
      <div className="pb-16 md:pb-24">
        <Container>
          <div className="card-static legal-text mx-auto flex max-w-3xl flex-col gap-8 p-6 sm:p-10">
            {sections.map((s) => (
              <section key={s.title} className="flex flex-col gap-3">
                <h2 className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">{s.title}</h2>
                {s.body}
              </section>
            ))}
            <p className="border-t border-white/[0.06] pt-6 text-xs text-muted">Ultimo aggiornamento: {LAST_UPDATE}</p>
          </div>
        </Container>
      </div>
    </>
  );
}
