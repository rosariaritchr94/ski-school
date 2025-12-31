// src/app/layout.tsx
import "@/app/globals.css";
import type { ReactNode } from "react";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sofia, oswald } from "@/app/fonts";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={`${sofia.variable} ${oswald.variable}`}>
      <head>
        {/* Loader globale di Iubenda: serve per i link Privacy/Cookie Policy */}
        <Script
          id="iubenda-js"
          src="https://cdn.iubenda.com/iubenda.js"
          strategy="lazyOnload"
        />
      </head>

      <body className="bg-[#101010] text-white font-sofia">
        {/* Navbar fissa in alto */}
        <Navbar />

        {/* Spazio sotto la navbar fissa (altezza navbar mobile/desktop) */}
        <main className="pt-[60px] md:pt-[72px]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
