// src/components/MaestriGrid.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type Maestro = {
  id: string;
  nome: string;
  ruolo?: string;
  disciplina?: string;
  foto?: string;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}

/**
 * Rileva se il dispositivo supporta il hover reale (mouse/trackpad).
 * Su smartphone e tablet touch-only restituisce false → lo zoom su hover
 * viene disabilitato (non ha senso senza mouse).
 */
function useHoverCapable() {
  const [hoverCapable, setHoverCapable] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHoverCapable(mq.matches);
    const handler = (e: MediaQueryListEvent) => setHoverCapable(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return hoverCapable;
}

export default function MaestriGrid({
  maestri,
  fronte = "fronte",
  retro = "retro",
}: {
  maestri: Maestro[];
  fronte?: string;
  retro?: string;
}) {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  /*
   * hoverCapable = true  → desktop/laptop con mouse → zoom abilitato
   * hoverCapable = false → smartphone/tablet touch  → zoom disabilitato
   */
  const hoverCapable = useHoverCapable();

  const handleClick = (id: string) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="maestri-mtn" data-sfondo="azzurro">
      <div className="container-site">
        {/*
          Griglia responsive:
          • mobile (< 640px)  → 2 colonne
          • sm (640–767px)    → 3 colonne
          • md (768–1279px)   → 4 colonne
          • xl (1280–1535px)  → 5 colonne
          • 2xl (≥ 1536px)    → 6 colonne
        */}
        <div className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          gap-3 sm:gap-4 md:gap-5
          auto-rows-fr
        ">
          {maestri.map((m) => {
            const isFlipped = flippedId === m.id;

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleClick(m.id)}
                className="
                  group relative w-full
                  rounded-[14px] sm:rounded-[18px]
                  bg-black overflow-hidden
                  cursor-pointer
                  shadow-[0_8px_20px_rgba(0,0,0,.5)]
                  md:shadow-[0_14px_32px_rgba(0,0,0,.55)]
                  xl:shadow-[0_18px_40px_rgba(0,0,0,.55)]
                  focus:outline-none
                  active:scale-[0.98] transition-transform duration-150
                "
                aria-pressed={isFlipped}
                aria-label={`${m.nome} ${isFlipped ? retro : fronte}`}
              >
                {/* ============ FLIP CONTAINER ============ */}
                <div
                  className="relative w-full rounded-[14px] sm:rounded-[18px] overflow-hidden bg-black"
                  style={{ perspective: "900px" }}
                >
                  <div
                    className="
                      relative w-full aspect-[3/4]
                      [transform-style:preserve-3d]
                      transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]
                      [will-change:transform]
                    "
                    style={{
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    {/* ============ FRONT ============ */}
                    <div className="
                      absolute inset-0
                      [backface-visibility:hidden]
                      rounded-[14px] sm:rounded-[18px]
                      overflow-hidden
                    ">
                      <div className="relative w-full h-full bg-neutral-900">
                        {m.foto ? (
                          <Image
                            src={m.foto}
                            alt={m.nome}
                            fill
                            sizes="(max-width: 639px) 50vw, (max-width: 767px) 34vw, 26vw"
                            className={`
                              object-cover
                              transition-transform duration-300 ease-out
                              ${hoverCapable && !isFlipped ? "group-hover:scale-[1.10]" : ""}
                            `}
                          />
                        ) : (
                          /* Placeholder iniziali quando non c'è foto */
                          <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
                            <div className="h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-white/10 flex items-center justify-center">
                              <span className="font-oswald text-white/60 tracking-widest text-xs sm:text-sm md:text-base">
                                {initials(m.nome)}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Gradiente per leggibilità del testo */}
                        <div className="
                          pointer-events-none absolute inset-x-0 bottom-0
                          h-16 sm:h-20 md:h-24
                          bg-gradient-to-t from-black/80 to-transparent
                        " />

                        {/* Nome + Ruolo */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 text-left
                          px-2 pb-2
                          sm:px-3 sm:pb-3
                          md:px-3 md:pb-3
                        ">
                          <p className="
                            font-sofia text-white uppercase leading-tight
                            text-[10px] tracking-[0.08em]
                            xs:text-[11px]
                            sm:text-[12px] sm:tracking-[0.12em]
                            md:text-[14px] md:tracking-[0.15em]
                            lg:text-[15px] lg:tracking-[0.17em]
                            xl:text-[15px]
                          ">
                            {m.nome}
                          </p>
                          {m.ruolo && (
                            <p className="
                              font-oswald text-white/70 leading-tight
                              mt-0.5
                              text-[8px]
                              sm:text-[9px]
                              md:text-[10px]
                              lg:text-[11px]
                            ">
                              {m.ruolo}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* ============ /FRONT ============ */}

                    {/* ============ BACK ============ */}
                    <div className="
                      absolute inset-0
                      [backface-visibility:hidden]
                      [transform:rotateY(180deg)]
                      bg-black
                      rounded-[14px] sm:rounded-[18px]
                      overflow-hidden
                    ">
                      <div className="relative w-full h-full">
                        {m.foto && (
                          <Image
                            src={m.foto}
                            alt={`${m.nome} sfondo`}
                            fill
                            sizes="(max-width: 639px) 50vw, (max-width: 767px) 34vw, 26vw"
                            className="object-cover blur-[6px] brightness-[.40] scale-[1.08]"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/45" />

                        {/* Contenuto retro */}
                        <div className="
                          absolute inset-0 flex flex-col justify-center
                          px-2 py-3
                          sm:px-3 sm:py-4
                          md:px-4 md:py-5
                        ">
                          <p className="
                            font-sofia text-white uppercase leading-tight
                            text-[10px] tracking-[0.08em]
                            sm:text-[12px] sm:tracking-[0.12em]
                            md:text-[14px] md:tracking-[0.15em]
                            lg:text-[15px] lg:tracking-[0.17em]
                          ">
                            {m.nome}
                          </p>
                          {m.ruolo && (
                            <p className="
                              font-oswald text-white/70 leading-tight
                              mt-0.5 sm:mt-1
                              text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px]
                            ">
                              {m.ruolo}
                            </p>
                          )}
                          {m.disciplina && (
                            <p className="
                              font-oswald uppercase tracking-[0.15em] text-[rgb(var(--accent))]
                              mt-2 sm:mt-2.5 md:mt-3
                              text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px]
                            ">
                              {m.disciplina}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* ============ /BACK ============ */}

                  </div>
                </div>
                {/* ============ /FLIP CONTAINER ============ */}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}