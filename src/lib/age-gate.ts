// Disclaimer per i maggiorenni (components/layout/AgeGate.tsx).
// File separato dal componente: il layout (lato server) deve poter leggere
// lo script come testo, cosa che non funziona importandolo da un file
// "use client".

// Chiave salvata nel browser dopo la conferma: le visite successive non
// mostrano più il disclaimer.
export const AGE_GATE_STORAGE_KEY = "ng-age-ok";

// Eseguito in <head> prima che la pagina venga disegnata: chi ha già
// confermato non vede nemmeno un lampo del riquadro.
export const AGE_GATE_SCRIPT = `try{if(localStorage.getItem("${AGE_GATE_STORAGE_KEY}")==="1")document.documentElement.setAttribute("data-age-ok","")}catch(e){}`;
