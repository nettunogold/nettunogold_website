// Dati societari e di contatto del locale.
// Fonti confermate: prompt-claude-code-poker-room_2.md
// Campi segnati "PLACEHOLDER" non sono stati forniti e vanno confermati col cliente.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nettunogold.it";

export const businessInfo = {
  name: "Nettuno Gold",
  legalName: "Nettuno Gold S.r.l.", // PLACEHOLDER: ragione sociale da confermare
  vatNumber: "IT00000000000", // PLACEHOLDER: P.IVA da confermare
  foundedYear: 2007,
  address: {
    street: "Via Toscanini 7/2",
    city: "Villanova di Castenaso",
    postalCode: "40055",
    region: "BO",
    country: "Italia",
  },
  phone: "+39 347 495 1601",
  phoneHref: "tel:+393474951601",
  whatsappHref: "https://wa.me/393474951601",
  email: "nettunogold@gmail.com",
  social: {
    instagram: "https://www.instagram.com/nettuno_gold/",
    facebook: "https://www.facebook.com/groups/59628730776/",
  },
  // PLACEHOLDER: orari di apertura da confermare col cliente
  openingHours: [
    { days: "Lunedì – Domenica", hours: "18:00 – 02:00" },
  ],
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Via+Toscanini+7%2F2%2C+40055+Villanova+di+Castenaso+BO",
  stats: {
    since: 2007,
    members: 5000, // mostrato come "5.000+"
    tournamentsPerYear: 200, // mostrato come "200+"
    areaSqm: 500,
    tables: 18,
    maxPlayers: 180,
  },
} as const;
