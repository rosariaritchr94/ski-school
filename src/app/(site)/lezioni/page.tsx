// src/app/(site)/lezioni/page.tsx
export const metadata = { title: "Lezioni – Gran Paradiso" };

export default function LezioniPage() {
  return (
    <main>
      {/* HERO GRIGIO CON FOTO DI SFONDO */}
      <section className="lezioni-hero">
        <div className="inner">
          <div className="container-site text-center">
            <h1
              className="
                font-sofia
                text-4xl md:text-6xl
                font-extrabold
                tracking-[0.02em]
                uppercase
                text-white
              "
            >
              Lezioni
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

      {/* ===================== BLOCCO NERO 1 – LEZIONI INDIVIDUALI ===================== */}
      <section className="lezioni-black">
        <div className="container-site">
          {/* TESTO + FOTO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Testi */}
            <div className="max-w-[560px]">
              <h2
                className="
                  font-sofia
                  text-white
                  text-[30px] md:text-[40px]
                  font-extrabold
                  uppercase
                  leading-tight
                "
              >
                Lezioni
                <br />
                individuali
              </h2>

              <p
                className="
                  font-oswald
                  mt-4
                  text-[14px] md:text-[15px]
                  text-white/80
                "
              >
                Cosa c’è di meglio di una lezione personalizzata e su misura
                per poter scoprire i segreti nascosti dello sci e dello
                snowboard? Grazie ai nostri maestri potrai acquisire maggiore
                confidenza ed abilità in ogni disciplina proposta, in un
                contesto naturale, sicuro e unico come quello del Gran
                Paradiso. Scegli tra queste attività e prenota la tua lezione:
              </p>

              {/* Icone / discipline (stilizzate) */}
              <div className="mt-6 flex flex-wrap gap-6 text-white/90 text-[11px] md:text-xs uppercase tracking-[0.22em] font-oswald">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-8 h-8 rounded-full border border-white/60" />
                  Sci alpino
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-8 h-8 rounded-full border border-white/60" />
                  Snowboard
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-8 h-8 rounded-full border border-white/60" />
                  Sci nordico
                </div>
              </div>
            </div>

            {/* Foto a destra (riempita in futuro) */}
            <div className="foto-box aspect-[4/3]" />
          </div>

          {/* PERIODI E TARIFFE */}
          <div className="mt-10 md:mt-14">
            <h3
              className="
                font-sofia
                text-white
                text-[22px] md:text-[26px]
                font-extrabold
                uppercase
              "
            >
              Periodi e tariffe
            </h3>

            <div className="mt-4 grid md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] gap-6 font-oswald text-[13px] md:text-[14px] text-white">
              {/* Nomi periodi */}
              <div className="space-y-3">
                <div className="uppercase tracking-[0.18em] text-[#37C6E6] text-[11px]">
                  Vacanze di Natale
                </div>
                <div className="uppercase tracking-[0.18em] text-[#37C6E6] text-[11px]">
                  Alta stagione
                </div>
                <div className="uppercase tracking-[0.18em] text-[#37C6E6] text-[11px]">
                  Bassa stagione
                </div>
              </div>

              {/* Date periodi */}
              <div className="space-y-3">
                <p>
                  Dal 26/12/2025 al 06/01/2026
                </p>
                <p>
                  Dal 06/12/2025 al 25/12/2025
                  <br />
                  Dal 01/01/2026 al 11/01/2026
                  <br />
                  Dal 07/02/2026 al 13/03/2026
                  <br />
                  e tutti i weekend
                </p>
                <p>
                  Dal 12/01/2026 al 06/02/2026
                  <br />
                  Dal 02/03/2026 a fine stagione
                </p>
              </div>
            </div>
          </div>

          {/* TABELLA LEZIONI PRIVATE */}
          <div className="mt-10 md:mt-12">
            <h3
              className="
                font-sofia
                text-white
                text-[22px] md:text-[26px]
                font-extrabold
                uppercase
              "
            >
              Lezioni private
            </h3>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse font-oswald text-[13px] md:text-[14px] text-white">
                <thead>
                  <tr>
                    <th className="bg-black px-4 py-3 text-left text-[11px] uppercase tracking-[0.18em]">
                      Tipo lezione
                    </th>
                    <th className="bg-[#37C6E6] px-4 py-3 text-center text-[11px] uppercase tracking-[0.18em]">
                      Vacanze di Natale
                    </th>
                    <th className="bg-[#1DB0D5] px-4 py-3 text-center text-[11px] uppercase tracking-[0.18em]">
                      Alta stagione
                    </th>
                    <th className="bg-[#1389A8] px-4 py-3 text-center text-[11px] uppercase tracking-[0.18em]">
                      Bassa stagione
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Sci alpino",
                      sub: "fascia oraria 9:00 – 14:30",
                      prices: ["€ 54", "€ 51", "€ 47"],
                    },
                    {
                      label: "Sci alpino",
                      sub: "fascia oraria 14:30 – 16:30",
                      prices: ["€ 52", "€ 49", "€ 45"],
                    },
                    {
                      label: "Sci nordico",
                      sub: "fascia oraria 9:00 – 15:00",
                      prices: ["€ 49", "€ 47", "€ 43"],
                    },
                    {
                      label: "Sci nordico",
                      sub: "fascia oraria 15:00 – 17:00",
                      prices: ["€ 47", "€ 45", "€ 43"],
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="bg-black/70">
                      <td className="border border-white/15 px-4 py-3">
                        <div className="uppercase text-[11px] tracking-[0.16em]">
                          {row.label}
                        </div>
                        <div className="text-[11px] text-white/70">{row.sub}</div>
                      </td>
                      {row.prices.map((price, j) => (
                        <td
                          key={j}
                          className="border border-white/15 px-4 py-3 text-center"
                        >
                          {price}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-[11px] md:text-[12px] text-white/60 font-oswald">
              *Supplemento di 10 € per persona aggiuntiva. Accurati i periodi di{" "}
              <span className="uppercase tracking-[0.16em]">Vacanze di Natale</span>,{" "}
              <span className="uppercase tracking-[0.16em]">Alta stagione</span> e{" "}
              <span className="uppercase tracking-[0.16em]">Bassa stagione</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== BLOCCO AZZURRO 1 – LEZIONI DI GRUPPO ===================== */}
      <section className="lezioni-blue">
        <div className="container-site">
          {/* FOTO + TESTO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Foto grande a sinistra */}
            <div className="foto-box aspect-[4/3]" />

            {/* Testo */}
            <div className="max-w-[560px]">
              <h2
                className="
                  font-sofia
                  text-white
                  text-[30px] md:text-[40px]
                  font-extrabold
                  uppercase
                  leading-tight
                "
              >
                Lezioni di
                <br />
                gruppo
              </h2>

              <p
                className="
                  font-oswald
                  mt-4
                  text-[14px] md:text-[15px]
                  text-white/90
                "
              >
                Una soluzione adatta a tutti coloro che vogliono condividere con
                nuovi amici la passione per lo sci o per lo snowboard. Ideale
                per bambini e adulti, dai primi passi sulla neve fino agli
                amanti delle piste più impegnative.
              </p>

              {/* Icone / discipline */}
              <div className="mt-6 flex flex-wrap gap-6 text-white/90 text-[11px] md:text-xs uppercase tracking-[0.22em] font-oswald">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-8 h-8 rounded-full border border-white/60" />
                  Sci alpino
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-8 h-8 rounded-full border border-white/60" />
                  Sci nordico
                </div>
              </div>
            </div>
          </div>

          {/* TARIFFE E MODALITÀ – LEZIONI COLLETTIVE */}
          <div className="mt-12">
            <h3
              className="
                font-sofia
                text-white
                text-[22px] md:text-[26px]
                font-extrabold
                uppercase
              "
            >
              Tariffe e modalità
            </h3>

            <p
              className="
                font-oswald
                mt-3
                text-[13px] md:text-[14px]
                text-white/90
                max-w-[900px]
              "
            >
              Le lezioni collettive sono organizzate per livelli omogenei, con
              gruppi ridotti per garantire sicurezza e divertimento. La
              partecipazione è garantita con un minimo di 4 iscritti per corso.
            </p>

            <h4
              className="
                font-sofia
                mt-6
                text-white
                text-[18px] md:text-[20px]
                font-extrabold
                uppercase
              "
            >
              Lezioni collettive
            </h4>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse font-oswald text-[13px] md:text-[14px] text-white">
                <thead>
                  <tr>
                    <th className="bg-black/70 px-4 py-3 text-left text-[11px] uppercase tracking-[0.18em]">
                      Tipo lezione
                    </th>
                    <th className="bg-[#37C6E6] px-4 py-3 text-center text-[11px] uppercase tracking-[0.18em]">
                      1 giorno
                    </th>
                    <th className="bg-[#1DB0D5] px-4 py-3 text-center text-[11px] uppercase tracking-[0.18em]">
                      3 giorni
                    </th>
                    <th className="bg-[#1389A8] px-4 py-3 text-center text-[11px] uppercase tracking-[0.18em]">
                      6 giorni
                    </th>
                    <th className="bg-[#0E657C] px-4 py-3 text-center text-[11px] uppercase tracking-[0.18em]">
                      7 giorni
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Sci alpino",
                      sub: "seggiovia 10:00 – 12:00",
                      prices: ["€ 60", "€ 155", "€ 230", "€ 260"],
                    },
                    {
                      label: "Sci alpino",
                      sub: "seggiovia 11:00 – 13:00",
                      prices: ["€ 60", "€ 155", "€ 230", "€ 260"],
                    },
                    {
                      label: "Sci alpino",
                      sub: "baby park 11:00 – 13:00",
                      prices: ["€ 60", "€ 155", "€ 230", "€ 260"],
                    },
                    {
                      label: "Sci nordico",
                      sub: "13:00 – 15:00",
                      prices: ["€ 60", "€ 155", "€ 230", "€ 310"],
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="bg-black/60">
                      <td className="border border-white/15 px-4 py-3">
                        <div className="uppercase text-[11px] tracking-[0.16em]">
                          {row.label}
                        </div>
                        <div className="text-[11px] text-white/70">{row.sub}</div>
                      </td>
                      {row.prices.map((price, j) => (
                        <td
                          key={j}
                          className="border border-white/15 px-4 py-3 text-center"
                        >
                          {price}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-[11px] md:text-[12px] text-white/80 font-oswald">
              *Sconto del 10% sul secondo figlio iscritto allo stesso corso.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== BLOCCO NERO 2 – SNOWCARE & PAGAMENTI ===================== */}
      <section className="lezioni-black">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Testo assicurazione */}
            <div className="max-w-[560px]">
              <h2
                className="
                  font-sofia
                  text-white
                  text-[24px] md:text-[30px]
                  font-extrabold
                  uppercase
                  leading-snug
                "
              >
                Assicurazione Snowcare –
                <br />
                proteggi la tua prenotazione!
              </h2>

              <p
                className="
                  font-oswald
                  mt-4
                  text-[13px] md:text-[14px]
                  text-white/80
                "
              >
                Con l’assicurazione Snowcare puoi tutelare la tua vacanza e le
                tue lezioni di sci in caso di infortunio o imprevisti. È una
                copertura pensata per chi frequenta la montagna sulla neve e
                desidera vivere le proprie giornate in sicurezza e serenità.
              </p>

              <p
                className="
                  font-oswald
                  mt-3
                  text-[13px] md:text-[14px]
                  text-white/80
                "
              >
                Chiedi maggiori informazioni alla segreteria al momento della
                prenotazione o il giorno stesso della lezione.
              </p>
            </div>

            {/* Foto a destra */}
            <div className="foto-box aspect-[4/3]" />
          </div>

          {/* Cancellazioni e pagamenti */}
          <div className="mt-10 md:mt-14 max-w-[780px]">
            <h3
              className="
                font-sofia
                text-white
                text-[22px] md:text-[26px]
                font-extrabold
                uppercase
              "
            >
              Cancellazioni & pagamenti
            </h3>

            <p
              className="
                font-oswald
                mt-3
                text-[13px] md:text-[14px]
                text-white/80
              "
            >
              Le lezioni si considerano confermate al momento della
              prenotazione. In caso di impossibilità a partecipare, ti
              chiediamo di avvisarci il prima possibile: le disdette comunicate
              con almeno 24 ore di anticipo non comportano penali, mentre oltre
              tale termine la lezione potrà essere addebitata.
            </p>

            <p
              className="
                font-oswald
                mt-3
                text-[13px] md:text-[14px]
                text-white/80
              "
            >
              Il pagamento può essere effettuato in segreteria, in contanti,
              carta o bancomat, oppure tramite bonifico anticipato secondo le
              indicazioni che riceverai al momento della conferma.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== BLOCCO AZZURRO 2 – ORARI & LUOGHI DI RITROVO ===================== */}
      <section className="lezioni-blue">
        <div className="container-site">
          <div className="max-w-[900px]">
            <h2
              className="
                font-sofia
                text-white
                text-[26px] md:text-[32px]
                font-extrabold
                uppercase
              "
            >
              Orari & luoghi di ritrovo
            </h2>

            <p
              className="
                font-oswald
                mt-4
                text-[13px] md:text-[14px]
                text-white/90
              "
            >
              I punti di ritrovo variano in base al tipo di corso e al livello.
              Nella mappa trovi indicati i luoghi principali di incontro con i
              maestri e gli orari di riferimento. Ti consigliamo di presentarti
              con qualche minuto di anticipo.
            </p>
          </div>

          {/* Legenda semplificata */}
          <div className="mt-6 grid gap-4 md:grid-cols-3 font-oswald text-[12px] md:text-[13px] text-white">
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-red-500" />
              Punto scuola sci
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-green-500" />
              Campo scuola / debutto
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-blue-500" />
              Ritrovo collettive
            </div>
          </div>

          {/* MAPPA (EMBED) */}
          <div className="mt-8 w-full rounded-[12px] overflow-hidden shadow-xl shadow-black/40">
            <div className="aspect-[16/9] w-full">
              <iframe
                src="https://www.google.com/maps?q=Scuola+di+Sci+e+Snowboard+Gran+Paradiso,+Via+Bourgeois+33,+11012+Cogne+AO&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
