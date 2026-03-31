// src/components/MaestriGrid.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Maestro = {
  id: string;
  nome: string;
  ruolo?: string;
  disciplina?: string;
  descrizione?: string;
  foto?: string;
};

/* Cartella dove stanno le foto */
const PHOTO_BASE_PATH = "/foto/foto maestri/";

/* ELENCO COMPLETO MAESTRI */
const MAESTRI: Maestro[] = [
  {
    id: "maestro-1",
    nome: "Alessandro Longo",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Descrizione del maestro 1.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-23 2.jpg`,
  },
  {
    id: "maestro-2",
    nome: "NIKITA BORETTAZ",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Descrizione del maestro 2.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-23 3.jpg`,
  },
  {
    id: "maestro-3",
    nome: "NICOLE PORLIOD",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Descrizione del maestro 3.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-23.jpg`,
  },
  {
    id: "maestro-4",
    nome: "NOEMI GLAREY",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Descrizione del maestro 4.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-24.jpg`,
  },
  {
    id: "maestro-5",
    nome: "LEONARDO MOSQUET",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Descrizione del maestro 5.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-25.jpg`,
  },
  {
    id: "maestro-6",
    nome: "Abram Didier",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Descrizione del maestro 6.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-26 2.jpg`,
  },
  {
    id: "maestro-7",
    nome: "PIETRO SEGOR",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Descrizione del maestro 7.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-26 3.jpg`,
  },
  {
    id: "maestro-8",
    nome: "CORALIE GRAPPEIN",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Descrizione del maestro 8.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-26.jpg`,
  },
  {
    id: "maestro-9",
    nome: "OUVRIER GIUSEPPE 'PETCH'",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Descrizione del maestro 9.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-31 2.jpg`,
  },
  {
    id: "maestro-10",
    nome: "DANIELA VIDI",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Descrizione del maestro 10.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-31.jpg`,
  },
  {
    id: "maestro-11",
    nome: "BRUNA CAVAGNET",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Descrizione del maestro 11.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-32 2.jpg`,
  },
  {
    id: "maestro-12",
    nome: "SIMONE CUAZ",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Descrizione del maestro 12.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-32 3.jpg`,
  },
  {
    id: "maestro-13",
    nome: "DANTE DESAYMONET",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Descrizione del maestro 13.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-32 4.jpg`,
  },
  {
    id: "maestro-14",
    nome: "Thomasset Sylvie",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Descrizione del maestro 14.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-32.jpg`,
  },
  {
    id: "maestro-15",
    nome: "ROGER REY",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Descrizione del maestro 15.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-33 3.jpg`,
  },
  {
    id: "maestro-16",
    nome: "PIETRO CAZZADORE",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Descrizione del maestro 16.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-33 4.jpg`,
  },
  {
    id: "maestro-17",
    nome: "MATILDA REGGIANINI",
    ruolo: "",
    disciplina: "",
    descrizione: "Descrizione del maestro 17.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-33 5.jpg`,
  },
  {
    id: "maestro-18",
    nome: "LUCA DESAYMONET",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Descrizione del maestro 18.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-33.jpg`,
  },
  {
    id: "maestro-19",
    nome: "MARCO DESAYMONET",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Descrizione del maestro 19.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-34 3.jpg`,
  },
  {
    id: "maestro-20",
    nome: "LUCA MONDARDINI",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Descrizione del maestro 20.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-34.jpg`,
  },
  {
    id: "maestro-21",
    nome: "FABIO FERROD",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Descrizione del maestro 21.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-35 4.jpg`,
  },
  {
    id: "maestro-22",
    nome: "CATERINA CIBIBIN",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Descrizione del maestro 22.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-35 5.jpg`,
  },
  {
    id: "maestro-23",
    nome: "ALESSANDRO ABRAM",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Descrizione del maestro 23.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-35.jpg`,
  },
  {
    id: "maestro-24",
    nome: "GALBIATI GIULIA",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Descrizione del maestro 24.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-36 2.jpg`,
  },
  {
    id: "maestro-25",
    nome: "PAOLO ROBIN PREILLAN:",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Descrizione del maestro 25.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-36 4.jpg`,
  },
  {
    id: "maestro-26",
    nome: "VITTORIO JEANTET",
    ruolo: "Maestro di SNOWBOARD",
    disciplina: "Snowboard",
    descrizione: "Descrizione del maestro 26.",
    foto: `${PHOTO_BASE_PATH}PHOTO-2025-12-28-18-03-37 2.jpg`,
  },
  {
    id: "maestro-27",
    nome: "Fausto Vassoney",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Fausto Vassoney – Sci nordico.",
  },
  {
    id: "maestro-28",
    nome: "Ilenia Noussan",
    ruolo: "Maestro di SCI NORDICO",
    disciplina: "Sci Nordico",
    descrizione: "Ilenia Noussan – Sci nordico.",
  },
  {
    id: "maestro-29",
    nome: "Luboz Niccolò",
    ruolo: "Maestro di SNOWBOARD",
    disciplina: "Snowboard",
    descrizione: "Luboz Niccolò – Snowboard.",
  },
  {
    id: "maestro-30",
    nome: "Alberto Filippini",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Alberto Filippini – Sci alpino.",
  },
  {
    id: "maestro-31",
    nome: "Nicole Testolin",
    ruolo: "Maestro di SCI ALPINO",
    disciplina: "Sci Alpino",
    descrizione: "Nicole Testolin – Sci alpino.",
  },
];

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

export default function MaestriGrid() {
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
    <section className="maestri-mtn">
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
          {MAESTRI.map((m) => {
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
                aria-label={`${m.nome} ${isFlipped ? "retro" : "fronte"}`}
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
                            xl:text-[14px]
                            2xl:text-[15px]
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