// src/components/MeteoBar.tsx
// Barra meteo della Home, sotto i pannelli. Se il servizio non risponde non compare.
import MeteoIcona from "./MeteoIcona";
import type { Meteo } from "@/lib/meteo";

const fmt = (n: number) => n.toLocaleString("it-IT");

export default function MeteoBar({ meteo }: { meteo: Meteo }) {
  const { ora, giorni, ventoKmh, pioggia24h } = meteo;

  return (
    <section
      aria-label="Meteo a Cogne"
      className="mt-6 rounded-[26px] bg-black shadow-[0_18px_40px_rgba(0,0,0,.55)] px-5 py-5 md:px-9 md:py-6 grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-5 md:gap-7"
    >
      {/* adesso */}
      <div className="flex items-center gap-4 pb-4 border-b border-white/15 md:pb-0 md:pr-7 md:border-b-0 md:border-r">
        <MeteoIcona tipo={ora.icona} className="w-[76px] h-[76px] md:w-[84px] md:h-[84px] shrink-0" />
        <div>
          <p className="font-oswald font-medium text-[13px] tracking-[0.25em] uppercase text-[#37C6E6]">
            Meteo Cogne · ora
          </p>
          <p className="font-sofia font-extrabold text-[50px] md:text-[54px] leading-none">{ora.temp}°</p>
          <p className="font-oswald text-[15px] tracking-[0.05em] text-white/75">{ora.descrizione}</p>
        </div>
      </div>

      {/* prossimi giorni */}
      <ul className="grid grid-cols-3 sm:grid-cols-6 gap-x-2 gap-y-4 text-center">
        {giorni.map((g) => (
          <li key={g.nome} className="flex flex-col items-center gap-1">
            <span className="font-oswald font-medium text-[13px] tracking-[0.2em] uppercase text-white/70">{g.nome}</span>
            <MeteoIcona tipo={g.icona} className="w-[52px] h-[52px]" />
            <span className="font-oswald font-semibold text-[16px]">
              {g.max}°<small className="ml-1 font-normal text-white/50">{g.min}°</small>
            </span>
          </li>
        ))}
      </ul>

      {/* dettagli + fonte */}
      <div className="md:col-span-2 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 border-t border-white/10 pt-3 font-oswald text-[14px] tracking-[0.12em] uppercase text-white/70">
        <span>
          Precipitazioni 24h <b className="font-semibold text-white">{fmt(pioggia24h)} mm</b>
        </span>
        <span>
          Vento <b className="font-semibold text-white">{ventoKmh} km/h</b>
        </span>
        <a
          href="https://www.yr.no/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] tracking-[0.15em] normal-case text-white/45 hover:text-white/80"
        >
          Dati meteo: MET Norway / Yr
        </a>
      </div>
    </section>
  );
}
