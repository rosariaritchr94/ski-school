#!/usr/bin/env bash
set -euo pipefail

# --- 1) Aggiorna package.json: porta 3001
node -e "const fs=require('fs');const p='./package.json';const j=JSON.parse(fs.readFileSync(p));j.scripts={dev:'next dev -p 3001',build:'next build',start:'next start -p 3001'};fs.writeFileSync(p,JSON.stringify(j,null,2));console.log('✅ package.json scripts aggiornati');"

# --- 2) Config Tailwind / PostCSS / TS / Next
cat > tailwind.config.js <<'EOT'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:"#E6F7FB",100:"#CBEFF6",200:"#9EE0EE",300:"#6ED0E5",
          400:"#43C0DC",500:"#26B4D6",600:"#1499C7",700:"#0E7DA5",
          800:"#0B637F",900:"#084B61"
        },
        ink: { DEFAULT: "#101010" }
      },
      boxShadow: { card: "0 10px 25px rgba(20,153,199,.10)" },
      borderRadius: { xl: "0.75rem", "2xl": "1rem" }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
EOT

cat > postcss.config.js <<'EOT'
module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
EOT

cat > tsconfig.json <<'EOT'
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOT

cat > next.config.js <<'EOT'
/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };
module.exports = nextConfig;
EOT

# --- 3) Cartelle
mkdir -p src/app src/components

# --- 4) globals.css
cat > src/app/globals.css <<'EOT'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ===== Base + font helper (next/font) ===== */
@layer base {
  :root { --bg: 16 16 16; --fg: 245 245 245; }

  html, body { height: 100%; }
  body { background: rgb(var(--bg)); color: rgb(var(--fg)); }

  .font-sofia { font-family: var(--font-sofia), system-ui, sans-serif; }
  .font-oswald { font-family: var(--font-oswald), system-ui, sans-serif; }

  h1,h2,h3,h4,.heading { @apply font-sofia; }
  p,li,small,.body { @apply font-oswald; }
}

/* ===== Navbar ===== */
.nav-link { @apply font-sofia text-sm uppercase tracking-[0.15em] text-white/80 hover:text-white; }

/* ===== Hero (banda nera + titoli) ===== */
.hero-band { @apply bg-ink; position: relative; z-index: 40; }
.hero-topline { @apply font-sofia uppercase text-sm md:text-base tracking-[0.35em] text-white/70; }
.hero-title { @apply font-sofia text-5xl md:text-7xl lg:text-8xl font-extrabold text-white; }

/* ===== Montagne: immagini INTERE, overlap + parallax leggero ===== */
.mountains-stack { position: relative; z-index: 20; overflow: visible; }
.bleed { position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; width: 100vw; max-width: 100vw; }
.mountain-img { display: block; width: 100%; height: auto; pointer-events: none; }
.parallax { will-change: transform; transform: translateY(calc(var(--base-y, 0px) - var(--py, 0px))); transition: transform 0.06s linear; }

/* Overlap (alzano chiaro/bianco come nel mock) */
.mountain-1 { --base-y: 0px; }
.mountain-2 { --base-y: -160px; }
.mountain-3 { --base-y: -260px; }

@media (max-width: 1024px) { .mountain-2 { --base-y: -120px; } .mountain-3 { --base-y: -200px; } }
@media (max-width: 640px) { .mountain-2 { --base-y: -90px; } .mountain-3 { --base-y: -150px; } }

/* ===== Logo sotto crinale ===== */
.logo-under-ridge { margin-top: -110px; }
@media (max-width: 1024px) { .logo-under-ridge { margin-top: -90px; } }
@media (max-width: 640px) { .logo-under-ridge { margin-top: -70px; } }

/* ===== Cards / badge stile mock ===== */
.feature-card { @apply rounded-xl bg-ink text-white border border-white/10 p-4 shadow-card; }
.feature-badge { @apply mt-3 inline-block rounded-md bg-white text-black text-[10px] font-bold px-3 py-1 uppercase; }

/* Galleria strip */
.strip::-webkit-scrollbar { display: none; }
.strip { -ms-overflow-style: none; scrollbar-width: none; }
EOT

# --- 5) layout.tsx
cat > src/app/layout.tsx <<'EOT'
import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sofia_Sans, Oswald } from "next/font/google";

