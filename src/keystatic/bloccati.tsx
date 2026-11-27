// src/keystatic/bloccati.tsx
// Campi di Keystatic con il lucchetto: i testi principali del sito si leggono ma non si
// modificano finché non si clicca il lucchetto. Ogni volta che si apre la pagina tornano
// bloccati (lo stato del lucchetto non viene salvato, il testo sì).
// Questo file lo legge anche il server: la parte grafica sta in CampoBloccato.tsx.
import type { BasicFormField, FormFieldStoredValue } from "@keystatic/core";
import { CampoBloccatoTr } from "./CampoBloccato";

type Tr = { it: string; en: string; fr: string };
type Opzioni = { description?: string; multiline?: boolean };

const testo = (v: unknown) => (typeof v === "string" ? v : "");

/** Testo in tre lingue con il lucchetto (come tr() ma bloccato all'apertura) */
export function trBloccato(label: string, opts: Opzioni = {}): BasicFormField<Tr> {
  const leggi = (v: FormFieldStoredValue): Tr => {
    const o = v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
    // un vecchio testo semplice diventa la versione italiana
    if (typeof v === "string") return { it: v, en: "", fr: "" };
    return { it: testo(o.it), en: testo(o.en), fr: testo(o.fr) };
  };
  return {
    kind: "form",
    label,
    Input({ value, onChange }) {
      return (
        <CampoBloccatoTr
          label={label}
          description={opts.description}
          multiline={opts.multiline}
          value={value}
          onChange={onChange}
        />
      );
    },
    defaultValue: () => ({ it: "", en: "", fr: "" }),
    parse: leggi,
    serialize: (value) => ({ value }),
    validate: (value) => value,
    reader: { parse: leggi },
  };
}
