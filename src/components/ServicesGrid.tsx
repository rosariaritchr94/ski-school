// src/components/ServicesGrid.tsx
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type ServiceCard = {
  titolo: string;
  testo: string;
  foto: string | null;
  link: string;
  pulsante: string;
  mostraPreventivo: boolean;
  scrittaSuFoto: string;
  etichettaLive: boolean;
};

type Props = { cards: readonly ServiceCard[]; email: string; children?: ReactNode };

/** Pannelli della Home: foto a tutta larghezza in alto, sotto titolo, testo e freccia. */
export default function ServicesGrid({ cards, email, children }: Props) {
  return (
    <section className="slice slice-blue" data-sfondo="azzurro">
      <div className="container-site">
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((c, i) => {
            const key = `servizio-${i}`;
            const hasLink = Boolean(c.link);
            const isExternal = /^https?:\/\//.test(c.link);

            const article = (
              <article
                className={`group h-full flex flex-col overflow-hidden rounded-[26px] bg-black shadow-[0_18px_40px_rgba(0,0,0,.55)] ${
                  hasLink ? "transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,.65)]" : ""
                }`}
              >
                {c.foto && (
                  <div className="relative w-full aspect-[2.1/1] overflow-hidden">
                    <Image
                      src={c.foto}
                      alt={c.titolo ?? ""}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(min-width: 768px) 600px, 100vw"
                      priority={i === 0}
                    />
                    {c.etichettaLive && (
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-[3px] font-oswald text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white motion-safe:animate-pulse" />
                        Live
                      </span>
                    )}
                    {c.scrittaSuFoto && (
                      <span className="absolute left-4 bottom-3 font-oswald text-[11px] font-medium uppercase tracking-[0.25em] text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,.6)]">
                        {c.scrittaSuFoto}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex flex-1 flex-col px-7 pt-5 pb-6 md:px-8 md:pt-6 md:pb-7">
                  {c.titolo && (
                    <h3 className="font-sofia font-extrabold uppercase tracking-[0.02em] leading-[1.05] text-white text-[34px] md:text-[38px]">
                      {c.titolo}
                    </h3>
                  )}
                  {c.testo && (
                    <p className="font-oswald mt-2 text-[16px] md:text-[17px] leading-[1.5] text-white/85">{c.testo}</p>
                  )}
                  {c.mostraPreventivo && (
                    <a
                      href={`mailto:${email}?subject=${encodeURIComponent(`Richiesta preventivo ${c.titolo}`)}`}
                      className="mt-2 font-oswald font-semibold text-[rgb(var(--accent))] underline-offset-4 hover:underline"
                    >
                      RICHIEDI IL TUO PREVENTIVO.
                    </a>
                  )}
                  {hasLink && (
                    <span className="mt-auto pt-3 inline-flex items-center gap-2 font-oswald font-semibold text-[14px] uppercase tracking-[0.22em] text-[#37C6E6]">
                      {c.pulsante || "Scopri"}
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  )}
                </div>
              </article>
            );

            if (!hasLink) return <div key={key}>{article}</div>;
            return (
              <Link
                key={key}
                href={c.link}
                className="block h-full"
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {article}
              </Link>
            );
          })}
        </div>
        {/* sotto i pannelli: barra meteo e bacheca eventi */}
        {children}
      </div>
    </section>
  );
}
