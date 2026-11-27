import { Hero } from "@/components/sections/Hero";
import { ProssimiTornei } from "@/components/sections/ProssimiTornei";
import { ClubIntro } from "@/components/sections/ClubIntro";
import { SalaGallery } from "@/components/sections/SalaGallery";
import { ContattiMappa } from "@/components/sections/ContattiMappa";
import { PartnerBanner } from "@/components/sections/PartnerBanner";

// Le pagine sono generate in anticipo; questa impostazione le rigenera al
// massimo ogni ora, così i tornei che diventano passati spariscono da soli
// anche senza un nuovo salvataggio dal pannello.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <ProssimiTornei />
      <ClubIntro />
      <SalaGallery />
      <ContattiMappa />
      <PartnerBanner />
    </>
  );
}
