// src/app/(site)/maestri/page.tsx
import MaestriGrid from "../../../components/MaestriGrid";

export const metadata = {
  title: "Maestri – Gran Paradiso",
};

export default function MaestriPage() {
  return (
    <main>
      {/* HERO – stesso effetto di Lezioni */}
      <section className="maestri-hero">
        <div className="inner">
          <div className="container-site text-center">
            <h1
              className="
                font-sofia mt-2
                text-[38px] sm:text-[48px] lg:text-[80px]
                leading-[1.05]
                font-extrabold tracking-[0.02em]
                uppercase text-white
              "
            >
              Maestri
            </h1>
          </div>
        </div>
      </section>

      {/* BLOCCO NERO – QUALITÀ / ESPERIENZA / DIVERTIMENTO */}
      <section className="maestri-black">
        <div className="container-site grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
          <div className="max-w-[520px]">
            <h2
              className="
                font-sofia
                text-white
                text-[34px] sm:text-[40px] lg:text-[52px]
                leading-[0.98]
                font-extrabold uppercase
                tracking-[0.08em]
              "
            >
              Qualità
              <br />
              Esperienza
              <br />
              Divertimento
            </h2>

            <p
              className="
                font-oswald
                mt-4
                text-[15px] sm:text-[17px] lg:text-[19px]
                leading-relaxed
                text-white/80
              "
              style={{ textAlign: "justify" }}
            >
              I nostri maestri di sci del Gran Paradiso rispettano i più elevati
              standard di competenza e professionalità. Ti accompagneranno sulla
              neve con entusiasmo, attenzione alla sicurezza e tanta passione
              per la montagna.
            </p>

            <p
              className="
                font-oswald
                mt-3
                text-[15px] sm:text-[17px] lg:text-[19px]
                leading-relaxed
                text-white/80
              "
            >
              Scopri tutti i maestri nella grande famiglia della Scuola di Sci
              Gran Paradiso.
            </p>
          </div>

          {/* Riquadro FOTO a destra */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="foto-box relative w-full max-w-[360px] aspect-square overflow-hidden bg-black">
              <img
                src="/foto/logo-hidef.png"
                alt="Scuola di Sci Gran Paradiso"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GRIGLIA MAESTRI SU SFONDO MONTAGNA AZZURRA */}
      <MaestriGrid />
    </main>
  );
}