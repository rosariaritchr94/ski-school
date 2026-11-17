// src/components/MeteoIcona.tsx
// Icone meteo a linea (ciano + bianco), animate in CSS (vedi .mi-* in globals.css).
import type { TipoIcona } from "@/lib/meteo";

const C = "#37C6E6";
const W = "#fff";
const NUVOLA = "M16 46 h34 a10 10 0 0 0 0-20 a14 14 0 0 0-27-3 a11 11 0 0 0-7 23z";
const LUNA = "M38 12 a20 20 0 1 0 14 34 a16 16 0 0 1 -14 -34z";

function Raggi({ r1, r2, sw, rami }: { r1: number; r2: number; sw: number; rami?: boolean }) {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 45})`}>
          <line y1={-r1} y2={-r2} stroke={C} strokeWidth={sw} strokeLinecap="round" />
          {rami && (
            <path
              d={`M-3 ${-(r2 - 2)} L0 ${-(r2 - 6)} L3 ${-(r2 - 2)}`}
              fill="none"
              stroke={C}
              strokeWidth={sw * 0.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </g>
      ))}
    </>
  );
}

function Fiocco({ x, y, s = 1, cls }: { x: number; y: number; s?: number; cls: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={cls}>
        <g transform={`scale(${s})`}>
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 60})`}>
              <line y2={-5} stroke={C} strokeWidth={1.4} strokeLinecap="round" />
              <path d="M-2 -3.6 L0 -2.2 L2 -3.6" fill="none" stroke={C} strokeWidth={1.1} strokeLinecap="round" />
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}

function Nuvola({ tr, col = W, cls = "mi-nuv", fill = "#000", sw = 2.4 }: { tr: string; col?: string; cls?: string; fill?: string; sw?: number }) {
  return <path className={cls} d={NUVOLA} transform={tr} fill={fill} stroke={col} strokeWidth={sw} strokeLinejoin="round" />;
}

export default function MeteoIcona({ tipo, className = "" }: { tipo: TipoIcona; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={`overflow-visible ${className}`} aria-hidden="true">
      {tipo === "sole" && (
        <g transform="translate(32 32)">
          <g className="mi-ruota">
            <Raggi r1={17} r2={26} sw={2.4} rami />
          </g>
          <circle r={11} fill="none" stroke={C} strokeWidth={2.6} className="mi-pulsa" />
        </g>
      )}

      {tipo === "soleNuvola" && (
        <>
          <g transform="translate(24 24) scale(.75)">
            <g className="mi-ruota">
              <Raggi r1={17} r2={25} sw={2.6} />
            </g>
            <circle r={11} fill="none" stroke={C} strokeWidth={3} />
          </g>
          <Nuvola tr="translate(4 8)" />
        </>
      )}

      {tipo === "nuvola" && (
        <>
          <Nuvola tr="translate(10 -4) scale(.7)" col={C} cls="mi-nuv2" fill="none" sw={3} />
          <Nuvola tr="translate(-2 6)" />
        </>
      )}

      {tipo === "neve" && (
        <>
          <Nuvola tr="translate(-2 -6)" fill="none" />
          <Fiocco x={20} y={48} cls="mi-cade" />
          <Fiocco x={32} y={50} cls="mi-cade mi-d1" />
          <Fiocco x={44} y={48} cls="mi-cade mi-d2" />
        </>
      )}

      {tipo === "pioggia" && (
        <>
          <Nuvola tr="translate(-2 -6)" fill="none" />
          {[20, 32, 44].map((x, i) => (
            <line
              key={x}
              className={`mi-pioggia mi-d${i}`}
              x1={x}
              y1={46}
              x2={x - 3}
              y2={54}
              stroke={C}
              strokeWidth={2.4}
              strokeLinecap="round"
            />
          ))}
        </>
      )}

      {tipo === "luna" && (
        <>
          <path className="mi-dondola" d={LUNA} fill="none" stroke={W} strokeWidth={2.6} strokeLinejoin="round" />
          <Fiocco x={48} y={16} s={0.7} cls="mi-stella" />
          <Fiocco x={54} y={30} s={0.5} cls="mi-stella mi-d1" />
          <Fiocco x={40} y={6} s={0.45} cls="mi-stella mi-d2" />
        </>
      )}

      {tipo === "lunaNuvola" && (
        <>
          <g transform="translate(8 -2) scale(.7)">
            <path className="mi-dondola" d={LUNA} fill="none" stroke={W} strokeWidth={3.4} strokeLinejoin="round" />
          </g>
          <Fiocco x={50} y={8} s={0.55} cls="mi-stella" />
          <Nuvola tr="translate(4 8)" col={C} />
        </>
      )}
    </svg>
  );
}
