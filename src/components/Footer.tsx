// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-black py-10">
      <div className="container-site">
        <div className="flex flex-col items-center gap-6">
          {/* social dots */}
          <div className="flex items-center gap-2">
            {["•", "•", "•", "•"].map((d, i) => (
              <span
                key={i}
                className="h-8 w-8 grid place-items-center rounded-full border border-white/30 text-white/70"
              >
                {d}
              </span>
            ))}
          </div>

          {/* nav footer */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-[11px] uppercase tracking-[0.22em] text-white/70">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <a href="/lezioni" className="hover:text-white">
              Lezioni
            </a>
            <a href="/maestri" className="hover:text-white">
              Maestri
            </a>
            {/* Niente PREZZI, niente CONTATTI */}
          </nav>

          {/* loghi bassi */}
          <div className="flex items-center gap-10 opacity-90">
            <img src="/assets/logos/logo-1.png" alt="" className="h-12 w-auto" />
            <img src="/assets/logos/logo-2.png" alt="" className="h-12 w-auto" />
          </div>

          <p className="mt-2 text-[10px] text-white/50 text-center">
            © {new Date().getFullYear()} Scuola di Sci &amp; Snowboard Gran Paradiso — tutti i diritti riservati
          </p>
        </div>
      </div>
    </footer>
  );
}
