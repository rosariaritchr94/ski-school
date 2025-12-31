// src/app/layout.tsx
import "@/app/globals.css";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sofia, oswald } from "@/app/fonts";
import Script from "next/script";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={`${sofia.variable} ${oswald.variable}`}>
      <body className="bg-[#101010] text-white font-sofia">
        {/* IUBENDA – Privacy Controls & Cookie Solution */}
        <Script
          id="iubenda-embed"
          strategy="beforeInteractive"
          src="https://embeds.iubenda.com/widgets/1524e6ba-1e10-4ff8-b085-102f744ee34c.js"
        />
        <Script
          id="iubenda-js"
          strategy="beforeInteractive"
          // è lo stesso codice che ti dà Iubenda per caricare iubenda.js
          dangerouslySetInnerHTML={{
            __html: `
              (function (w, d) {
                var loader = function () {
                  var s = d.createElement("script"),
                      tag = d.getElementsByTagName("script")[0];
                  s.src = "https://cdn.iubenda.com/iubenda.js";
                  tag.parentNode.insertBefore(s, tag);
                };
                if (w.addEventListener) {
                  w.addEventListener("load", loader, false);
                } else if (w.attachEvent) {
                  w.attachEvent("onload", loader);
                } else {
                  w.onload = loader;
                }
              })(window, document);
            `,
          }}
        />

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
