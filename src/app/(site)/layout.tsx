// src/app/(site)/layout.tsx
import "@/app/globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sofia, oswald } from "@/app/fonts";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Scuola di Sci Gran Paradiso",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="it"
      className={`${sofia.variable} ${oswald.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Da 1280px in su la pagina è il disegno del 14" (1536px) scalato in
            proporzione: su schermi più grandi o più piccoli resta identica.
            --vw: nel CSS le misure in vw si calcolano sui 1536px del disegno. */}
        <script
          id="scala-pagina"
          dangerouslySetInnerHTML={{
            __html: `(function(){var BASE=1536,MIN=1280,MAX=2.5,h=document.documentElement;function f(){var z=parseFloat(h.style.zoom)||1;var w=h.clientWidth;if(w>=MIN){var n=Math.min(w/BASE,MAX);if(Math.abs(n-z)>0.001)h.style.zoom=String(n);h.style.setProperty("--vw",(BASE/100)+"px");}else{h.style.zoom="";h.style.removeProperty("--vw");}}f();window.addEventListener("resize",f);document.addEventListener("DOMContentLoaded",f);window.addEventListener("load",f);})();`,
          }}
        />
      </head>
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
        <main className="page-wrap">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
