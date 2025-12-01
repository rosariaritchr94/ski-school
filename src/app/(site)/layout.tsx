import type { ReactNode } from "react";
// se hai già font / globals importati, lasciali come sono

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === "true";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body>
        {isMaintenance ? (
          <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
            <div className="text-center px-4">
              <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                SITO IN AGGIORNAMENTO
              </h1>
              <p className="mb-2">
                Stiamo lavorando al nuovo sito della Scuola Sci Gran Paradiso.
              </p>
              <p className="text-sm opacity-70">
                Torna a trovarci tra poco ⛷️
              </p>
            </div>
          </main>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
