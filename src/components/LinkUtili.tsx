// src/components/LinkUtili.tsx
// Tessere piccole a pillola, centrate sotto la bacheca eventi: logo nel pallino bianco, nome e freccia.
import Image from "next/image";

type LinkUtile = { titolo: string; logo: string | null; link: string };

export default function LinkUtili({ links }: { links: readonly LinkUtile[] }) {
  const visibili = links.filter((l) => l.titolo && l.link);
  if (!visibili.length) return null;

  return (
    <ul className="mt-6 flex flex-wrap justify-center gap-3 md:gap-4">
      {visibili.map((l, i) => (
        <li key={i}>
          <a
            href={l.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full bg-black py-1.5 pl-1.5 pr-2 shadow-[0_10px_24px_rgba(0,0,0,.45)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="relative h-10 w-10 flex-none overflow-hidden rounded-full bg-white">
              {l.logo && <Image src={l.logo} alt="" fill sizes="40px" className="object-contain p-1" />}
            </span>
            <span className="font-sofia font-extrabold uppercase leading-none tracking-[0.02em] text-white text-[15px]">
              {l.titolo}
            </span>
            {/* freccia disegnata in SVG: resta centrata nel cerchio */}
            <span
              aria-hidden="true"
              className="grid h-8 w-8 flex-none place-items-center rounded-full border-2 border-[#37C6E6] text-[#37C6E6] transition-colors duration-300 group-hover:bg-[#37C6E6] group-hover:text-black"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
