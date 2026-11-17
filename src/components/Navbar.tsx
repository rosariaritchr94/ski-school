// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LINGUE, NOMI_LINGUE, leggiPercorso, percorso, type Lingua } from "@/lib/lingue";
import { TESTI } from "@/lib/testi";

/*
 * Mappamondo che gira: i meridiani sono mezze ellissi dal polo nord al polo sud.
 * Un meridiano alla longitudine φ (visibile tra -90° e 90°) si sposta all'equatore di 9·sin φ:
 * lo disegno con una curva di Bézier e ne animo la forma, quattro meridiani sfasati di 45°.
 */
const GIRO_S = 8; // secondi per mezzo giro di ogni meridiano
const MERIDIANO = Array.from({ length: 13 }, (_, i) => {
  const x = 9 * Math.sin(((-90 + i * 15) * Math.PI) / 180);
  const c = (12 + (4 / 3) * x).toFixed(2);
  return `M12 3C${c} 3 ${c} 21 12 21`;
}).join(";");

function Mappamondo({ className = "" }: { className?: string }) {
  const [fermo, setFermo] = useState(false);
  useEffect(() => {
    setFermo(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M4.6 7.5h14.8M4.6 16.5h14.8" strokeWidth="1.1" opacity=".7" />
      {[0, 1, 2, 3].map((k) =>
        fermo ? (
          <path key={k} d={MERIDIANO.split(";")[[3, 6, 9, 0][k]]} />
        ) : (
          <path key={k} d={MERIDIANO.split(";")[0]}>
            <animate
              attributeName="d"
              values={MERIDIANO}
              dur={`${GIRO_S}s`}
              begin={`${(-k * GIRO_S) / 4}s`}
              repeatCount="indefinite"
            />
          </path>
        ),
      )}
    </svg>
  );
}

/**
 * Pallino con il mappamondo accanto a Prenota: al clic apre un piccolo menu
 * Italiano / English / Français che porta alla stessa pagina nell'altra lingua.
 */
function SceltaLingua({ lang }: { lang: Lingua }) {
  const [aperto, setAperto] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? "/";
  const pagina = leggiPercorso(pathname).pagina ?? "home";
  const t = TESTI[lang].menu;

  // chiudi cliccando fuori o con ESC
  useEffect(() => {
    if (!aperto) return;
    const fuori = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setAperto(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAperto(false);
    document.addEventListener("mousedown", fuori);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", fuori);
      document.removeEventListener("keydown", esc);
    };
  }, [aperto]);

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-label={`${t.lingua}: ${NOMI_LINGUE[lang]}`}
        aria-haspopup="true"
        aria-expanded={aperto}
        onClick={() => setAperto((v) => !v)}
        className={`grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-full border text-[#37C6E6] transition-colors ${
          aperto ? "border-[#37C6E6] bg-[#37C6E6]/10" : "border-[#37C6E6]/50 hover:border-[#37C6E6] hover:bg-[#37C6E6]/10"
        }`}
      >
        <Mappamondo className="h-[22px] w-[22px] md:h-6 md:w-6" />
      </button>

      <ul
        aria-label={t.lingua}
        className={`absolute right-0 top-[calc(100%+10px)] z-[10001] min-w-[170px] overflow-hidden rounded-[14px] border border-white/10 bg-[#101010] py-1.5 shadow-[0_18px_40px_rgba(0,0,0,.55)] transition duration-150 origin-top-right ${
          aperto ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
        }`}
      >
        {LINGUE.map((l) => (
          <li key={l}>
            <Link
              href={percorso(pagina, l)}
              hrefLang={l}
              lang={l}
              aria-current={l === lang ? "true" : undefined}
              tabIndex={aperto ? 0 : -1}
              onClick={() => setAperto(false)}
              className={`flex items-center gap-3 px-4 py-2.5 font-oswald text-[15px] tracking-[0.06em] transition-colors hover:bg-white/[0.06] ${
                l === lang ? "text-[#37C6E6]" : "text-white/85 hover:text-white"
              }`}
            >
              <span className="w-6 text-[12px] font-semibold uppercase tracking-[0.14em] opacity-60">{l}</span>
              {NOMI_LINGUE[l]}
              {l === lang && (
                <svg viewBox="0 0 24 24" className="ml-auto h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar({ lang, instagram }: { lang: Lingua; instagram?: string | null }) {
  const [open, setOpen] = useState(false);
  const t = TESTI[lang].menu;
  const navLinks = [
    { href: percorso("home", lang), label: t.home },
    { href: percorso("lezioni", lang), label: t.lezioni },
    { href: percorso("maestri", lang), label: t.maestri },
    { href: percorso("home", lang, "#contatti"), label: t.contatti },
  ];

  // Chiudi con ESC e blocca scroll in mobile quando il drawer è aperto
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-[9999] bg-[#101010]">
      <nav aria-label={t.principale}>
        {/* Barra principale */}
        <div className="mx-auto w-full max-w-[1440px] px-2 md:px-6">
          <div className="h-[64px] md:h-[72px] flex items-center gap-3 md:gap-6">
            {/* HAMBURGER (solo mobile) */}
            <button
              type="button"
              aria-label={t.apri}
              aria-controls="mobile-drawer"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex sm:hidden items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* LOGO */}
            <Link href={percorso("home", lang)} className="shrink-0" aria-label={t.home}>
              <img
                src="/assets/logos/logo-navbar.png"
                alt="Logo Gran Paradiso"
                className="block w-[60px] h-[60px] md:w-[72px] md:h-[72px]"
                draggable="false"
              />
            </Link>

            {/* LINEA lunga (solo da sm in su) */}
            <div className="hidden sm:flex h-[2px] bg-white/70 flex-1" />

            {/* MENU destra */}
            <div className="ml-auto flex items-center gap-4 md:gap-5">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    hidden sm:inline-block
                    text-[15px] md:text-[16px]
                    uppercase tracking-[.10em] md:tracking-[.12em]
                    text-white/90
                    hover:text-[rgb(var(--mtn-dark))]
                    transition
                  "
                >
                  {item.label}
                </Link>
              ))}

              {/* LINGUA: pallino con mappamondo */}
              <SceltaLingua lang={lang} />

              {/* PRENOTA */}
              <a
                href="https://scuolascigranparadiso.beebeeboard.com/scuolesci_ecommerce/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center
                  rounded-lg
                  bg-[rgb(var(--accent))]
                  px-5 md:px-6
                  py-2.5 md:py-3
                  text-[15px] md:text-[16px]
                  font-semibold uppercase tracking-[.12em] md:tracking-[.14em]
                  text-[#001018]
                  transition
                  shadow-[0_0_0_1px_rgba(255,255,255,0.18)]
                  hover:bg-[rgb(var(--mtn-dark))]
                  hover:text-white
                "
              >
                {t.prenota}
              </a>
            </div>
          </div>
        </div>

        {/* sottolineatura (stacco) */}
        <div className="h-px bg-white/10" />

        {/* OVERLAY (solo mobile) */}
        <button
          aria-hidden
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-[9998] bg-black/60 transition-opacity duration-200 sm:hidden
            ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        />

        {/* DRAWER SINISTRA (solo mobile) */}
        <aside
          id="mobile-drawer"
          className={`fixed top-0 left-0 h-full w-[84%] max-w-[320px] z-[10000] sm:hidden
                      bg-[#101010] text-white shadow-2xl shadow-black/50
                      transition-transform duration-200
                      ${open ? "translate-x-0" : "-translate-x-full"}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="h-[64px] flex items-center justify-between px-4 border-b border-white/10">
            <span className="text-xs uppercase tracking-[0.28em] text-white/80">{t.menu}</span>
            <button
              type="button"
              aria-label={t.chiudi}
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav className="py-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-[12px] uppercase tracking-[0.22em] text-white/90 hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Instagram */}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 border-t border-white/10 text-[12px] uppercase tracking-[0.22em] text-white/90 hover:bg-white/10"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#37C6E6]/60 text-[#37C6E6]">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </span>
              {t.instagram}
            </a>
          )}

          <div className="mt-auto p-4 border-t border-white/10">
            <a
              href="https://scuolascigranparadiso.beebeeboard.com/scuolesci_ecommerce/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-accent w-full text-[11px]"
            >
              {t.prenotaOra}
            </a>
          </div>
        </aside>
      </nav>
    </header>
  );
}
