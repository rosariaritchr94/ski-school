// src/keystatic/Interruttore.tsx
// Interruttore acceso/spento per il pannello Keystatic (parte grafica).
"use client";

const FONT = "var(--kui-typography-font-family-base, Inter, system-ui, -apple-system, sans-serif)";
const VERDE = "#1a9e5c";

export function Interruttore({
  label,
  acceso,
  testoAcceso,
  testoSpento,
  onChange,
}: {
  label: string;
  acceso: boolean;
  testoAcceso: string;
  testoSpento: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: FONT }}>
      <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={acceso}
        onClick={() => onChange(!acceso)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          alignSelf: "flex-start",
          padding: 0,
          border: 0,
          background: "none",
          color: "inherit",
          fontFamily: FONT,
          cursor: "pointer",
        }}
      >
        {/* binario con il pallino che scorre */}
        <span
          aria-hidden="true"
          style={{
            position: "relative",
            width: 46,
            height: 26,
            borderRadius: 999,
            background: acceso ? VERDE : "rgba(128,128,128,.45)",
            transition: "background .2s",
            flex: "none",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 3,
              left: acceso ? 23 : 3,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,.3)",
              transition: "left .2s",
            }}
          />
        </span>
        <span style={{ fontSize: 14, fontWeight: 600, color: acceso ? VERDE : "inherit", opacity: acceso ? 1 : 0.7 }}>
          {acceso ? testoAcceso : testoSpento}
        </span>
      </button>
    </div>
  );
}
