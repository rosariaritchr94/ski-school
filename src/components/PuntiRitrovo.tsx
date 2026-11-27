// src/components/PuntiRitrovo.tsx
// Punti di ritrovo della pagina Lezioni: a sinistra le tessere (numero, icona, nome, disciplina,
// "Portami qui"), a destra la mappa scura con i punti numerati. Cliccando una tessera la mappa
// va su quel punto. Mappa: OpenStreetMap con Leaflet (gratuita, senza cookie).
// Su telefono la mappa va sotto le tessere. Stili .ritrovo-* in globals.css.
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Map as MappaLeaflet, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";

export type PuntoRitrovo = {
  nome: string;
  luogo: string;
  tipo: "fondo" | "alpino";
  nota: string;
  lat: number;
  lng: number;
};

type Testi = { fondo: string; alpino: string; portami: string; mappa: string };

const ICONE = {
  fondo: "/assets/logos/logo_fondo.png",
  alpino: "/assets/logos/logo_alpino.png",
} as const;

// un colore diverso per ogni punto, nell'ordine della lista (poi si ricomincia)
const COLORI = ["#37C6E6", "#3DDC97", "#FFC145", "#FF6B9A"];
const colore = (i: number) => COLORI[i % COLORI.length];

const indicazioni = (p: PuntoRitrovo) => `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export default function PuntiRitrovo({ punti, testi }: { punti: PuntoRitrovo[]; testi: Testi }) {
  const [scelto, setScelto] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const mappa = useRef<MappaLeaflet | null>(null);
  const segnaposti = useRef<Marker[]>([]);

  // la mappa si crea solo nel browser (Leaflet usa window)
  useEffect(() => {
    let annullato = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (annullato || !box.current || mappa.current) return;
      const m = L.map(box.current, { scrollWheelZoom: false, attributionControl: true });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(m);
      // segnaposto spostato di (dx, dy) pixel rispetto al punto vero
      const icona = (i: number, dx = 0, dy = 0) =>
        L.divIcon({
          className: "",
          html: `<div class="ritrovo-pin" style="background:${colore(i)}"><span>${i + 1}</span></div>`,
          iconSize: [36, 36],
          iconAnchor: [18 - dx, 36 - dy],
          popupAnchor: [dx, dy - 32],
        });
      segnaposti.current = punti.map((p, i) => {
        return L.marker([p.lat, p.lng], { icon: icona(i), title: p.nome })
          .addTo(m)
          .bindPopup(
            `<b>${i + 1} · ${escape(p.nome)}</b>${escape(p.tipo === "fondo" ? testi.fondo : testi.alpino)}${
              p.luogo ? ` · ${escape(p.luogo)}` : ""
            }<br><a href="${indicazioni(p)}" target="_blank" rel="noopener noreferrer">${escape(testi.portami)} →</a>`,
            { className: "ritrovo-popup" },
          )
          .on("click", () => setScelto(i));
      });
      // punti molto vicini (es. Casette e Baby): se a questo zoom i segnaposti si sovrappongono,
      // li allargo quanto basta; avvicinando la mappa tornano al loro posto esatto
      const DISTANZA = 40;
      const separa = () => {
        const pos = punti.map((p) => m.latLngToLayerPoint([p.lat, p.lng]));
        const sp = punti.map(() => ({ x: 0, y: 0 }));
        for (let a = 0; a < pos.length; a++)
          for (let b = a + 1; b < pos.length; b++) {
            let dx = pos[b].x - pos[a].x;
            let dy = pos[b].y - pos[a].y;
            const d = Math.hypot(dx, dy);
            if (d >= DISTANZA) continue;
            if (d < 0.5) [dx, dy] = [1, 0];
            const n = Math.hypot(dx, dy);
            const spinta = (DISTANZA - d) / 2;
            sp[a].x -= (dx / n) * spinta;
            sp[a].y -= (dy / n) * spinta;
            sp[b].x += (dx / n) * spinta;
            sp[b].y += (dy / n) * spinta;
          }
        segnaposti.current.forEach((mk, i) => mk.setIcon(icona(i, sp[i].x, sp[i].y)));
      };
      m.on("zoomend", separa);
      m.fitBounds(
        punti.map((p) => [p.lat, p.lng] as [number, number]),
        { padding: [40, 40] },
      );
      separa();
      mappa.current = m;
      const osserva = new ResizeObserver(() => m.invalidateSize());
      osserva.observe(box.current);
      m.once("unload", () => osserva.disconnect());
    })();
    return () => {
      annullato = true;
      mappa.current?.remove();
      mappa.current = null;
    };
  }, [punti, testi]);

  const vaiA = (i: number) => {
    setScelto(i);
    const p = punti[i];
    mappa.current?.flyTo([p.lat, p.lng], 16, { duration: 0.8 });
    segnaposti.current[i]?.openPopup();
  };

  if (!punti.length) return null;

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 md:items-stretch">
      <ul className="flex flex-col gap-3">
        {punti.map((p, i) => {
          const c = colore(i);
          const icona = ICONE[p.tipo];
          const attivo = i === scelto;
          return (
            <li key={i}>
              <div
                role="button"
                tabIndex={0}
                aria-pressed={attivo}
                onClick={() => vaiA(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    vaiA(i);
                  }
                }}
                className={`relative flex cursor-pointer flex-wrap items-center gap-4 rounded-[18px] border-l-[6px] px-4 py-3.5 transition duration-200 sm:flex-nowrap ${
                  attivo ? "bg-[#262626]" : "bg-[#1a1a1a] hover:bg-[#222]"
                }`}
                style={{ borderColor: c, boxShadow: attivo ? `0 0 0 1.5px ${c}` : undefined }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-2.5 -top-2.5 grid h-7 w-7 place-items-center rounded-full border-2 border-[#101010] font-sofia text-[13px] font-black text-[#001018]"
                  style={{ background: c }}
                >
                  {i + 1}
                </span>
                <span className="grid h-[52px] w-[52px] flex-none place-items-center rounded-full bg-[#101010]">
                  <Image src={icona} alt="" width={34} height={34} className="h-[34px] w-[34px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-sofia text-[22px] font-extrabold uppercase leading-tight text-white">
                    {p.nome}
                  </span>
                  <span
                    className="mt-0.5 block font-oswald text-[13px] font-medium uppercase tracking-[0.1em]"
                    style={{ color: c }}
                  >
                    {p.tipo === "fondo" ? testi.fondo : testi.alpino}
                    {p.luogo && ` · ${p.luogo}`}
                  </span>
                  {p.nota && <span className="mt-1 block font-oswald text-[14px] leading-snug text-white/70">{p.nota}</span>}
                </span>
                <a
                  href={indicazioni(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex flex-none basis-full items-center justify-center gap-2 whitespace-nowrap rounded-full sm:basis-auto border-[1.5px] border-[#37C6E6] px-3.5 py-2 font-oswald text-[12px] font-semibold uppercase tracking-[0.14em] text-[#37C6E6] transition-colors hover:bg-[#37C6E6] hover:text-[#001018]"
                >
                  {testi.portami} →
                </a>
              </div>
            </li>
          );
        })}
      </ul>

      <div
        ref={box}
        aria-label={testi.mappa}
        className="ritrovo-mappa relative z-0 h-[380px] w-full overflow-hidden rounded-[12px] bg-[#1a1a1a] shadow-xl shadow-black/40 md:h-auto"
      />
    </div>
  );
}
