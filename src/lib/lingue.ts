// src/lib/lingue.ts
// Lingue del sito e indirizzi delle pagine. L'italiano non ha prefisso (/lezioni),
// inglese e francese sì e con l'indirizzo tradotto (/en/lessons, /fr/cours).
// Dentro l'app le pagine stanno in app/(site)/[lang]/<chiave>: il middleware
// traduce l'indirizzo pubblico in quello interno.

export const LINGUE = ["it", "en", "fr"] as const;
export type Lingua = (typeof LINGUE)[number];

export const NOMI_LINGUE: Record<Lingua, string> = { it: "Italiano", en: "English", fr: "Français" };

export const SITO = "https://www.scuolascigranparadiso.com";

/** chiave interna (= cartella in app/(site)/[lang]) → indirizzo pubblico per lingua */
export const PAGINE = {
  home: { it: "", en: "", fr: "" },
  lezioni: { it: "lezioni", en: "lessons", fr: "cours" },
  maestri: { it: "maestri", en: "instructors", fr: "moniteurs" },
} as const;
export type Pagina = keyof typeof PAGINE;

export const isLingua = (x: unknown): x is Lingua => LINGUE.includes(x as Lingua);

/** Indirizzo pubblico di una pagina in una lingua, es. ("lezioni", "en") → "/en/lessons" */
export function percorso(pagina: Pagina, lang: Lingua, hash = ""): string {
  const slug = PAGINE[pagina][lang];
  const p = (lang === "it" ? "" : `/${lang}`) + (slug ? `/${slug}` : "");
  return (p || "/") + hash;
}

/** Da un indirizzo pubblico ricava lingua e pagina (null se non è una pagina nota). */
export function leggiPercorso(pathname: string): { lang: Lingua; pagina: Pagina | null } {
  const segs = pathname.split("/").filter(Boolean);
  let lang: Lingua = "it";
  if (segs[0] === "en" || segs[0] === "fr") lang = segs.shift() as Lingua;
  if (segs.length === 0) return { lang, pagina: "home" };
  if (segs.length > 1) return { lang, pagina: null };
  const pagina = (Object.keys(PAGINE) as Pagina[]).find((k) => PAGINE[k][lang] === segs[0]) ?? null;
  return { lang, pagina };
}

/**
 * Link scritti in Keystatic in italiano (es. "/lezioni#lezioni-collettive"):
 * li porta nella lingua della pagina. I link esterni restano uguali.
 */
export function linkLocale(href: string, lang: Lingua): string {
  if (!href.startsWith("/") || lang === "it") return href;
  const [path, ...resto] = href.split("#");
  const hash = resto.length ? `#${resto.join("#")}` : "";
  const { pagina } = leggiPercorso(path || "/");
  return pagina ? percorso(pagina, lang, hash) : href;
}

/** Testo tradotto in Keystatic: { it, en, fr } */
export type Tr = { it: string; en: string; fr: string };

/** Il tipo dei contenuti dopo aver scelto la lingua: ogni { it, en, fr } diventa una stringa. */
export type Localizzato<T> = T extends Tr
  ? string
  : T extends readonly (infer U)[]
    ? Localizzato<U>[]
    : T extends object
      ? { [K in keyof T]: Localizzato<T[K]> }
      : T;

function eTraduzione(v: unknown): v is Tr {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const k = Object.keys(v);
  return k.length === 3 && LINGUE.every((l) => typeof (v as Record<string, unknown>)[l] === "string");
}

/** Sceglie la lingua in tutti i testi; se la traduzione è vuota usa l'italiano. */
export function localizza<T>(v: T, lang: Lingua): Localizzato<T> {
  if (eTraduzione(v)) return (v[lang].trim() ? v[lang] : v.it) as Localizzato<T>;
  if (Array.isArray(v)) return v.map((x) => localizza(x, lang)) as Localizzato<T>;
  if (v && typeof v === "object") {
    return Object.fromEntries(
      Object.entries(v as Record<string, unknown>).map(([k, x]) => [k, localizza(x, lang)]),
    ) as Localizzato<T>;
  }
  return v as Localizzato<T>;
}

/** Per i metadati: indirizzo canonico e versioni nelle altre lingue */
export function alternative(pagina: Pagina, lang: Lingua) {
  return {
    canonical: percorso(pagina, lang),
    languages: {
      it: percorso(pagina, "it"),
      en: percorso(pagina, "en"),
      fr: percorso(pagina, "fr"),
      "x-default": percorso(pagina, "it"),
    },
  };
}
