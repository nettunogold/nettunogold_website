// Data di oggi (AAAA-MM-GG) secondo l'ora italiana. Con toISOString() si
// userebbe l'ora UTC: tra mezzanotte e l'1/le 2 di notte in Italia
// risulterebbe ancora "ieri" (e i tornei del giorno prima resterebbero
// visibili come "in programma").
export function todayISO(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
