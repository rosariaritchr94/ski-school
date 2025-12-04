// src/app/(site)/maestri/page.tsx

export const metadata = { title: "Maestri – Gran Paradiso" };

// leggiamo la variabile (sarà "true" o "false" come stringa)
const SHOW_WIP = process.env.NEXT_PUBLIC_MAESTRI_WIP === "true";

export default function MaestriPage() {
  if (!SHOW_WIP) {
    // 🔴 VERSIONE ONLINE: PAGINA IN AGGIORNAMENTO
    return (
      <main>
        {/* HERO GRIGIO */}
        <section className="maestri-hero">
          <div className="inner">
            <div className="container-site text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-[0.02em] uppercase text-white">
                Maestri
              </h1>

              <p className="mt-6 text-white/90 uppercase tracking-[0.22em]">
                Pagina in aggiornamento
              </p>
              <p className="text-[10px] tracking-[0.28em] text-white/70 uppercase">
                Stiamo preparando la nuova sezione dedicata ai maestri
              </p>
            </div>
          </div>
        </section>

        {/* FASCIA NERA – messaggio */}
        <section className="maestri-black">
          <div className="container-site">
            <div className="max-w-[640px] mx-auto text-center">
              <h2 className="text-white text-2xl md:text-3xl font-extrabold uppercase leading-tight">
                Sito in aggiornamento
              </h2>

              <p className="mt-4 text-[13px] md:text-[14px] text-white/80">
                Presto potrai conoscere tutti i maestri della Scuola di Sci &amp;
                Snowboard Gran Paradiso, con foto, esperienze e
                specializzazioni.
                <br />
                Nel frattempo puoi già prenotare le tue lezioni o contattarci
                per qualsiasi informazione.
              </p>
            </div>
          </div>
        </section>

        {/* SEZIONE AZZURRA – bottoni utili */}
        <section className="maestri-blue">
          <div className="container-site">
            <div className="max-w-[640px] mx-auto text-center">
              <p className="text-[13px] md:text-[14px] text-white/85 mb-6">
                Scegli cosa vuoi fare ora:
              </p>
              <div className="flex flex-col md:flex-row gap-3 justify-center">
                <a
                  href="https://scuolascigranparadiso.beebeeboard.com/scuolesci_ecommerce/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent"
                >
                  Prenota ora
                </a>
                <a href="/#contatti" className="btn btn-ghost">
                  Vai ai contatti
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* chiusura nera in fondo */}
        <section className="bg-black py-20" />
      </main>
    );
  }

  // 🟢 VERSIONE DI LAVORO (WIP) – quella completa con claim + griglia
  return (
    <main>
      {/* HERO GRIGIO */}
      <section className="maestri-hero">
        <div className="inner">
          <div className="container-site text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-[0.02em] uppercase text-white">
              Maestri
            </h1>

            <p className="mt-8 text-white/90 uppercase tracking-[0.22em]">
              Foto sfondo
            </p>
            <p className="text-[10px] tracking-[0.28em] text-white/70 uppercase">
              (con gradiente scuro per far risaltare il titolo)
            </p>
          </div>
        </div>
      </section>

      {/* FASCIA NERA - claim + foto */}
      <section className="maestri-black">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* claim a sinistra */}
            <div>
              <h2 className="text-white text-3xl md:text-4xl font-extrabold uppercase leading-tight">
                Qualità<br />Esperienza<br />Divertimento
              </h2>

              <p className="mt-4 text-[13px] text-white/80 max-w-[560px]">
                I nostri maestri di sci e snowboard di Evolution Pila rispettano
                i più elevati standard di competenza e professionalità. Tutti
                i professionisti del gruppo di Pila in Valle d’Aosta vi
                garantiranno non solo sicurezza e qualità didattica di ogni
                insegnamento, ma anche il divertimento, con passione e spirito
                di squadra.
                <br />
                <br />
                Scoprite tutti i nostri maestri: la grande famiglia di Evolution
                Pila!
              </p>
            </div>

            {/* box foto a destra */}
            <div className="foto-box aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* SEZIONE AZZURRA con GRIGLIA MAESTRI */}
      <section className="maestri-blue">
        <div className="container-site">
          {/* griglia 4 colonne come nel mock; su mobile 2 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 lg:gap-7">
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className="maestro-card" />
            ))}
          </div>
        </div>
      </section>

      {/* chiusura nera in fondo (come nel mock) */}
      <section className="bg-black py-20" />
    </main>
  );
}
