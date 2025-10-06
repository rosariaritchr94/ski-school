export default function Safety() {
  return (
    <section className="slice slice-black">
      <div className="container-site">
        {/* Testo + foto grande */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="max-w-[560px]">
            <h2 className="uppercase text-[26px] leading-tight">
              Imparare<br/>in totale<br/>sicurezza
            </h2>
            <p className="mt-3 text-[13px] text-white/80">
              I nostri maestri di sci e snowboard di Evolution Pila sono
              sempre a disposizione: programmi su misura e lezioni di sci
              e snowboard a bambini ed adulti. Ottimo aspetto, esperienza e
              sicurezza: per una vacanza indimenticabile a Pila in Valle d’Aosta.
            </p>
          </div>

          <div className="w-full">
            <div className="aspect-[4/3] w-full rounded-[12px] bg-white shadow-2xl shadow-black/50" />
            <p className="mt-1 text-center text-[10px] tracking-[0.22em] text-white/70 uppercase">
              Foto (gruppo di bambini)
            </p>
          </div>
        </div>

        {/* thumbnails + frecce */}
        <div className="mt-8 md:mt-10 flex items-center justify-center gap-3">
          <button aria-label="precedente" className="h-8 w-8 grid place-items-center rounded-full border border-white/50 text-white/80 hover:bg-white hover:text-black">‹</button>

          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[62px] w-[110px] rounded-[10px] bg-white/90 shadow-md shadow-black/40 grid place-items-center">
                <span className="text-[10px] uppercase tracking-[0.22em] text-black/70">Foto</span>
              </div>
            ))}
          </div>

          <button aria-label="successiva" className="h-8 w-8 grid place-items-center rounded-full border border-white/50 text-white/80 hover:bg-white hover:text-black">›</button>
        </div>
      </div>
    </section>
  );
}
