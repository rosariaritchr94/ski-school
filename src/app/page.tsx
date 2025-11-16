import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import ServicesGrid from "@/components/ServicesGrid";
import Safety from "@/components/Safety";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Intro />
        <ServicesGrid />
        <Safety />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
