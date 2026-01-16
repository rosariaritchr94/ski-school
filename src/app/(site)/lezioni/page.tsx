// src/app/(site)/lezioni/page.tsx
import Image from "next/image";

export const metadata = { title: "Lezioni – Gran Paradiso" };

export default function LezioniPage() {
  return (
    <main>
      {/* HERO CON FOTO DI SFONDO */}
      <section className="lezioni-hero">
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
              Lezioni
            </h1>
          </div>
        </div>
      </section>

      {/* ===================== BLOCCO NERO 1 – LEZIONI INDIVIDUALI ===================== */}
      <section className="lezioni-black lezioni-black--first">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="max-w-[620px]">
              <h2
                className="
                  font-sofia mt-2
                  text-[38px] sm:text-[48px] lg:text-[80px]
                  leading-[1.05]
                  font-extrabold uppercase text-white
                "
              >
                Lezioni
                <br />
                individuali
              </h2>

              <p
                className="
                  font-oswald mt-4
                  text-[16px] sm:text-[18px] lg:text-[20px]
                  leading-relaxed text-white/80
                "
                style={{ textAlign: "justify" }}
              >
                Cosa c’è di meglio di una lezione personalizzata e su misura per
                poter scoprire i segreti nascosti dello sci e dello snowboard?
                Grazie ai nostri maestri potrai acquisire maggiore confidenza ed
                abilità in ogni disciplina proposta, in un contesto naturale,
                sicuro e unico come quello del Gran Paradiso. Scegli tra queste
                attività e prenota la tua lezione:
              </p>

              <div className="mt-6 flex flex-wrap gap-6 text-white/90 text-[11px] md:text-xs uppercase tracking-[0.22em] font-oswald">
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/logos/logo_alpino.png"
                    alt="Sci alpino"
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                  Sci alpino
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/logos/logo_snowboard.png"
                    alt="Snowboard"
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                  Snowboard
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/logos/logo_fondo.png"
                    alt="Sci nordico"
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                  Sci nordico
                </div>
              </div>
            </div>

            <div className="foto-box relative aspect-[4/3] overflow-hidden">
              <Image
                src="/foto/1.jpg"
                alt="Lezioni individuali di sci a Cogne"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 520px, 100vw"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <article className="bg-[#B91C1C] rounded-[12px] shadow-[0_18px_40px_rgba(0,0,0,.45)] px-6 py-6 md:px-7 md:py-7 flex flex-col items-center justify-center text-center min-h-[220px]">
              <h4 className="font-sofia font-extrabold text-white text-[22px] sm:text-[24px] lg:text-[26px] uppercase tracking-[0.08em] mb-3">
                <span className="inline-block border-b-2 border-white pb-1">
                  Vacanze di Natale
                </span>
              </h4>
              <p className="font-oswald text-white text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed">
                Dal 26/12/2025 al 06/01/2026
              </p>
            </article>

            <article className="bg-[#1DB0D5] rounded-[12px] shadow-[0_18px_40px_rgba(0,0,0,.45)] px-6 py-6 md:px-7 md:py-7 flex flex-col items-center justify-center text-center min-h-[220px]">
              <h4 className="font-sofia font-extrabold text-white text-[22px] sm:text-[24px] lg:text-[26px] uppercase tracking-[0.08em] mb-3">
                <span className="inline-block border-b-2 border-white pb-1">
                  Alta stagione
                </span>
              </h4>
              <p className="font-oswald text-white text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed">
                Dal 06/12/2025 al 25/12/2025
                <br />
                Dal 01/01/2026 al 11/01/2026
                <br />
                Dal 07/02/2026 al 13/03/2026
                <br />
                e tutti i weekend
              </p>
            </article>

            <article className="bg-[#0E657C] rounded-[12px] shadow-[0_18px_40px_rgba(0,0,0,.45)] px-6 py-6 md:px-7 md:py-7 flex flex-col items-center justify-center text-center min-h-[220px]">
              <h4 className="font-sofia font-extrabold text-white text-[22px] sm:text-[24px] lg:text-[26px] uppercase tracking-[0.08em] mb-3">
                <span className="inline-block border-b-2 border-white pb-1">
                  Bassa stagione
                </span>
              </h4>
              <p className="font-oswald text-white text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed">
                Dal 12/01/2026 al 06/02/2026
                <br />
                Dal 02/03/2026 a fine stagione
              </p>
            </article>
          </div>

          <div className="mt-10 md:mt-12">
            <h3 className="font-sofia text-white text-[30px] sm:text-[34px] lg:text-[38px] font-extrabold uppercase">
              Lezioni private
            </h3>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse font-oswald text-[15px] sm:text-[17px] lg:text-[19px] text-white">
                <thead>
                  <tr>
                    <th className="bg-black px-4 py-3 text-left text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      Tipo lezione
                    </th>
                    <th className="bg-[#B91C1C] px-4 py-3 text-center text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      Vacanze di Natale
                    </th>
                    <th className="bg-[#1DB0D5] px-4 py-3 text-center text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      Alta stagione
                    </th>
                    <th className="bg-[#1389A8] px-4 py-3 text-center text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      Bassa stagione
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Sci alpino", sub: "fascia oraria 9:00 – 14:30", prices: ["€ 54", "€ 51", "€ 47"] },
                    { label: "Sci alpino", sub: "fascia oraria 14:30 – 16:30", prices: ["€ 52", "€ 49", "€ 45"] },
                    { label: "Sci nordico", sub: "fascia oraria 9:00 – 15:00", prices: ["€ 49", "€ 47", "€ 45"] },
                    { label: "Sci nordico", sub: "fascia oraria 15:00 – 17:00", prices: ["€ 47", "€ 45", "€ 43"] },
                  ].map((row, idx) => (
                    <tr key={idx} className="bg-black/70">
                      <td className="border border-white/15 px-4 py-3 align-top">
                        <div className="uppercase text-[13px] sm:text-[14px] tracking-[0.16em]">
                          {row.label}
                        </div>
                        <div className="text-[13px] text-white/70">{row.sub}</div>
                      </td>
                      {row.prices.map((price, j) => (
                        <td key={j} className="border border-white/15 px-4 py-3 text-center">
                          {price}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 font-oswald text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed text-white/60">
              *Supplemento per ogni persona aggiunta:{" "}
              <span className="uppercase tracking-[0.16em] text-[#B91C1C]">Natale</span> 18 € |{" "}
              <span className="uppercase tracking-[0.16em] text-[#1DB0D5]">Alta stagione</span> 17 € |{" "}
              <span className="uppercase tracking-[0.16em] text-[#1389A8]">Bassa stagione</span> 13 €.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== MONTAGNA – LEZIONI DI GRUPPO ===================== */}
      <section className="lezioni-mtn">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="foto-box relative aspect-[4/3] overflow-hidden">
              <Image
                src="/foto/4.jpg"
                alt="Lezioni di gruppo di sci a Cogne"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 520px, 100vw"
              />
            </div>

            <div className="max-w-[620px]">
              <h2 className="font-sofia mt-2 text-[38px] sm:text-[48px] lg:text-[80px] leading-[1.05] font-extrabold uppercase text-white">
                Lezioni di
                <br />
                gruppo
              </h2>

              <p
                className="font-oswald mt-4 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/90"
                style={{ textAlign: "justify" }}
              >
                Una soluzione adatta a tutti coloro che vogliono condividere con nuovi amici la passione per lo sci o per lo snowboard.
                Ideale per bambini e adulti, dai primi passi sulla neve fino agli amanti delle piste più impegnative.
              </p>

              <div className="mt-6 flex flex-wrap gap-6 text-white/90 text-[11px] md:text-xs uppercase tracking-[0.22em] font-oswald">
                <div className="flex items-center gap-2">
                  <Image src="/assets/logos/logo_alpino_b.png" alt="Sci alpino" width={36} height={36} className="h-9 w-9 object-contain" />
                  Sci alpino
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/assets/logos/logo_snowboard_b.png" alt="Snowboard" width={36} height={36} className="h-9 w-9 object-contain" />
                  Snowboard
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/assets/logos/logo_fondo_b.png" alt="Sci nordico" width={36} height={36} className="h-9 w-9 object-contain" />
                  Sci nordico
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-sofia text-white text-[30px] sm:text-[34px] lg:text-[38px] font-extrabold uppercase">
              Tariffe e modalità
            </h3>

            <p className="font-oswald mt-3 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/90 max-w-[900px]">
              Le lezioni collettive sono organizzate per livelli omogenei, con gruppi ridotti per garantire sicurezza e divertimento.
              La partecipazione è garantita con un minimo di 4 iscritti per corso.
            </p>

            <h4 className="font-sofia mt-6 text-white text-[26px] sm:text-[30px] lg:text-[32px] font-extrabold uppercase">
              Lezioni collettive
            </h4>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse font-oswald text-[15px] sm:text-[17px] lg:text-[19px] text-white">
                <thead>
                  <tr>
                    <th className="bg-black/70 px-4 py-3 text-left text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      Tipo lezione
                    </th>
                    <th className="bg-[#1DB0D5] px-4 py-3 text-center text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      Pacchetto
                    </th>
                    <th className="bg-[#1389A8] px-4 py-3 text-center text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      Tariffa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-black/60">
                    <td className="border border-white/15 px-4 py-3 align-top">
                      <div className="uppercase text-[13px] sm:text-[14px] tracking-[0.16em]">Sci alpino</div>
                      <div className="text-[13px] text-white/70">seggiovia 10:00 – 12:00</div>
                    </td>
                    <td className="border border-white/15 px-4 py-3 text-center align-top">1 giorno</td>
                    <td className="border border-white/15 px-4 py-3 text-center align-top">60 €</td>
                  </tr>
                  <tr className="bg-black/60">
                    <td className="border border-white/15 px-4 py-3 align-top">
                      <div className="uppercase text-[13px] sm:text-[14px] tracking-[0.16em]">Sci alpino</div>
                      <div className="text-[13px] text-white/70">seggiovia 11:00 – 13:00</div>
                    </td>
                    <td className="border border-white/15 px-4 py-3 text-center align-top">3 giorni</td>
                    <td className="border border-white/15 px-4 py-3 text-center align-top">155 €</td>
                  </tr>
                  <tr className="bg-black/60">
                    <td className="border border-white/15 px-4 py-3 align-top">
                      <div className="uppercase text-[13px] sm:text-[14px] tracking-[0.16em]">Sci alpino</div>
                      <div className="text-[13px] text-white/70">baby park 11:00 – 13:00</div>
                    </td>
                    <td className="border border-white/15 px-4 py-3 text-center align-top">5 giorni</td>
                    <td className="border border-white/15 px-4 py-3 text-center align-top">230 €</td>
                  </tr>
                  <tr className="bg-black/60">
                    <td className="border border-white/15 px-4 py-3 align-top">
                      <div className="uppercase text-[13px] sm:text-[14px] tracking-[0.16em]">Sci nordico</div>
                      <div className="text-[13px] text-white/70">13:00 – 15:00</div>
                    </td>
                    <td className="border border-white/15 px-4 py-3 text-center align-top">7 giorni</td>
                    <td className="border border-white/15 px-4 py-3 text-center align-top">310 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-3 font-oswald text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed text-white/80">
              *Sconto del 10% sul secondo figlio iscritto allo stesso corso.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== BLOCCO NERO 2 – SNOWCARE & PAGAMENTI ===================== */}
      <section className="lezioni-black">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="max-w-[620px]">
              <h2 className="font-sofia mt-2 text-[38px] sm:text-[48px] lg:text-[80px] leading-[1.05] font-extrabold uppercase text-white">
                Assicurazione
                <br />
                Snowcare –
                <br />
                <span className="text-[#0E657C]">
                  proteggi la tua
                  <br />
                  prenotazione!
                </span>
              </h2>

              <p
                className="font-oswald mt-4 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/80"
                style={{ textAlign: "justify" }}
              >
                Con l’assicurazione Snowcare puoi tutelare la tua vacanza e le tue lezioni di sci in caso di infortunio o imprevisti.
                È una copertura pensata per chi frequenta la montagna sulla neve e desidera vivere le proprie giornate in sicurezza e serenità.
              </p>

              <p className="font-oswald mt-3 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/80">
                Chiedi maggiori informazioni alla segreteria al momento della prenotazione o il giorno stesso della lezione.
              </p>
            </div>

            <div className="w-full flex justify-center md:justify-end">
              <div className="foto-box relative w-full max-w-[720px] aspect-[16/9] overflow-hidden">
                <Image
                  src="/foto/snowcare.jpg"
                  alt="Assicurazione Snowcare – proteggi la tua prenotazione"
                  fill
                  sizes="(min-width: 1024px) 720px, (min-width: 768px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-14 max-w-[780px]">
            <h3 className="font-sofia text-white text-[30px] sm:text-[34px] lg:text-[38px] font-extrabold uppercase">
              Cancellazioni & pagamenti
            </h3>

            <p className="font-oswald mt-3 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/80">
              Le lezioni si considerano confermate al momento della prenotazione. In caso di impossibilità a partecipare, ti chiediamo
              di avvisarci il prima possibile: le disdette comunicate con almeno 24 ore di anticipo non comportano penali, mentre oltre
              tale termine la lezione potrà essere addebitata.
            </p>

            <p className="font-oswald mt-3 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/80">
              Il pagamento può essere effettuato in segreteria, in contanti, carta o bancomat, oppure tramite bonifico anticipato secondo
              le indicazioni che riceverai al momento della conferma.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== MONTAGNA – ORARI & LUOGHI ===================== */}
      <section className="lezioni-mtn">
        <div className="container-site">
          <div className="max-w-[900px]">
            <h2 className="font-sofia mt-2 text-white text-[38px] sm:text-[48px] lg:text-[80px] leading-[1.05] font-extrabold uppercase">
              Orari &
              <br />
              luoghi di ritrovo
            </h2>

            <p
              className="font-oswald mt-4 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/90"
              style={{ textAlign: "justify" }}
            >
              I punti di ritrovo variano in base al tipo di corso e al livello. Nella mappa trovi indicati i luoghi principali di incontro
              con i maestri e gli orari di riferimento. Ti consigliamo di presentarti con qualche minuto di anticipo.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3 font-oswald text-[13px] md:text-[14px] text-white">
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
