"use client";

import Image from "next/image";

type Card = {
  key: string;
  title: string;
  text: string;
  image?: string;
  href?: string;
};

const CARDS: Card[] = [
  {
    key: "lezioni-individuali",
    title: "LEZIONI INDIVIDUALI",
    text: "Una lezione personalizzata e su misura per poter scoprire i segreti nascosti dello sci e dello snowboard.",
    image: "/foto/foto_lezione.jpg",
  },
  {
    key: "webcam-live",
    title: "WEBCAM LIVE",
    text: "Scegli tra le 6 webcam a disposizione per dare un ultimo sguardo alle piste prima di partire per la tua giornata sulla neve.",
    // 👇 immagine di anteprima salvata in /public/foto/webcam_cogne.png
    image: "/foto/webcam_cogne.png",
    // 👇 link esterno alla pagina delle webcam (scegli quella che preferisci)
    href: "https://www.skilife.ski/cogne/webcam/",
    // oppure:
    // href: "https://www.skylinewebcams.com/it/webcam/italia/valle-daosta/aosta/cogne-gran-paradiso.html",
  },
  {
    key: "lezione-di-gruppo",
    title: "LEZIONE DI GRUPPO",
    text: "Una soluzione adatta a tutti coloro che vogliono condividere con nuovi amici la passione per lo sci o per lo snowboard.",
    image: "/foto/lezione_collettiva.jpg",
  },
  {
    key: "fondo-telemark",
    title: "FONDO E TELEMARK",
    text: "Lezioni pensate per chi ama conoscere o approfondire lo sci di fondo, con tempi ridotti per dedicare attenzione ad ogni dettaglio.",
    image: "/foto/lezione_fondo.jpg",
  },
];

export default function ServicesGrid() {
  return (
    <section className="slice slice-blue">
      <div className="container-site grid md:grid-cols-2 gap-6">
        {CARDS.map((c, i) => {
          // blocco immagine condiviso
          const imageBlock = c.image ? (
            <div className="relative mb-4 w-full aspect-[2.06/1] overflow-hidden rounded-[18px]">
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 520px, 100vw"
                priority={i === 0}
              />

              {c.key === "webcam-live" && (
                <div className="absolute inset-0 bg-black/30 flex items-end justify-between px-3 py-2">
                  <span className="text-[11px] font-oswald text-white/90 uppercase tracking-[0.22em]">
                    Cogne – Webcam Live
                  </span>
                  <span className="rounded-full bg-red-600 px-2 py-[2px] text-[10px] font-semibold text-white uppercase tracking-[0.22em]">
                    Live
                  </span>
                </div>
              )}
            </div>
          ) : null;

          return (
            <article
              key={c.key}
              className="
                rounded-[26px]
                bg-black
                shadow-[0_18px_40px_rgba(0,0,0,.55)]
                px-7 py-7 md:px-9 md:py-8
                flex
                flex-col
              "
            >
              {/* IMMAGINE (eventualmente cliccabile) */}
              {c.image && (
                c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {imageBlock}
                  </a>
                ) : (
                  imageBlock
                )
              )}

              {/* TITOLO */}
              <header>
                <h3
                  className="
                    font-sofia
                    font-extrabold
                    text-white
                    text-[40px] md:text-[42px]
                    uppercase
                    tracking-[0.02em]
                  "
                >
                  <span className="inline-block border-b-2 border-white pb-0.5">
                    {c.title}
                  </span>
                </h3>
              </header>

              {/* TESTO */}
              <p
                className="
                  font-oswald
                  font-normal
                  mt-3
                  text-white
                  text-[17px] md:text-[18px]
                  leading-relaxed
                "
              >
                {c.text}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
