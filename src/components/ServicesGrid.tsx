const CARDS = [
  { title: "Lezioni individuali",      text: "Una lezione personalizzata, su misura per scoprire i segreti nascosti dello sci e snowboard." },
  { title: "Webcam live",               text: "Scegli fra le webcam a disposizione per avere in diretta splendide vedute e capire la neve per la tua giornata sulla neve." },
  { title: "Lezione di gruppo",         text: "Una soluzione adatta a tutti coloro che vogliono condividere con nuovi amici la passione per lo sci e per lo snowboard." },
  { title: "Fondo e Telemark",          text: "Lezioni pensate per chi ama, conoscere/approfondire sci di fondo, con tempi ridotti per dedicare attenzione ad ogni dettaglio." },
];

export default function ServicesGrid() {
  return (
    <section className="slice slice-blue">
      <div className="container-site grid md:grid-cols-2 gap-6">
        {CARDS.map((c, i) => (
          <div
            key={i}
            className="rounded-[14px] border border-white/55 bg-black/85 backdrop-blur-sm shadow-xl shadow-black/40 p-5"
          >
            <h3 className="text-white font-semibold uppercase tracking-[0.18em] text-[13px]">
              {c.title}
            </h3>
            <p className="mt-2 text-white/80 text-[11px] leading-relaxed">
              {c.text}
            </p>

            <button className="mt-3 btn btn-ghost">
              Inserire foto
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
