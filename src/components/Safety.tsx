// src/components/Safety.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import Lines from "./Lines";
import type { Lingua } from "@/lib/lingue";
import { TESTI } from "@/lib/testi";

export type SafetyContent = {
  titolo: string;
  testo: string;
  galleria: { foto: string; descrizione: string }[];
};

export default function Safety({ titolo, testo, galleria, lang }: SafetyContent & { lang: Lingua }) {
  const t = TESTI[lang].galleria;
  const [currentIndex, setCurrentIndex] = useState(0);

  const GALLERY = galleria.map((g) => ({ src: g.foto, alt: g.descrizione }));
  const current = GALLERY[currentIndex] ?? GALLERY[0];

  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? GALLERY.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev === GALLERY.length - 1 ? 0 : prev + 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

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
              <Lines text={titolo} />
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
              {testo}
            </p>
          </div>

          {/* FOTO GRANDE – SLIDER */}
          <div className="w-full">
            <div className="relative aspect-[4/3] w-full rounded-[12px] overflow-hidden bg-white shadow-2xl shadow-black/50">
              {current && (
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 520px, 100vw"
                priority
              />
              )}
            </div>
          </div>
        </div>

        {/* thumbnails + frecce */}
        <div className="mt-8 md:mt-10 flex items-center justify-center gap-3">
          {/* FRECCIA SINISTRA */}
          <button
            type="button"
            onClick={goPrev}
            aria-label={t.precedente}
            className="h-8 w-8 grid place-items-center rounded-full border border-white/50 text-white/80 hover:bg-white hover:text-black"
          >
            ‹
          </button>

          {/* THUMBNAILS SCORREVOLI */}
          <div className="flex gap-3 overflow-x-auto py-1 px-1 max-w-full">
            {GALLERY.map((img, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => selectImage(index)}
                  className={`
                    relative h-[62px] w-[110px] rounded-[10px] overflow-hidden
                    shadow-md shadow-black/40 shrink-0
                    border
                    ${isActive ? "border-[rgb(var(--accent))]" : "border-white/40"}
                  `}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="110px"
                  />
                </button>
              );
            })}
          </div>

          {/* FRECCIA DESTRA */}
          <button
            type="button"
            onClick={goNext}
            aria-label={t.successiva}
            className="h-8 w-8 grid place-items-center rounded-full border border-white/50 text-white/80 hover:bg-white hover:text-black"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
