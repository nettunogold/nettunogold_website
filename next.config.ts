import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Commit pubblicato in questa build (Netlify imposta COMMIT_REF): serve al
  // pulsante "Pubblica sul sito" del pannello per sapere cosa è già online.
  // In locale resta vuoto e il pulsante mostra solo un avviso.
  env: {
    NG_DEPLOYED_COMMIT: process.env.COMMIT_REF ?? "",
  },
  // I contenuti (content/*.json) vengono letti da disco anche quando una
  // pagina viene rigenerata sul server (revalidate): vanno inclusi nei file
  // del deploy.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },
  // Il pannello contenuti (Decap CMS) vive come pagina statica in
  // public/admin/index.html. Next serve i file di /public solo al loro
  // percorso esatto, quindi /admin e /admin/ vanno riscritti lì (il
  // percorso di config.yml è indicato esplicitamente nell'HTML stesso,
  // vedi il tag <link rel="cms-config-url"> in public/admin/index.html,
  // così funziona sia con sia senza slash finale, senza bisogno di
  // redirect che andrebbero in loop con la normalizzazione di Next).
  // "La Sala" (/servizi) è stata unita alla pagina Il Club: i vecchi link
  // (Google, social, segnalibri) portano alla sezione della sala.
  async redirects() {
    return [{ source: "/servizi", destination: "/il-club#la-sala", permanent: true }];
  },
  async rewrites() {
    return [
      { source: "/admin", destination: "/admin/index.html" },
      { source: "/admin/", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
