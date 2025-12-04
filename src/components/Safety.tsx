import Image from "next/image";

export default function Safety() {
  return (
    <section className="slice slice-black">
      <div className="container-site">
        {/* Testo + foto grande */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="max-w-[620px]">
            {/* TITOLO – stesso stile di THE WILD SIDE OF SKIING (SOFIA SANS) */}
            <h2
              className="
                font-sofia
                mt-2
                text-[38px] sm:text-[48px] lg:text-[80px]
                leading-[1.05]
                font-extrabold
                text-white
                uppercase
              "
            >
              Vivi<br />
              l’avventura<br />
              in totale<br />
              sicurezza
            </h2>

            {/* PARAGRAFO – stesso stile descrizione intro (OSWALD) */}
            <p
              className="
                font-oswald
                mt-4
                text-[16px] sm:text-[18px] lg:text-[20px]
                leading-relaxed
                text-white/80
              "
              style={{ textAlign: "justify" }}
            >
            I nostri maestri della Scuola di Sci Gran Paradiso
             sono sempre pronti ad accompagnarti: 
             programmi personalizzati e lezioni dedicate a bambini e adulti, 
             all’insegna di professionalità, esperienza e sicurezza. 
             Tutto ciò che ti serve per vivere una vacanza indimenticabile a Cogne, nel cuore della Valle d’Aosta.
            </p>
          </div>

          {/* FOTO GRUPPO BAMBINI */}
          <div className="w-full">
            <div className="relative aspect-[4/3] w-full rounded-[12px] overflow-hidden bg-white shadow-2xl shadow-black/50">
              <Image
                src="/foto/gruppo_bambini.png" // <--- aggiorna se usi .jpg
                alt="Maestro di sci con gruppo di bambini sulle piste"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 520px, 100vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* thumbnails + frecce */}
        <div className="mt-8 md:mt-10 flex items-center justify-center gap-3">
          <button
            aria-label="precedente"
            className="h-8 w-8 grid place-items-center rounded-full border border-white/50 text-white/80 hover:bg-white hover:text-black"
          >
            ‹
          </button>

          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[62px] w-[110px] rounded-[10px] bg-white/90 shadow-md shadow-black/40 grid place-items-center"
              >
                <span className="text-[10px] uppercase tracking-[0.22em] text-black/70">
                  Foto
                </span>
              </div>
            ))}
          </div>

          <button
            aria-label="successiva"
            className="h-8 w-8 grid place-items-center rounded-full border border-white/50 text-white/80 hover:bg-white hover:text-black"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
