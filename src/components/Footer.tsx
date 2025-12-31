// src/components/Footer.tsx
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black py-10">
      <div className="container-site">
        <div className="flex flex-col items-center gap-6">
          {/* pallini social */}
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
