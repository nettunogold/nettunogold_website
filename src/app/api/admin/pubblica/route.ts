import { NextResponse } from "next/server";
import { assertCanPublish, getPending, PublishError, triggerDeploy } from "@/lib/publish";
import { getLocalStatus, publishLocal } from "@/lib/publish-local";

export const dynamic = "force-dynamic";

// Commit del sito attualmente online: fissato al momento della build
// (next.config.ts lo legge da COMMIT_REF, la variabile che Netlify imposta).
// Vuoto = il sito gira sul computer (npm run dev).
const DEPLOYED = process.env.NG_DEPLOYED_COMMIT ?? "";
const HOOK = process.env.NETLIFY_BUILD_HOOK_URL ?? "";
const DEV = process.env.NODE_ENV === "development";

function tokenFrom(req: Request): string | null {
  const auth = req.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(auth);
  return match ? match[1] : null;
}

// In locale si accettano solo richieste dal pannello sullo stesso computer:
// l'intestazione personalizzata impedisce ad altri siti di usare l'API.
function localAllowed(req: Request): boolean {
  const host = new URL(req.url).hostname;
  return DEV && /^(localhost|127\.0\.0\.1)$/.test(host) && req.headers.get("x-ng-panel") === "1";
}

// In locale l'errore (es. messaggio di git) si mostra per intero: aiuta a
// capire cosa non va. Online resta generico.
function failLocal(error: unknown) {
  console.error("[pubblica locale]", error);
  const msg = error instanceof Error ? error.message.split(/\r?\n/).filter(Boolean).slice(-2).join(" ") : String(error);
  return NextResponse.json({ error: `Operazione git non riuscita: ${msg}` }, { status: 500 });
}

function fail(error: unknown) {
  if (error instanceof PublishError) return NextResponse.json({ error: error.message }, { status: error.status });
  console.error("[pubblica]", error);
  return NextResponse.json({ error: "Errore imprevisto, riprova tra poco." }, { status: 500 });
}

// Stato: modifiche salvate dal pannello ma non ancora pubblicate.
export async function GET(req: Request) {
  if (!DEPLOYED) {
    if (!localAllowed(req)) return NextResponse.json({ mode: "local", available: false });
    try {
      return NextResponse.json({ ...(await getLocalStatus()), available: true });
    } catch (error) {
      return failLocal(error);
    }
  }
  try {
    const token = tokenFrom(req);
    await assertCanPublish(token);
    return NextResponse.json(await getPending(token!, DEPLOYED, Boolean(HOOK)));
  } catch (error) {
    return fail(error);
  }
}

// Pubblica tutto il salvato insieme: online un solo deploy, in locale un solo
// commit inviato a GitHub.
export async function POST(req: Request) {
  if (!DEPLOYED) {
    if (!localAllowed(req)) return NextResponse.json({ error: "Pubblicazione locale non disponibile." }, { status: 400 });
    try {
      return NextResponse.json({ ok: true, ...(await publishLocal()) });
    } catch (error) {
      return failLocal(error);
    }
  }
  if (!HOOK) return NextResponse.json({ error: "Pulsante non ancora configurato su Netlify (manca NETLIFY_BUILD_HOOK_URL)." }, { status: 503 });
  try {
    const token = tokenFrom(req);
    await assertCanPublish(token);
    const body = (await req.json().catch(() => ({}))) as { who?: unknown };
    const who = typeof body.who === "string" && body.who.trim() ? body.who.trim().slice(0, 40) : "staff";
    await triggerDeploy(HOOK, who);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return fail(error);
  }
}
