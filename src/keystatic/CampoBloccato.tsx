// src/keystatic/CampoBloccato.tsx
// Parte grafica dei campi con il lucchetto (solo nel pannello Keystatic).
// Elementi HTML semplici con colori "currentColor", così vanno bene sia col tema chiaro sia scuro.
"use client";

import { useId, useState, type CSSProperties } from "react";

type Tr = { it: string; en: string; fr: string };

const LINGUE = [
  ["it", "IT · Italiano"],
  ["en", "EN · English"],
  ["fr", "FR · Français"],
] as const;

const AZZURRO = "#1389A8";
// stesso carattere del pannello Keystatic
const FONT = "var(--kui-typography-font-family-base, Inter, system-ui, -apple-system, sans-serif)";

function Lucchetto({ aperto }: { aperto: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d={aperto ? "M8 11V7a4 4 0 0 1 7.5-2" : "M8 11V7a4 4 0 0 1 8 0v4"} />
    </svg>
  );
}

const stileCasella = (bloccato: boolean): CSSProperties => ({
  width: "100%",
  boxSizing: "border-box",
  fontFamily: FONT,
  fontSize: 14,
  lineHeight: 1.5,
  color: "inherit",
  padding: "8px 10px",
  borderRadius: 6,
  border: `1px solid ${bloccato ? "rgba(128,128,128,.25)" : "rgba(128,128,128,.55)"}`,
  background: bloccato ? "rgba(128,128,128,.10)" : "transparent",
  opacity: bloccato ? 0.75 : 1,
  cursor: bloccato ? "not-allowed" : "text",
  resize: "vertical",
});

/** Testo in tre lingue: bloccato ogni volta che si apre la pagina */
export function CampoBloccatoTr({
  label,
  description,
  multiline,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  multiline?: boolean;
  value: Tr;
  onChange: (v: Tr) => void;
}) {
  const [bloccato, setBloccato] = useState(true);
  const id = useId();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: FONT }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>
        <button
          type="button"
          onClick={() => setBloccato((b) => !b)}
          aria-pressed={!bloccato}
          title={bloccato ? "Clicca per sbloccare e modificare" : "Clicca per bloccare di nuovo"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 10px",
            borderRadius: 999,
            fontFamily: FONT,
            cursor: "pointer",
            border: `1px solid ${bloccato ? "rgba(128,128,128,.45)" : AZZURRO}`,
            background: bloccato ? "transparent" : "rgba(19,137,168,.12)",
            color: bloccato ? "inherit" : AZZURRO,
          }}
        >
          <Lucchetto aperto={!bloccato} />
          <span style={{ fontSize: 12 }}>{bloccato ? "Bloccato – clicca per modificare" : "Sbloccato"}</span>
        </button>
      </div>
      {description && <span style={{ fontSize: 12, opacity: 0.7 }}>{description}</span>}

      {LINGUE.map(([l, nome]) => {
        const props = {
          id: `${id}-${l}`,
          value: value[l],
          readOnly: bloccato,
          onChange: (e: { target: { value: string } }) => onChange({ ...value, [l]: e.target.value }),
          style: stileCasella(bloccato),
        };
        return (
          <label key={l} htmlFor={`${id}-${l}`} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 500, opacity: 0.8 }}>{nome}</span>
            {multiline ? <textarea rows={Math.min(8, Math.max(2, Math.ceil(value[l].length / 90)))} {...props} /> : <input type="text" {...props} />}
          </label>
        );
      })}
    </div>
  );
}
