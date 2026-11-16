// src/app/(site)/page.tsx
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import ServicesGrid from "@/components/ServicesGrid";
import Safety from "@/components/Safety";
import Contacts from "@/components/Contacts";
import HomeFloating from "@/components/HomeFloating";
import { reader } from "@/lib/content";

export default async function HomePage() {
  const home = await reader.singletons.home.readOrThrow();

  return (
    <>
      <Hero {...home.hero} />
      <Intro {...home.intro} />
      <ServicesGrid cards={home.servizi} email={home.contatti.email} />
      <Safety
        titolo={home.sicurezza.titolo}
        testo={home.sicurezza.testo}
        galleria={home.sicurezza.galleria.filter(
          (g): g is { foto: string; descrizione: string } => Boolean(g.foto),
        )}
      />
      <Contacts {...home.contatti} />
      <HomeFloating
        telefono={home.contatti.telefono}
        instagram={home.contatti.instagram}
        facebook={home.contatti.facebook}
      />
      {/* niente Navbar / Footer qui */}
    </>
  );
}
