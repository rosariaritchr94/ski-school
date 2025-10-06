// src/app/(site)/lezioni/page.tsx
export const metadata = { title: "Lezioni – Gran Paradiso" };

export default function LezioniPage() {
  return (
    <main>
      {/* HERO GRIGIO */}
      <section className="lezioni-hero">
        <div className="inner">
          <div className="container-site text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-[0.02em] uppercase text-white">
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

      {/* BLOCCO NERO — LEZIONI INDIVIDUALI */}
      <section className="lezioni-black">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Testi */}
            <div>
              <h2 className="text-white text-3xl md:text-4xl font-extrabold uppercase leading-tight">
                Lezioni<br />Individuali
              </h2>

              <p className="mt-4 text-[13px] text-white/80 max-w-[520px]">
                Cosa c’è di meglio di una lezione personalizzata e su misura per poter scoprire i segreti nascosti dello
                sci e dello snowboard? Grazie ai nostri maestri potrai acquisire maggiore confidenza ed abilità in ogni
                disciplina proposta, in un contesto naturale, sicuro e unico come quello della bellissima conca di Pila.
                Scegli tra queste attività e prenota subito la tua lezione:
              </p>

              {/* Icone/discipline (placeholder) */}
              <div className="mt-5 flex items-center gap-8 text-white/90 text-xs uppercase tracking-[0.22em]">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-7 h-7 rounded bg-white/10" /> Sci Alpino
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-7 h-7 rounded bg-white/10" /> Snowboard
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-7 h-7 rounded bg-white/10" /> Sci Nordico
                </div>
              </div>
            </div>

            {/* Foto a destra */}
            <div className="foto-box aspect-[4/3]" />
          </div>

          {/* TARIFFE Individuali */}
          <div className="mt-10 md:mt-14">
            <h3 className="text-white text-2xl md:text-3xl font-extrabold uppercase">
              Tariffe e modalità
            </h3>
            <p className="mt-2 text-sm text-white/80 max-w-[900px]">
              Le lezioni possono essere costruite per principianti, per il perfezionamento, modalità freestyle, freeride,
              new school e hard (snowboard). Le lezioni si tengono tutti i giorni, dalle 9:00 alle 17:00. Per assicurare
              una fruizione ottimale è consigliata la prenotazione.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-8">
              {/* Bassa stagione */}
              <div>
                <div className="text-white/90 uppercase tracking-[0.28em] text-[12px]">Bassa stagione</div>
                <div className="mt-3 flex flex-wrap items-end gap-6">
                  <div><div className="pill">1 persona</div><div className="price">49 €/ora</div></div>
                  <div><div className="pill">2 persone</div><div className="price">67 €/ora</div></div>
                  <div><div className="pill">3 persone</div><div className="price">85 €/ora</div></div>
                </div>
                <p className="mt-3 text-[12px] text-white/60 max-w-[780px]">
                  Prenotando un pacchetto da 10 ore, si potrà ottenere uno sconto del 10% ad esclusione della lezione singola.
                  Ogni persona in più comporta un costo di +18€.
                </p>
              </div>

              {/* Alta stagione */}
              <div>
                <div className="text-white/90 uppercase tracking-[0.28em] text-[12px]">Alta stagione</div>
                <div className="mt-3 flex flex-wrap items-end gap-6">
                  <div><div className="pill">1 persona</div><div className="price">53 €/ora</div></div>
                  <div><div className="pill">2 persone</div><div className="price">73 €/ora</div></div>
                  <div><div className="pill">3 persone</div><div className="price">93 €/ora</div></div>
                </div>
                <p className="mt-3 text-[12px] text-white/60 max-w-[780px]">
                  Prenotando un pacchetto da 10 ore, si potrà ottenere uno sconto del 10% ad esclusione della lezione singola.
                  Ogni persona in più comporta un costo di +18€.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCCO AZZURRO — LEZIONI DI GRUPPO */}
      <section className="lezioni-blue">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Foto a sinistra */}
            <div className="foto-box aspect-[4/3]" />

            {/* Testo */}
            <div>
              <h2 className="text-white text-3xl md:text-4xl font-extrabold uppercase leading-tight">
                Lezioni di<br />Gruppo
              </h2>
              <p className="mt-4 text-[13px] text-white/90 max-w-[540px]">
                Una soluzione adatta a tutti coloro che vogliono condividere con nuovi amici la passione per lo sci o per lo
                snowboard. Adatta sia ai più piccoli che si affacciano per la prima volta al magico mondo della neve, come
                agli esperti delle piste nere.
              </p>

              {/* Icone/discipline (placeholder) */}
              <div className="mt-5 flex items-center gap-8 text-white/90 text-xs uppercase tracking-[0.22em]">
                <div className="flex items-center gap-2"><span className="inline-block w-7 h-7 rounded bg-white/10" /> Sci Alpino</div>
                <div className="flex items-center gap-2"><span className="inline-block w-7 h-7 rounded bg-white/10" /> Sci Nordico</div>
              </div>
            </div>
          </div>

          {/* Tariffe di gruppo */}
          <div className="mt-12">
            <h3 className="text-white text-2xl md:text-3xl font-extrabold uppercase">
              Tariffe e modalità
            </h3>
            <p className="mt-2 text-sm text-white/90 max-w-[900px]">
              Le lezioni sono pianificate per un minimo di 2 fino ad un massimo di 6 (snowboard 12) persone e si suddividono
              per livelli omogenei. Per assicurare una fruizione ottimale è consigliata la prenotazione.
            </p>

            <div className="mt-6 grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-white/90 uppercase tracking-[0.28em] text-[12px]">Mini collettiva settimanale</div>
                <div className="mt-3 flex flex-wrap items-end gap-6">
                  <div><div className="pill">1 persona</div><div className="price">49 €/ora</div></div>
                  <div><div className="pill">2 persone</div><div className="price">67 €/ora</div></div>
                  <div><div className="pill">3 persone</div><div className="price">85 €/ora</div></div>
                </div>
              </div>
              <div>
                <div className="text-white/90 uppercase tracking-[0.28em] text-[12px]">Collettiva</div>
                <div className="mt-3 flex flex-wrap items-end gap-6">
                  <div><div className="pill">1 persona</div><div className="price">53 €/ora</div></div>
                  <div><div className="pill">2 persone</div><div className="price">73 €/ora</div></div>
                  <div><div className="pill">3 persone</div><div className="price">93 €/ora</div></div>
                </div>
              </div>
              <div>
                <div className="text-white/90 uppercase tracking-[0.28em] text-[12px]">Collettiva Snowboard</div>
                <div className="mt-3 flex flex-wrap items-end gap-6">
                  <div><div className="pill">1 persona</div><div className="price">53 €/ora</div></div>
                  <div><div className="pill">2 persone</div><div className="price">73 €/ora</div></div>
                  <div><div className="pill">3 persone</div><div className="price">93 €/ora</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* chiusura nera */}
      <section className="bg-black py-16" />
    </main>
  );
}
