// Logica del pulsante "Pubblica sul sito" del pannello /admin.
//
// I salvataggi dal pannello creano commit con "[skip netlify]" nel messaggio
// (vedi commit_messages in public/admin/config.yml): Netlify non ripubblica il
// sito e non consuma crediti. Il pulsante confronta il commit attualmente
// online con l'ultimo commit su GitHub, mostra le modifiche in attesa e, su
// richiesta, avvia UN solo deploy tramite il build hook di Netlify.

export const PUBLISH_REPO = process.env.CMS_GITHUB_REPO || "nettunogold/nettunogold_website";
export const PUBLISH_BRANCH = process.env.CMS_GITHUB_BRANCH || "main";

export type PendingItem = { message: string; date: string | null };
export type PendingResult =
  | { mode: "local" }
  | { mode: "online"; configured: boolean; deployed: string; head: string; pending: PendingItem[] };

type Fetch = typeof fetch;

function gh(fetchImpl: Fetch, token: string, path: string) {
  return fetchImpl(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "nettunogold-pannello",
    },
    cache: "no-store",
  });
}

export class PublishError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// Solo chi può scrivere sul repository (lo staff con accesso al pannello)
// può vedere lo stato e pubblicare.
export async function assertCanPublish(token: string | null, fetchImpl: Fetch = fetch): Promise<void> {
  if (!token) throw new PublishError(401, "Accesso non effettuato.");
  const res = await gh(fetchImpl, token, `/repos/${PUBLISH_REPO}`);
  if (res.status === 401) throw new PublishError(401, "Sessione scaduta: esci e rientra nel pannello.");
  if (!res.ok) throw new PublishError(403, "Non hai accesso al repository del sito.");
  const repo = (await res.json()) as { permissions?: { push?: boolean } };
  if (!repo.permissions?.push) throw new PublishError(403, "Il tuo account non ha i permessi per pubblicare.");
}

// Messaggio del commit leggibile per l'elenco (senza l'istruzione per Netlify).
export function cleanMessage(message: string): string {
  return message
    .split("\n")[0]
    .replace(/\s*\[skip netlify\]\s*/gi, " ")
    .replace(/“public\/[^”]*\/([^/”]+)”/g, "“$1”")
    .trim();
}

export async function getPending(
  token: string,
  deployed: string,
  configured: boolean,
  fetchImpl: Fetch = fetch
): Promise<PendingResult> {
  if (!deployed) return { mode: "local" };
  const res = await gh(fetchImpl, token, `/repos/${PUBLISH_REPO}/compare/${deployed}...${PUBLISH_BRANCH}`);
  if (!res.ok) throw new PublishError(502, "Impossibile confrontare la versione online con GitHub.");
  const data = (await res.json()) as {
    commits: { sha: string; commit: { message: string; author?: { date?: string } } }[];
  };
  const commits = data.commits ?? [];
  const head = commits.length ? commits[commits.length - 1].sha : deployed;
  const pending = commits
    .map((c) => ({ message: cleanMessage(c.commit.message), date: c.commit.author?.date ?? null }))
    .reverse();
  return { mode: "online", configured, deployed, head, pending };
}

export async function triggerDeploy(hookUrl: string, who: string, fetchImpl: Fetch = fetch): Promise<void> {
  const url = new URL(hookUrl);
  url.searchParams.set("trigger_title", `Pubblicazione dal pannello (${who})`);
  const res = await fetchImpl(url, { method: "POST", cache: "no-store" });
  if (!res.ok) throw new PublishError(502, "Netlify non ha accettato la richiesta di pubblicazione.");
}