const sofia = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-sofia",
  weight: ["400","600","700","800"],
  display: "swap",
});
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["300","400","500","600","700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scuola di Sci & Snowboard — Gran Paradiso",
  description: "La più forte scuola di sci in Valle d’Aosta",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${sofia.variable} ${oswald.variable}`}>
      <body className="min-h-screen bg-ink text-white antialiased">
        <header className="sticky top-0 z-[100] bg-ink/90 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/img/logo-navbar.png" alt="Logo Gran Paradiso" width={40} height={40} priority />
            </Link>
            <ul className="hidden gap-6 md:flex">
              <li><Link className="nav-link" href="/">Home</Link></li>
              <li><Link className="nav-link" href="/lezioni">Lezioni</Link></li>
              <li><Link className="nav-link" href="/maestri">Maestri</Link></li>
              <li><Link className="nav-link" href="/contatti">Contatti</Link></li>
            </ul>
            <Link href="/prenota" className="rounded-xl bg-brand-600 px-4 py-2 font-sofia text-xs md:text-sm font-bold uppercase tracking-wide text-black hover:opacity-90">Prenota</Link>
          </nav>
        </header>

        {children}

        <footer className="mt-24 border-t border-white/10 py-10 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Scuola di Sci & Snowboard — Gran Paradiso
        </footer>
      </body>
    </html>
  );
}
EOT

# --- 6) Componenti
cat > src/components/MountainsParallax.tsx <<'EOT'
"use client";
import { useEffect, useRef } from "react";

export default function MountainsParallax({
  speed1 = 0.12, speed2 = 0.20, speed3 = 0.28, preStart = 0.6,
}: { speed1?: number; speed2?: number; speed3?: number; preStart?: number; }) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const l1 = useRef<HTMLDivElement | null>(null);
  const l2 = useRef<HTMLDivElement | null>(null);
  const l3 = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);
  const sectionTopRef = useRef<number>(0);

  const computeSectionTop = () => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset || 0;
    sectionTopRef.current = rect.top + scrollTop;
  };

  useEffect(() => {
    const mqlMobile = window.matchMedia("(max-width: 768px)");
    const mqlReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const speeds = mqlReduce.matches
      ? { s1: 0, s2: 0, s3: 0 }
      : (mqlMobile.matches ? { s1: 0.04, s2: 0.06, s3: 0.08 } : { s1: speed1, s2: speed2, s3: speed3 });

    const tick = () => {
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const vh = window.innerHeight || 0;
      const triggerBottom = scrollTop + vh * preStart;
      const yRel = Math.max(0, triggerBottom - sectionTopRef.current);
      if (l1.current) l1.current.style.setProperty("--py", `${yRel * speeds.s1}px`);
      if (l2.current) l2.current.style.setProperty("--py", `${yRel * speeds.s2}px`);
      if (l3.current) l3.current.style.setProperty("--py", `${yRel * speeds.s3}px`);
      raf.current = null;
    };

    const onScroll = () => { if (raf.current != null) return; raf.current = requestAnimationFrame(tick); };
    const onResize = () => { computeSectionTop(); tick(); };

    computeSectionTop(); tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [speed1, speed2, speed3, preStart]);

  return (
    <section ref={wrapRef} className="mountains-stack" aria-label="Decorazione montagne">
      <div ref={l1} className="bleed mountain-1 parallax" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/mountains-dark.png" alt="" loading="eager" className="mountain-img" />
      </div>
      <div ref={l2} className="bleed mountain-2 parallax" aria-hidden>
        <img src="/img/mountains-light.png" alt="" loading="eager" className="mountain-img" />
      </div>
      <div ref={l3} className="bleed mountain-3 parallax" aria-hidden>
        <img src="/img/mountains-white.png" alt="" loading="eager" className="mountain-img" />
      </div>
    </section>
  );
}
EOT

cat > src/components/GalleryStrip.tsx <<'EOT'
"use client";
import { useRef } from "react";

type Img = { src: string; alt?: string };
export default function GalleryStrip({ images }: { images?: Img[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current; if (!el) return;
    el.scrollBy({ left: dir === "next" ? 320 : -320, behavior: "smooth" });
  };
  const items = images?.length ? images.map((i, k) => (
    <div key={k} className="min-w-[200px] h-[130px] rounded-md overflow-hidden bg-white text-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={i.src} alt={i.alt ?? "Foto"} className="w-full h-full object-cover" />
    </div>
  )) : Array.from({ length: 4 }).map((_, k) => (
    <div key={k} className="min-w-[200px] h-[130px] rounded-md bg-white grid place-items-center text-black font-bold">
      FOTO
    </div>
  ));
  return (
    <div className="relative">
      <button onClick={() => scroll("prev")} className="absolute -left-4 top-1/2 hidden -translate-y-1/2 md:flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">‹</button>
      <div ref={trackRef} className="strip flex gap-4 overflow-x-auto px-1 py-1">{items}</div>
      <button onClick={() => scroll("next")} className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">›</button>
    </div>
  );
}
EOT

# --- 7) page.tsx
cat > src/app/page.tsx <<'EOT'
import Image from "next/image";
import MountainsParallax from "@/components/MountainsParallax";
import GalleryStrip from "@/components/GalleryStrip";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="hero-band">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14 lg:py-16 text-center">
          <div className="hero-topline">SCUOLA DI SCI & SNOWBOARD</div>
          <h1 className="hero-title mt-2">GRAN PARADISO</h1>
        </div>
      </section>

      {/* MONTAGNE */}
      <MountainsParallax />

      {/* LOGO CENTRALE SOTTO CRINALE */}
      <section className="logo-under-ridge relative z-[30] mx-auto -mb-2 mt-0 flex items-center justify-center">
        <Image src="/img/logo-center.png" alt="Logo centrale Gran Paradiso" width={230} height={230} className="w-[160px] md:w-[200px] lg:w-[230px] h-auto" priority />
      </section>

      {/* INTRO (sinistra testo, destra blocco foto) */}
      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-brand-500 font-sofia text-xl tracking-widest uppercase leading-tight">
              The<br/>Strongest<br/>Ski School in<br/>Aosta Valley
            </h2>
            <p className="mt-4 text-white/85 font-oswald text-sm leading-6">
              Ridere, imparare, godersi l’inverno: il nostro team è sempre al vostro fianco.
              Prenota la lezione più adatta e scopri i nostri maestri certificati.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="/prenota" className="rounded-xl bg-brand-600 px-4 py-2 font-sofia text-xs md:text-sm font-bold uppercase tracking-wide text-black hover:opacity-90">Prenota lezione</a>
              <a href="/prezzi" className="rounded-xl border border-white/20 px-4 py-2 font-sofia text-xs md:text-sm uppercase tracking-wide hover:bg-white/10">Prezzi</a>
            </div>
          </div>
          <div className="aspect-square w-full rounded-xl bg-black grid place-items-center text-white/70">
            <div className="text-center">
              <div className="text-2xl font-extrabold">FOTO</div>
              <div className="text-xs mt-1">foto di maestro a sfondo bianco</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CARD NERE 2x2 */}
      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="feature-card">
            <div className="font-sofia font-bold">Lezioni individuali</div>
            <p className="mt-2 text-sm text-white/80">Sessioni personalizzate con maestro dedicato.</p>
            <span className="feature-badge">Inserire foto</span>
          </div>
          <div className="feature-card">
            <div className="font-sofia font-bold">Webcam live</div>
            <p className="mt-2 text-sm text-white/80">Condizioni in diretta dalle piste.</p>
            <span className="feature-badge">Inserire foto</span>
          </div>
          <div className="feature-card">
            <div className="font-sofia font-bold">Lezione di gruppo</div>
            <p className="mt-2 text-sm text-white/80">Impara con altri allievi del tuo livello.</p>
            <span className="feature-badge">Inserire foto</span>
          </div>
          <div className="feature-card">
            <div className="font-sofia font-bold">Fondo & Telemark</div>
            <p className="mt-2 text-sm text-white/80">Discipline con maestri specializzati.</p>
            <span className="feature-badge">Inserire foto</span>
          </div>
        </div>
      </section>

      {/* SICUREZZA + FOTO GRANDE + STRIP */}
      <section className="mt-14 bg-ink">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-10 md:grid-cols-2 items-start">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">Imparare<br/>in totale<br/>sicurezza</h3>
              <p className="mt-4 text-white/80 text-sm leading-6">
                Maestri qualificati FISI, programmi per bambini e adulti.
              </p>
            </div>
            <div className="rounded-xl bg-white grid place-items-center aspect-[4/3] text-black">
              <div className="text-3xl font-extrabold">FOTO</div>
              <div className="text-xs mt-1">(gruppo di bambini)</div>
            </div>
          </div>
          <div className="mt-8">
            <GalleryStrip />
          </div>
        </div>
      </section>

      {/* CONTATTI + MAPPA */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h4 className="font-sofia text-2xl font-bold">Contatti</h4>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="aspect-[16/9] w-full rounded-md bg-white grid place-items-center text-black">MAPPA</div>
          <div className="mt-4 text-sm text-white/80">
            Scuola di Sci & Snowboard Gran Paradiso — indirizzo — cap (AO) <br/>
            Tel. 000 000000 • Mail info@dominio.it
          </div>
        </div>
      </section>
    </main>
  );
}
EOT

echo "✅ Setup completato."
