// src/keystatic/stato.ts
// Valori dell'interruttore acceso/spento (campo "Stagione" dei maestri).
// Nel file si salva true/false; nel pannello e nel sito si legge la scritta,
// così la colonna della tabella dei maestri mostra lo stato.
export const ACCESO = "🟢 Acceso";
export const SPENTO = "⚪ Spento";
export type Stato = typeof ACCESO | typeof SPENTO;
