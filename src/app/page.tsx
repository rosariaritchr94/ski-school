// src/app/page.tsx
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import ServicesGrid from "@/components/ServicesGrid";
import Safety from "@/components/Safety";
import Contacts from "@/components/Contacts";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesGrid />
      <Safety />
      <Contacts />
      {/* NIENTE <Navbar /> QUI, NIENTE <Footer /> QUI */}
    </>
  );
}
