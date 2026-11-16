// Pulsante "Pubblica sul sito" quando il pannello gira in locale
// (npm run cms + npm run dev): i salvataggi scrivono i file sul computer e il
// pulsante li raccoglie in UN solo commit e lo invia a GitHub. Se il branch è
// main, Netlify fa un solo deploy con tutto.
//
// Attivo solo in sviluppo (NODE_ENV=development): online non viene mai usato.

import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

// Solo i file gestiti dal pannello: il codice non viene mai incluso.
export const CONTENT_PATHS = ["content", "public/eventi"];

// code = le due lettere di "git status --porcelain" (indice, cartella di lavoro).
export type LocalChange = { message: string; path: string; code: string };
export type LocalStatus = {
  mode: "local";
  branch: string;
  pending: LocalChange[];
  unpushed: number;
};

async function git(args: string[]) {
  const { stdout } = await run("git", args, { cwd: process.cwd(), windowsHide: true, maxBuffer: 4 * 1024 * 1024 });
  return stdout;
}

const LABELS: [RegExp, string][] = [
  [/^content\/eventi\//, "Tornei"],
  [/^content\/serie\//, "Serie / Festival"],
  [/^content\/news\//, "News"],
  [/^content\/classifiche\//, "Classifiche"],
];

// Riga di "git status --porcelain" -> descrizione leggibile.
export function describeChange(code: string, path: string): LocalChange {
  const name = path.split("/").pop()!.replace(/\.json$/, "");
  const removed = code.includes("D");
  const added = code.includes("?") || code.includes("A");
  if (path.startsWith("public/eventi/")) {
    return { path, code, message: `${removed ? "Immagine eliminata" : "Immagine caricata"}: “${name}”` };
  }
  const label = LABELS.find(([re]) => re.test(path))?.[1] ?? "Contenuti";
  const verb = removed ? "Eliminato da" : added ? "Nuovo in" : "Modifica in";
  return { path, code, message: `${verb} ${label}: “${name}”` };
}

export function parseStatus(porcelain: string): LocalChange[] {
  return porcelain
    .split("\n")
    // .gitkeep: segnaposto tecnici. "AD": aggiunto e poi eliminato prima di
    // pubblicare, quindi nessuna modifica reale.
    .filter((line) => line.trim().length > 3 && !line.trim().endsWith(".gitkeep") && !line.startsWith("AD"))
    .map((line) => {
      const code = line.slice(0, 2);
      let path = line.slice(3).trim();
      if (path.includes(" -> ")) path = path.split(" -> ").pop()!;
      path = path.replace(/^"|"$/g, "");
      return describeChange(code, path);
    });
}

export async function getLocalStatus(): Promise<LocalStatus> {
  const branch = (await git(["rev-parse", "--abbrev-ref", "HEAD"])).trim();
  const pending = parseStatus(await git(["status", "--porcelain", "--untracked-files=all", "--", ...CONTENT_PATHS]));
  let unpushed = 0;
  try {
    unpushed = Number((await git(["rev-list", "--count", "@{u}..HEAD"])).trim()) || 0;
  } catch {
    unpushed = 0; // branch senza remote collegato
  }
  return { mode: "local", branch, pending, unpushed };
}

// Un solo commit con tutti i contenuti salvati, poi push del branch corrente.
export async function publishLocal(): Promise<{ committed: number; pushed: boolean; branch: string; error?: string }> {
  const status = await getLocalStatus();
  let committed = 0;
  if (status.pending.length > 0) {
    // 1) Si preparano solo i file che hanno ancora modifiche sul disco
    //    (seconda lettera dello stato diversa da spazio). Quelli già
    //    preparati, per esempio da un tentativo interrotto, non vanno
    //    ripassati a "git add": un file eliminato e già preparato non esiste
    //    più né sul disco né nell'indice e git si fermerebbe con un errore.
    //    Si indicano i singoli file e non le cartelle: una cartella rimasta
    //    senza file noti a git farebbe fallire l'intero comando.
    const toAdd = status.pending.filter((c) => c.code[1] !== " ").map((c) => c.path);
    if (toAdd.length > 0) await git(["add", "-A", "--", ...toAdd]);
    // 2) Si committa esattamente ciò che ora è preparato nelle cartelle dei
    //    contenuti ("git diff" non dà errore su percorsi inesistenti).
    const staged = (await git(["diff", "--cached", "--name-only", "--no-renames", "--", ...CONTENT_PATHS]))
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    if (staged.length > 0) {
      const n = status.pending.length;
      const title = `Contenuti aggiornati dal pannello (${n} ${n === 1 ? "modifica" : "modifiche"})`;
      const body = status.pending.map((c) => `- ${c.message}`).join("\n");
      await git(["commit", "-m", title, "-m", body, "--", ...staged]);
      committed = n;
    }
  }
  try {
    await git(["push", "origin", "HEAD"]);
    return { committed, pushed: true, branch: status.branch };
  } catch (error) {
    const msg = error instanceof Error ? error.message.split("\n").slice(-3).join(" ").trim() : String(error);
    return { committed, pushed: false, branch: status.branch, error: msg };
  }
}
