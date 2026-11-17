// src/app/(site)/[lang]/layout.tsx
import "@/app/globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ElementiFissi from "@/components/ElementiFissi";
import { reader } from "@/lib/content";
import { sofia, oswald, caveat } from "@/app/fonts";
import Script from "next/script";
import { notFound } from "next/navigation";
import { LINGUE, SITO, isLingua, alternative, type Lingua } from "@/lib/lingue";
import { TESTI } from "@/lib/testi";

// una versione del sito per lingua; altre "lingue" danno 404
export const dynamicParams = false;
export function generateStaticParams() {
  return LINGUE.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (isLingua(params.lang) ? params.lang : "it") as Lingua;
  const t = TESTI[lang].meta;
  return {
    metadataBase: new URL(SITO),
    title: { default: t.titolo, template: `%s – ${t.titolo}` },
    description: t.descrizione,
    alternates: alternative("home", lang),
    openGraph: { siteName: t.titolo, locale: { it: "it_IT", en: "en_GB", fr: "fr_FR" }[lang], type: "website" },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  if (!isLingua(params.lang)) notFound();
  const lang = params.lang;
  const contatti = (await reader.singletons.home.read())?.contatti;
  return (
    <html
      lang={lang}
      className={`${sofia.variable} ${oswald.variable} ${caveat.variable}`}
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

        <Navbar lang={lang} instagram={contatti?.instagram} />
        <main className="page-wrap">{children}</main>
        <Footer lang={lang} telefono={contatti?.telefono} instagram={contatti?.instagram} />
        {contatti && (
          <ElementiFissi
            lang={lang}
            telefono={contatti.telefono}
            instagram={contatti.instagram}
          />
        )}
      </body>
    </html>
  );
}
