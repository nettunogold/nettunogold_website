import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formattazione data/numeri con date-fns (dati locale inclusi nel bundle)
// invece di Intl.DateTimeFormat/NumberFormat: questi ultimi dipendono dai
// dati ICU disponibili a runtime e possono differire tra server e browser
// (mismatch di idratazione). date-fns dà lo stesso risultato ovunque.

export function formatDateIt(dateISO: string): string {
  const date = new Date(`${dateISO}T00:00:00`);
  return format(date, "EEEE d MMMM yyyy", { locale: it });
}

export function formatDateShortIt(dateISO: string): string {
  const date = new Date(`${dateISO}T00:00:00`);
  return format(date, "d MMM", { locale: it });
}

export function formatDayNumber(dateISO: string): string {
  const date = new Date(`${dateISO}T00:00:00`);
  return format(date, "d", { locale: it });
}

export function formatMonthFullIt(dateISO: string): string {
  const date = new Date(`${dateISO}T00:00:00`);
  return format(date, "MMMM", { locale: it }).toUpperCase();
}

export function formatNumberIt(value: number): string {
  const rounded = Math.round(value);
  const negative = rounded < 0;
  const digits = Math.abs(rounded).toString();
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return negative ? `-${grouped}` : grouped;
}

export function formatDateRangeIt(startISO: string, endISO: string): string {
  const start = new Date(`${startISO}T00:00:00`);
  const end = new Date(`${endISO}T00:00:00`);
  return `${format(start, "d MMMM yyyy", { locale: it })} – ${format(end, "d MMMM yyyy", { locale: it })}`;
}

// Intervallo compatto per spazi stretti: "15 – 29 nov 2026",
// "28 nov – 3 dic 2026", "30 dic 2026 – 2 gen 2027".
export function formatDateRangeShortIt(startISO: string, endISO: string): string {
  const start = new Date(`${startISO}T00:00:00`);
  const end = new Date(`${endISO}T00:00:00`);
  const endText = format(end, "d MMM yyyy", { locale: it });
  if (start.getFullYear() !== end.getFullYear()) return `${format(start, "d MMM yyyy", { locale: it })} – ${endText}`;
  if (start.getMonth() !== end.getMonth()) return `${format(start, "d MMM", { locale: it })} – ${endText}`;
  return `${format(start, "d")} – ${endText}`;
}
