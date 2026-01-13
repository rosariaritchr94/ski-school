// src/app/layout.tsx
import "@/app/globals.css";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sofia, oswald } from "@/app/fonts";
import Script from "next/script";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="it"
      className={`${sofia.variable} ${oswald.variable}`}
      suppressHydrationWarning
    >
      <body
        className="bg-[#101010] text-white font-sofia"
        suppressHydrationWarning
      >
        {/* IUBENDA – Privacy Controls & Cookie Solution */}
        <Script
          id="iubenda-embed"
          strategy="beforeInteractive"
          src="https://embeds.iubenda.com/widgets/1524e6ba-1e10-4ff8-b085-102f744ee34c.js"
        />
        <Script
          id="iubenda-js"
          strategy="lazyOnload"
          src="https://cdn.iubenda.com/iubenda.js"
        />

        <Navbar />

        {/* ✅ spazio sotto la navbar fixed */}
        <main className="page-wrap">{children}</main>

        <Footer />
      </body>
    </html>
  );
}

