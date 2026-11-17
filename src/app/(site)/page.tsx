// src/app/(site)/page.tsx
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import ServicesGrid from "@/components/ServicesGrid";
import MeteoBar from "@/components/MeteoBar";
import BachecaEventi from "@/components/BachecaEventi";
import LinkUtili from "@/components/LinkUtili";
import { leggiMeteo } from "@/lib/meteo";
import Safety from "@/components/Safety";
import Contacts from "@/components/Contacts";
import { reader } from "@/lib/content";

export default async function HomePage() {
  const [home, meteo] = await Promise.all([reader.singletons.home.readOrThrow(), leggiMeteo()]);

  return (
    <>
      <Hero {...home.hero} />
      <Intro {...home.intro} />
      <ServicesGrid cards={home.servizi} email={home.contatti.email}>
        {meteo && <MeteoBar meteo={meteo} />}
        <BachecaEventi titolo={home.eventi.titolo} eventi={home.eventi.lista} />
        <LinkUtili links={home.linkUtili} />
      </ServicesGrid>
      <Safety
        titolo={home.sicurezza.titolo}
        testo={home.sicurezza.testo}
        galleria={home.sicurezza.galleria.filter(
          (g): g is { foto: string; descrizione: string } => Boolean(g.foto),
        )}
      />
      <Contacts {...home.contatti} />
      {/* niente Navbar / Footer qui */}
    </>
  );
}
