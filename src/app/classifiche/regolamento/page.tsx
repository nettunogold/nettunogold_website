import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Regolamento Classifiche",
  description: "Regolamento delle classifiche e delle serie di tornei di Nettuno Gold, Bologna.",
};

const rules = [
  {
    title: "Punteggio",
    text: "Ogni torneo valido per la classifica assegna un punteggio in base al piazzamento finale e al numero di iscritti. Il dettaglio del punteggio è esposto in sala.",
  },
  {
    title: "Tornei validi",
    text: "Sono validi per la classifica generale tutti i tornei ufficiali del calendario Nettuno Gold. I tornei della Nettuno Gold Series concorrono anche alla classifica di serie dedicata.",
  },
  {
    title: "Parità di punteggio",
    text: "In caso di parità, prevale il giocatore con il maggior numero di piazzamenti a podio nella stagione; in caso di ulteriore parità, il numero di tornei disputati.",
  },
  {
    title: "Finale di stagione",
    text: "I primi classificati della Nettuno Gold Series al termine della stagione accedono alla finale, con pacchetti d'ingresso dedicati.",
  },
];

export default function RegolamentoPage() {
  return (
    <>
      <PageHero
        eyebrow="Classifiche"
        title="Regolamento"
        subtitle="Le regole generali di assegnazione punteggio per le classifiche di Nettuno Gold."
      />
      <div className="pb-16 md:pb-24">
        <Container className="mx-auto flex max-w-4xl flex-col gap-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {rules.map((rule, i) => (
              <Reveal key={rule.title} delay={0.06 * i} className="flex">
                <div className="card-modern flex w-full flex-col gap-3 p-6 sm:p-7">
                  <span className="font-display text-sm font-bold text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="font-display text-xl font-bold tracking-tight text-foreground">{rule.title}</h2>
                  <p className="text-sm leading-relaxed text-muted">{rule.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="text-center text-xs text-muted">
            Contenuto segnaposto: il regolamento definitivo va confermato con lo staff del
            circolo e sostituito con il testo ufficiale.
          </p>
        </Container>
      </div>
    </>
  );
}
