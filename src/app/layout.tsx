// src/app/layout.tsx
import "@/app/globals.css";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sofia, oswald } from "@/app/fonts";

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === "true";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={`${sofia.variable} ${oswald.variable}`}>
      <body className="bg-black text-white font-sofia">
        {isMaintenance ? (
          // MODALITÀ MANUTENZIONE
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
          // SITO NORMALE
          <>
            <Navbar />
            {/* spazio sotto la navbar fissa */}
            <main className="pt-[72px] sm:pt-[80px]">
              {children}
            </main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
