// src/components/Footer.tsx
import Image from "next/image";

const cerchio =
  "h-10 w-10 grid place-items-center rounded-full border border-white/30 text-white/80 transition-colors hover:border-[#37C6E6] hover:text-[#37C6E6]";

export default function Footer({ telefono, instagram }: { telefono?: string; instagram?: string | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black py-10">
      <div className="container-site">
        <div className="flex flex-col items-center gap-6">
          {/* Instagram e telefono */}
          <div className="flex items-center gap-3">
            {instagram ? (
              <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={cerchio}>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            ) : (
              <span aria-hidden="true" className={cerchio}>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </span>
            )}
            {telefono && (
              <a href={`tel:${telefono.replace(/[^+\d]/g, "")}`} aria-label={`Telefono ${telefono}`} className={cerchio}>
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                  <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
                </svg>
              </a>
            )}
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
          </nav>

          {/* LINK LEGALI IUBENDA */}
          <div className="flex flex-wrap justify-center gap-4 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/60">
            <a
              href="https://www.iubenda.com/privacy-policy/96490447"
              className="iubenda-black iubenda-noiframe iubenda-embed hover:underline"
              title="Privacy Policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>

            <a
              href="https://www.iubenda.com/privacy-policy/96490447/cookie-policy"
              className="iubenda-black iubenda-noiframe iubenda-embed hover:underline"
              title="Cookie Policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookie Policy
            </a>

            {/* riapre il pannello iubenda: sostituisce il pulsante fluttuante (nascosto in globals.css) */}
            <a href="#" className="iubenda-cs-preferences-link hover:underline" title="Preferenze cookie">
              Preferenze cookie
            </a>
          </div>

          {/* LOGHI IN FONDO */}
          <div className="flex items-center gap-10 opacity-90">
            <Image
              src="/assets/logos/LOGO_scuolasci1.png"
              alt="Associazione Valdostana Maestri di Sci"
              width={80}
              height={80}
              className="h-16 w-auto"
            />
            <Image
              src="/assets/logos/LOGO_scuolasci2.png"
              alt="Associazione Valdostana Maestri di Sci - Gran Paradiso"
              width={80}
              height={80}
              className="h-16 w-auto"
            />
          </div>

          <p className="mt-2 text-[10px] text-white/50 text-center">
            © {year} Scuola di Sci &amp; Snowboard Gran Paradiso — tutti i diritti
            riservati
          </p>
        </div>
      </div>
    </footer>
  );
}
