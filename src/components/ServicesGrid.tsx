// src/components/ServicesGrid.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export type ServiceCard = {
  titolo: string;
  testo: string;
  foto: string | null;
  link: string;
  mostraPreventivo: boolean;
  scrittaSuFoto: string;
  etichettaLive: boolean;
};

type Props = { cards: readonly ServiceCard[]; email: string };

export default function ServicesGrid({ cards, email }: Props) {
  return (
    <section className="slice slice-blue">
      <div className="container-site grid md:grid-cols-2 gap-6">
        {cards.map((c, i) => {
          const key = `servizio-${i}`;
          const hasLink = Boolean(c.link);

          // Blocco immagine (niente <a> dentro, così il wrapper può essere Link)
          const imageBlock = c.foto ? (
            <div className="relative mb-4 w-full aspect-[2.06/1] overflow-hidden rounded-[18px]">
              <Image
                src={c.foto}
                alt={c.titolo ?? ""}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 520px, 100vw"
                priority={i === 0}
              />

              {(c.scrittaSuFoto || c.etichettaLive) && (
                <div className="absolute inset-0 bg-black/30 flex items-end justify-between px-3 py-2">
                  <span className="text-[11px] font-oswald text-white/90 uppercase tracking-[0.22em]">
                    {c.scrittaSuFoto}
                  </span>
                  {c.etichettaLive && (
                    <span className="rounded-full bg-red-600 px-2 py-[2px] text-[10px] font-semibold text-white uppercase tracking-[0.22em]">
                      Live
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : null;

          const article = (
            <article
              key={key}
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
              {c.titolo && (
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
                      {c.titolo}
                    </span>
                  </h3>
                </header>
              )}

              {/* TESTO */}
              {(c.testo || c.mostraPreventivo) && (
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
                  {c.testo}
                  {c.mostraPreventivo && (
                    <>
                      {c.testo && <br />}
                      <span className="block mt-1 text-center text-[rgb(var(--accent))] font-semibold">
                        <a
                          href={`mailto:${email}?subject=${encodeURIComponent(`Richiesta preventivo ${c.titolo}`)}`}
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
          if (hasLink) {
            const isExternal = /^https?:\/\//.test(c.link);

            return (
              <Link
                key={key}
                href={c.link}
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
