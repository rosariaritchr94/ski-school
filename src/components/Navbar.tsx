// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/lezioni", label: "Lezioni" },
  { href: "/maestri", label: "Maestri" },
  { href: "/contatti", label: "Contatti" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
      <nav aria-label="Main" role="navigation">
        {/* Barra principale */}
        <div className="mx-auto w-full max-w-[1440px] px-2 md:px-6">
          <div className="h-[64px] md:h-[72px] flex items-center gap-3 md:gap-6">
            {/* HAMBURGER (solo mobile) */}
            <button
              type="button"
              aria-label="Apri menu"
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
            <Link href="/" className="shrink-0" aria-label="Home">
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
                Prenota
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
            <span className="text-xs uppercase tracking-[0.28em] text-white/80">Menu</span>
            <button
              type="button"
              aria-label="Chiudi menu"
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

          <div className="mt-auto p-4 border-t border-white/10">
            <a
              href="https://scuolascigranparadiso.beebeeboard.com/scuolesci_ecommerce/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-accent w-full text-[11px]"
            >
              Prenota ora
            </a>
          </div>
        </aside>
      </nav>
    </header>
  );
}
