// src/components/ServicesGrid.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

type Card = {
  key: string;
  title?: string;
  text?: string;
  image?: string;
  href?: string; // usato per link interni / esterni
};

const CARDS: Card[] = [
  // 1ª RIGA – SINISTRA → LEZIONI PRIVATE (link a lezioni individuali)
  {
    key: "lezioni-private",
    title: "lezioni private",
    text: "Sci alpino e snowboard - Lezioni personalizzate con maestro dedicato, per bambini e adulti, per imparare e migliorare la tecnica nello sci, nello snowboard e nello sci di fondo.",
    image: "/foto/foto_lezione.jpg",
    href: "/lezioni#lezioni-individuali",
  },
  // 1ª RIGA – DESTRA
  {
    key: "fondo-telemark",
    title: "FONDO E TELEMARK",
    text: "Lezioni pensate per chi ama conoscere o approfondire lo sci di fondo, con tempi ridotti per dedicare attenzione ad ogni dettaglio.",
    image: "/foto/lezione_fondo.jpg",
  },
  // 2ª RIGA – SINISTRA → LEZIONI COLLETTIVE (testo + PREVENTIVO via email)
  {
    key: "lezione-di-gruppo",
    title: "lezioni collettive",
    text: "Lezioni per gruppi organizzati (anticipatamente), dal 26/12 al 6/01 e dal 14/02 al 22/02, con tariffe dedicate a scuole, associazioni o gruppi che desiderano avvicinarsi allo sci, allo snowboard o allo sci di fondo.",
    image: "/foto/lezione_collettiva.jpg",
  },
  // 2ª RIGA – DESTRA → LEZIONI DI GRUPPO (solo titolo + immagine, link a sezione lezioni collettive)
  {
    key: "extra-lezioni-gruppo",
    title: "lezioni di gruppo",
    image: "/foto/f0621097-7ae8-4942-9e0c-72cc66b574a7.JPG",
    href: "/lezioni#lezioni-collettive",
  },
  // 3ª RIGA – SINISTRA → CORSI ANNUALI (solo titolo + immagine)
  {
    key: "extra-corsi-annuali",
    title: "corsi annuali",
    image: "/foto/5b653cf4-f9cc-4b35-b22d-d8a374847417.JPG",
  },
  // 3ª RIGA – DESTRA → WEBCAM LIVE (ultimo riquadro)
  {
    key: "webcam-live",
    title: "WEBCAM LIVE",
    text: "Scegli tra le 6 webcam a disposizione per dare un ultimo sguardo alle piste prima di partire per la tua giornata sulla neve.",
    image: "/foto/webcam_cogne.png",
    href: "https://www.skilife.ski/cogne/webcam/",
  },
];

export default function ServicesGrid() {
  return (
    <section className="slice slice-blue">
      <div className="container-site grid md:grid-cols-2 gap-6">
        {CARDS.map((c, i) => {
          const hasLink = Boolean(c.href);

          // Blocco immagine (niente <a> dentro, così il wrapper può essere Link)
          const imageBlock = c.image ? (
            <div className="relative mb-4 w-full aspect-[2.06/1] overflow-hidden rounded-[18px]">
              <Image
                src={c.image}
                alt={c.title ?? ""}
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

          const article = (
            <article
              key={c.key}
              className={`
                rounded-[26px]
                bg-black
                shadow-[0_18px_40px_rgba(0,0,0,.55)]
                px-7 py-7 md:px-9 md:py-8
                flex flex-col
                min-h-[260px]
                ${
                  hasLink
                    ? "cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,.65)]"
                    : ""
                }
              `}
            >
              {/* IMMAGINE */}
              {imageBlock}

              {/* TITOLO */}
              {c.title && (
                <header>
                  <h3
                    className="
                      font-sofia
                      font-extrabold
                      text-white
                      text-[40px] md:text-[42px]
                      uppercase
                      tracking-[0.02em]
                      leading-tight
                    "
                  >
                    <span className="inline-block border-b-2 border-white pb-0.5">
                      {c.title}
                    </span>
                  </h3>
                </header>
              )}

              {/* TESTO */}
              {c.text && (
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
                  {c.key === "lezione-di-gruppo" && (
                    <>
                      <br />
                      <span className="block mt-1 text-center text-[rgb(var(--accent))] font-semibold">
                        <a
                          href="mailto:info@scuolascigranparadiso.it?subject=Richiesta%20preventivo%20lezioni%20collettive"
                          className="underline-offset-4 hover:underline"
                        >
                          RICHIEDI IL TUO PREVENTIVO.
                        </a>
                      </span>
                    </>
                  )}
                </p>
              )}
            </article>
          );

          // Se ha href → rendo cliccabile tutto il riquadro
          if (hasLink && c.href) {
            const isExternal = c.key === "webcam-live";

            return (
              <Link
                key={c.key}
                href={c.href}
                className="block"
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {article}
              </Link>
            );
          }

          // Se non ha href → semplice riquadro statico
          return article;
        })}
      </div>
    </section>
  );
}
