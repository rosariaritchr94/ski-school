// src/middleware.ts
// Indirizzi pubblici → pagine interne app/(site)/[lang]/…
//   /            → /it            /en          → /en           /fr         → /fr
//   /lezioni     → /it/lezioni    /en/lessons  → /en/lezioni   /fr/cours   → /fr/lezioni
// Gli indirizzi "interni" scritti a mano (/it/…, /en/lezioni) vengono reindirizzati a quelli pubblici.
import { NextResponse, type NextRequest } from "next/server";
import { PAGINE, percorso, type Lingua, type Pagina } from "@/lib/lingue";

const CHIAVI = Object.keys(PAGINE) as Pagina[];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segs = pathname.split("/").filter(Boolean);

  const vaiA = (dest: string, tipo: "rewrite" | "redirect") => {
    const url = req.nextUrl.clone();
    url.pathname = dest;
    return tipo === "rewrite" ? NextResponse.rewrite(url) : NextResponse.redirect(url, 308);
  };

  // /it/... → senza prefisso
  if (segs[0] === "it") return vaiA("/" + segs.slice(1).join("/"), "redirect");

  let lang: Lingua = "it";
  if (segs[0] === "en" || segs[0] === "fr") lang = segs.shift() as Lingua;

  if (segs.length === 0) return vaiA(`/${lang}`, "rewrite");
  if (segs.length === 1) {
    const pubblica = CHIAVI.find((k) => k !== "home" && PAGINE[k][lang] === segs[0]);
    if (pubblica) return vaiA(`/${lang}/${pubblica}`, "rewrite");
    // nome interno usato in un'altra lingua (es. /en/lezioni) → indirizzo giusto
    const interna = CHIAVI.find((k) => k !== "home" && k === segs[0]);
    if (interna) return vaiA(percorso(interna, lang), "redirect");
  }
  // il resto (pagine inesistenti) finisce sul 404
  return vaiA(`/${lang}/${segs.join("/")}`, "rewrite");
}

export const config = {
  // tutto tranne file statici, Keystatic e API
  matcher: ["/((?!_next|api|keystatic|.*\\..*).*)"],
};
