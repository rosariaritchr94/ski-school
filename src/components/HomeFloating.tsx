/**
 * Elementi fissi della Home:
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

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-[24px] w-[24px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H9.2v3h2.5V21" />
    </svg>
  );
}

function IconTelefono() {
  return (
    <svg viewBox="0 0 24 24" className="h-[38px] w-[38px] md:h-[50px] md:w-[50px]" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
    </svg>
  );
}

export default function HomeFloating({
  telefono,
  instagram,
  facebook,
}: {
  telefono: string;
  instagram?: string | null;
  facebook?: string | null;
}) {
  const social = [
    { href: instagram, label: "Instagram", icon: <IconInstagram /> },
    { href: facebook, label: "Facebook", icon: <IconFacebook /> },
  ];

  return (
    <>
      {/* FOLLOW US – da tablet in su. mix-blend-difference: bianco sui fondi scuri,
          nero sui fondi chiari, così si legge su tutte le sezioni */}
      <aside
        aria-label="Seguici"
        className="hidden md:flex fixed left-5 lg:left-8 bottom-8 z-[9000] flex-col items-center gap-5 text-white mix-blend-difference"
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

      {/* Bollino telefono con scritta che gira */}
      <a
        href={`tel:${telefono.replace(/[^+\d]/g, "")}`}
        aria-label={`Chiama la Scuola di Sci Gran Paradiso: ${telefono}`}
        className="group fixed right-3 bottom-3 md:right-6 md:bottom-6 z-[9000] grid place-items-center h-[96px] w-[96px] md:h-[128px] md:w-[128px] rounded-full bg-[#101010]/75 backdrop-blur-sm text-white shadow-[0_10px_30px_rgba(0,0,0,.3)]"
      >
        <svg
          viewBox="0 0 120 120"
          aria-hidden="true"
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
        <span className="relative text-[#37C6E6] transition-transform group-hover:scale-110">
          <IconTelefono />
        </span>
      </a>
    </>
  );
}
