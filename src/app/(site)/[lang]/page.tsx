// src/app/(site)/[lang]/page.tsx
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
import { linkLocale, localizza, type Lingua } from "@/lib/lingue";

export default async function HomePage({ params }: { params: { lang: Lingua } }) {
  const { lang } = params;
  const [contenuto, meteo] = await Promise.all([reader.singletons.home.readOrThrow(), leggiMeteo()]);
  const home = localizza(contenuto, lang);

  return (
    <>
      <Hero {...home.hero} />
      <Intro {...home.intro} lang={lang} />
      <ServicesGrid
        lang={lang}
        cards={home.servizi.map((c) => ({ ...c, link: linkLocale(c.link, lang) }))}
        email={home.contatti.email}
      >
        {meteo && <MeteoBar meteo={meteo} lang={lang} />}
        <BachecaEventi titolo={home.eventi.titolo} eventi={home.eventi.lista} lang={lang} />
        <LinkUtili links={home.linkUtili} />
      </ServicesGrid>
      <Safety
        lang={lang}
        titolo={home.sicurezza.titolo}
        testo={home.sicurezza.testo}
        galleria={home.sicurezza.galleria.filter(
          (g): g is { foto: string; descrizione: string } => Boolean(g.foto),
        )}
      />
      <Contacts {...home.contatti} lang={lang} />
    </>
  );
}
