import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";

export default function NotFound() {
  return (
    <div className="relative -mt-[var(--header-h)] flex min-h-[90svh] items-center justify-center overflow-hidden pt-[var(--header-h)]">
      <Aurora intensity={0.9} />
      <Container className="relative flex flex-col items-center gap-6 py-20 text-center">
        <Image
          src="/logo/nettuno-gold-emblem-180.png"
          alt="Emblema Nettuno Gold"
          width={180}
          height={202}
          className="h-20 w-auto animate-float opacity-90"
        />
        <span className="font-display text-8xl font-extrabold tracking-tighter text-gold-shine sm:text-9xl">404</span>
        <h1 className="font-display text-2xl font-bold tracking-tight text-heading-gradient md:text-3xl">
          Questa pagina è andata all-in e non è tornata
        </h1>
        <p className="max-w-md text-muted">
          La pagina che cerchi non esiste o è stata spostata. Torna alla home o consulta il calendario tornei.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/">Torna alla home</Button>
          <Button href="/tornei" variant="secondary">
            Calendario tornei
          </Button>
        </div>
      </Container>
    </div>
  );
}
