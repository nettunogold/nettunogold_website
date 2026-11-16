import type { Metadata } from "next";
import { getRankings } from "@/lib/data/rankings";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Trophy } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { formatDateIt } from "@/lib/utils";

const MEDALS: Record<number, string> = {
  1: "bg-gold-gradient text-[#17130a] shadow-[0_0_16px_rgba(201,162,39,0.5)]",
  2: "bg-gradient-to-br from-[#eef0f3] to-[#9aa1ab] text-[#17191d]",
  3: "bg-gradient-to-br from-[#e3a970] to-[#8a5a2b] text-[#1b1006]",
};

export const metadata: Metadata = {
  title: "Classifiche",
  description:
    "Classifica della Nettuno Gold Series e classifica generale annuale dei tornei di Nettuno Gold, Bologna.",
};

export default function ClassifichePage() {
  const rankings = getRankings();

  return (
    <>
      <PageHero
        eyebrow="Soci"
        title="Classifiche"
        subtitle="Classifica della serie in corso e classifica generale annuale, aggiornate dopo ogni tornei valido."
      />
      <div className="pb-16 md:pb-24">
        <Container className="flex flex-col gap-10">
          {rankings.map((ranking) => (
            <Reveal key={ranking.slug}>
              <section className="card-static overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-3">
                    <span className="icon-orb h-11 w-11">
                      <Trophy size={20} />
                    </span>
                    <h2 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">{ranking.title}</h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span
                      className={
                        ranking.seriesActive
                          ? "rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-gold-light"
                          : "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-muted"
                      }
                    >
                      {ranking.seriesActive ? "In corso" : "Conclusa"}
                    </span>
                    <span className="text-muted">Aggiornata al {formatDateIt(ranking.updatedAt)}</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[420px] text-left text-sm">
                    <thead className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      <tr>
                        <th className="px-5 py-3 sm:px-7">Pos.</th>
                        <th className="px-3 py-3">Giocatore</th>
                        <th className="px-3 py-3 text-right">Punti</th>
                        <th className="px-5 py-3 text-right sm:px-7">Tornei</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ranking.standings.map((entry) => (
                        <tr key={entry.position} className="border-t border-white/[0.05] transition-colors hover:bg-white/[0.03]">
                          <td className="px-5 py-3 sm:px-7">
                            <span
                              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold ${
                                MEDALS[entry.position] ?? "bg-white/[0.06] text-foreground/80"
                              }`}
                            >
                              {entry.position}
                            </span>
                          </td>
                          <td className="px-3 py-3 font-semibold text-foreground">{entry.playerName}</td>
                          <td className="px-3 py-3 text-right font-bold text-gold-light">{entry.points}</td>
                          <td className="px-5 py-3 text-right text-muted sm:px-7">{entry.events}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </Reveal>
          ))}

          <Reveal className="flex flex-col items-center gap-6">
            <p className="card-static w-full p-5 text-center text-sm text-muted">
              Dati mostrati a titolo dimostrativo: i punteggi reali verranno aggiornati dallo staff dopo ogni torneo
              valido per la classifica.
            </p>
            <Button href="/classifiche/regolamento" variant="secondary" size="lg">
              Leggi il regolamento <ArrowRight size={18} />
            </Button>
          </Reveal>
        </Container>
      </div>
    </>
  );
}
