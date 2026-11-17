"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Elementi fissi in tutte le pagine:
 *  - a sinistra "FOLLOW US:" in verticale con linea e icone social
 *  - a destra il bollino del telefono con la scritta che gira
 */

const SCRITTA = "SCUOLA DI SCI & SNOWBOARD · GRAN PARADISO · ";

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-[24px] w-[24px]" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconTelefono() {
  return (
    <svg viewBox="0 0 24 24" className="h-[20px] w-[20px] md:h-[27px] md:w-[27px]" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
    </svg>
  );
}

/* Fiocco di neve "vuoto" al centro: 6 bracci con rametti, attorno al telefono */
function Fiocco({ className = "" }: { className?: string }) {
  const braccio = (
    <g>
      <line x1="0" y1="-19" x2="0" y2="-36" />
      <polyline points="-6.5,-29.5 0,-24 6.5,-29.5" />
      <polyline points="-4.5,-36 0,-32 4.5,-36" />
    </g>
  );
  return (
    <svg
      viewBox="-40 -40 80 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <g key={r} transform={`rotate(${r})`}>
          {braccio}
        </g>
      ))}
    </svg>
  );
}

/**
 * true quando il centro dell'elemento è sopra una sezione azzurra
 * (quelle marcate con data-sfondo="azzurro"). Le creste in alto e in basso
 * della sezione sono trasparenti, quindi la zona azzurra parte un po' più giù
 * e finisce dove inizia la montagna nera della sezione successiva.
 */
function useSuAzzurro<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [suAzzurro, setSuAzzurro] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const y = r.top + r.height / 2;
      let su = false;
      document.querySelectorAll<HTMLElement>('[data-sfondo="azzurro"]').forEach((blu) => {
        const b = blu.getBoundingClientRect();
        // in alto c'è la cresta della montagna (trasparente)
        const inizio = b.top + Math.min(b.height * 0.08, 220);
        // se la sezione dopo sale sopra quella azzurra con la sua cresta,
        // l'azzurro finisce un po' dopo l'inizio di quella sezione
        const dopo = blu.nextElementSibling as HTMLElement | null;
        const d = dopo?.getBoundingClientRect();
        const fine = d && d.top < b.bottom ? d.top + Math.min(d.height * 0.1, 220) : b.bottom;
        if (y > inizio && y < fine) su = true;
      });
      setSuAzzurro(su);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return [ref, suAzzurro] as const;
}

export default function ElementiFissi({
  telefono,
  instagram,
}: {
  telefono: string;
  instagram?: string | null;
}) {
  const social = [
    { href: instagram, label: "Instagram", icon: <IconInstagram /> },
  ];
  // azzurro sul nero e sul bianco, bianco sulla sezione azzurra
  const [refSocial, socialSuAzzurro] = useSuAzzurro<HTMLElement>();
  const [refBollino, bollinoSuAzzurro] = useSuAzzurro<HTMLDivElement>();
  const colore = (suAzzurro: boolean) =>
    `transition-colors duration-300 ${suAzzurro ? "text-white" : "text-[#37C6E6]"}`;

  return (
    <>
      {/* FOLLOW US – da tablet in su */}
      <aside
        ref={refSocial}
        aria-label="Seguici"
        className={`hidden md:flex fixed left-5 lg:left-8 bottom-8 z-[9000] flex-col items-center gap-5 ${colore(socialSuAzzurro)}`}
      >
        <span className="font-oswald font-semibold uppercase tracking-[0.12em] text-[15px] [writing-mode:vertical-rl] rotate-180">
          Follow us:
        </span>
        <span aria-hidden="true" className="h-[120px] w-px bg-current" />
        {social.map((s) =>
          s.href ? (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="transition-opacity hover:opacity-70"
            >
              {s.icon}
            </a>
          ) : (
            <span key={s.label} aria-hidden="true">
              {s.icon}
            </span>
          ),
        )}
      </aside>

      {/* Bollino telefono, senza fondo: scritta che gira, fiocco e cornetta */}
      <div
        ref={refBollino}
        aria-hidden="true"
        className={`pointer-events-none fixed right-3 bottom-3 md:right-6 md:bottom-6 z-[9000] grid place-items-center h-[96px] w-[96px] md:h-[128px] md:w-[128px] ${colore(bollinoSuAzzurro)}`}
      >
        <svg
          viewBox="0 0 120 120"
          className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite] motion-reduce:animate-none"
        >
          <defs>
            <path id="cerchio-scritta" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
          </defs>
          <text
            className="font-sofia"
            fill="currentColor"
            fontSize="10.4"
            fontWeight="800"
            letterSpacing="1.05"
          >
            <textPath href="#cerchio-scritta" textLength="281" lengthAdjust="spacing">
              {SCRITTA}
            </textPath>
          </text>
        </svg>
        <Fiocco className="absolute h-[58px] w-[58px] md:h-[78px] md:w-[78px] animate-[spin_12s_linear_infinite_reverse] motion-reduce:animate-none" />
      </div>
      <a
        href={`tel:${telefono.replace(/[^+\d]/g, "")}`}
        aria-label={`Chiama la Scuola di Sci Gran Paradiso: ${telefono}`}
        className="group fixed right-3 bottom-3 md:right-6 md:bottom-6 z-[9001] grid place-items-center h-[96px] w-[96px] md:h-[128px] md:w-[128px] rounded-full"
      >
        <span className={`${colore(bollinoSuAzzurro)} transition-transform group-hover:scale-110`}>
          <IconTelefono />
        </span>
      </a>
    </>
  );
}
