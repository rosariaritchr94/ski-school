// src/components/Safety.tsx
// Home: "Vivi l'avventura in totale sicurezza" + galleria foto.
// Sotto al testo due file di foto a tutta larghezza che scorrono da sole in direzioni
// opposte (si fermano passandoci sopra col mouse). Cliccando una foto si apre a tutto
// schermo e si sfogliano le altre (frecce, tastiera, Esc per chiudere).
// Stili .galleria-* in globals.css.
"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Lines from "./Lines";
import type { Lingua } from "@/lib/lingue";
import { TESTI } from "@/lib/testi";

export type SafetyContent = {
  titolo: string;
  testo: string;
  galleria: { foto: string; descrizione: string }[];
};

export default function Safety({
  titolo,
  testo,
  galleria,
  lang,
}: SafetyContent & { lang: Lingua }) {
  const t = TESTI[lang].galleria;
  const foto = galleria.map((g) => ({ src: g.foto, alt: g.descrizione }));
  const n = foto.length;
  const [aperta, setAperta] = useState<number | null>(null);

  const vai = useCallback(
    (passo: number) => setAperta((i) => (i === null ? i : (i + passo + n) % n)),
    [n],
  );

  useEffect(() => {
    if (aperta === null) return;
    const tasti = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAperta(null);
      if (e.key === "ArrowRight") vai(1);
      if (e.key === "ArrowLeft") vai(-1);
    };
    addEventListener("keydown", tasti);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", tasti);
      document.body.style.overflow = overflow;
    };
  }, [aperta, vai]);

  // seconda fila: parte da metà galleria, così le due file non mostrano le stesse foto insieme
  const meta = Math.floor(n / 2);
  const ordine2 = foto.map((_, i) => (i + meta) % n);
  const file = [foto.map((_, i) => i), ordine2];

  return (
    <section className="slice slice-black">
      <div className="container-site">
        <div className="max-w-[820px]">
          <h2 className="font-sofia mt-2 text-[38px] sm:text-[48px] lg:text-[80px] leading-[1.05] font-extrabold text-white uppercase">
            <Lines text={titolo} />
          </h2>
          <p
            className="font-oswald mt-4 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/80"
            style={{ textAlign: "justify" }}
          >
            {testo}
          </p>
        </div>
      </div>

      {n > 0 && (
        <div className="galleria-striscia mt-8 md:mt-11">
          {file.map((indici, f) => (
            <div
              key={f}
              className={`galleria-riga ${f === 1 ? "galleria-inversa" : ""}`}
            >
              {/* ogni fila è ripetuta due volte per scorrere senza interruzioni */}
              {[...indici, ...indici].map((i, k) => {
                const copia = k >= n;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setAperta(i)}
                    aria-hidden={copia || undefined}
                    tabIndex={copia || f === 1 ? -1 : undefined}
                    aria-label={foto[i].alt || t.apri}
                    className="galleria-foto"
                  >
                    <Image
                      src={foto[i].src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 285px, 195px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {aperta !== null &&
        foto[aperta] &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={foto[aperta].alt || t.apri}
            className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/90"
            onClick={() => setAperta(null)}
          >
            <div
              className="relative h-[80vh] w-[92vw] md:w-[86vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={foto[aperta].src}
                alt={foto[aperta].alt}
                fill
                sizes="92vw"
                className="object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() => setAperta(null)}
              aria-label={t.chiudi}
              className="galleria-tondo right-4 top-4 md:right-6 md:top-6"
            >
              ×
            </button>
            {n > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => (e.stopPropagation(), vai(-1))}
                  aria-label={t.precedente}
                  className="galleria-tondo left-3 top-1/2 -translate-y-1/2 md:left-6"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => (e.stopPropagation(), vai(1))}
                  aria-label={t.successiva}
                  className="galleria-tondo right-3 top-1/2 -translate-y-1/2 md:right-6"
                >
                  ›
                </button>
              </>
            )}
            <div className="absolute bottom-5 font-oswald text-[14px] tracking-[0.2em] text-white/80">
              {aperta + 1} / {n}
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
