// src/app/layout.tsx
import "@/app/globals.css";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sofia, oswald } from "@/app/fonts";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={`${sofia.variable} ${oswald.variable}`}>
      <body className="bg-black text-white font-sofia">
        <Navbar />
        {/* spazio sotto la navbar fissa */}
        <main className="pt-[72px] sm:pt-[80px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
