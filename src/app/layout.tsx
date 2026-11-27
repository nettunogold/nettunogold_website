import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgeGate } from "@/components/layout/AgeGate";
import { AGE_GATE_SCRIPT } from "@/lib/age-gate";
import { SITE_URL, businessInfo } from "@/lib/site-config";

// Titoli: Sora (geometrico, moderno). Testo: Plus Jakarta Sans.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Marchio "NETTUNO GOLD": Cinzel, alternativa libera ispirata al Trajan del logo.
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nettuno Gold — Poker Room a Bologna",
    template: "%s — Nettuno Gold",
  },
  description:
    "Nettuno Gold, poker room a Villanova di Castenaso (Bologna): tornei di Texas Hold'em quasi ogni giorno, 18 tavoli, staff professionale. Scopri il calendario tornei e vieni a giocare.",
  keywords: [
    "poker Bologna",
    "poker room Bologna",
    "tornei poker Bologna",
    "Texas Hold'em Bologna",
    "Nettuno Gold",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "Nettuno Gold",
    title: "Nettuno Gold — Poker Room a Bologna",
    description:
      "Tornei di Texas Hold'em quasi ogni giorno a Villanova di Castenaso (Bologna). 18 tavoli, staff professionale, area di 500 m².",
    images: [{ url: "/logo/nettuno-gold-full.png", width: 1200, height: 1708 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nettuno Gold — Poker Room a Bologna",
    description:
      "Tornei di Texas Hold'em quasi ogni giorno a Villanova di Castenaso (Bologna).",
  },
  icons: {
    icon: "/favicon-emblem.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: businessInfo.name,
    image: `${SITE_URL}/logo/nettuno-gold-full.png`,
    url: SITE_URL,
    telephone: businessInfo.phone,
    email: businessInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address.street,
      addressLocality: businessInfo.address.city,
      postalCode: businessInfo.address.postalCode,
      addressRegion: businessInfo.address.region,
      addressCountry: "IT",
    },
    sameAs: [businessInfo.social.instagram, businessInfo.social.facebook],
  };

  return (
    // suppressHydrationWarning: lo script del disclaimer aggiunge data-age-ok
    // a <html> prima che React prenda il controllo della pagina.
    <html
      lang="it"
      className={`${sora.variable} ${jakarta.variable} ${cinzel.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: AGE_GATE_SCRIPT }} />
        <noscript>
          <style>{`.age-gate{display:none!important}html body{overflow:auto}`}</style>
        </noscript>
      </head>
      <body className="relative min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:m-4 focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-background"
        >
          Vai al contenuto
        </a>
        <Header />
        <main id="contenuto" className="flex-1 pt-[var(--header-h)]">
          {children}
        </main>
        <Footer />
        <AgeGate />
      </body>
    </html>
  );
}
