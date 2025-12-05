// src/components/Safety.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

const GALLERY = [
  { src: "/foto/8.jpg", alt: "Scuola sci Gran Paradiso - foto 8" },
  { src: "/foto/7.jpg", alt: "Scuola sci Gran Paradiso - foto 7" },
  { src: "/foto/6.jpg", alt: "Scuola sci Gran Paradiso - foto 6" },
  { src: "/foto/4.jpg", alt: "Scuola sci Gran Paradiso - foto 4" },
  { src: "/foto/5.jpg", alt: "Scuola sci Gran Paradiso - foto 5" },
  { src: "/foto/3.jpg", alt: "Scuola sci Gran Paradiso - foto 3" }, // 👈 AGGIUNTA
  { src: "/foto/2.jpg", alt: "Scuola sci Gran Paradiso - foto 2" },
  { src: "/foto/1.jpg", alt: "Scuola sci Gran Paradiso - foto 1" },
];

export default function Safety() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = GALLERY[currentIndex];

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
              Tutto ciò che ti serve per vivere una vacanza indimenticabile a Cogne,
              nel cuore della Valle d’Aosta.
            </p>
          </div>

          {/* FOTO GRANDE – SLIDER */}
          <div className="w-full">
            <div className="relative aspect-[4/3] w-full rounded-[12px] overflow-hidden bg-white shadow-2xl shadow-black/50">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
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
          {/* FRECCIA SINISTRA */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Foto precedente"
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
            aria-label="Foto successiva"
            className="h-8 w-8 grid place-items-center rounded-full border border-white/50 text-white/80 hover:bg-white hover:text-black"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
