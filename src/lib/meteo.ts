// src/lib/meteo.ts
// Previsioni per Cogne da MET Norway (Yr): gratuite anche per uso commerciale,
// con attribuzione (CC BY 4.0). Le chiede il server, al massimo una volta l'ora.

export type TipoIcona = "sole" | "soleNuvola" | "nuvola" | "neve" | "pioggia" | "luna" | "lunaNuvola";

export type Descrizione =
  | "temporale" | "nevischio" | "neveForte" | "neveDebole" | "rovesciNeve" | "neve" | "pioggiaForte"
  | "pioggiaDebole" | "rovesci" | "pioggia" | "sereno" | "pocoNuvoloso" | "variabile" | "nebbia" | "nuvoloso";

// I testi (descrizione, nome del giorno) li sceglie MeteoBar nella lingua della pagina.
export type Meteo = {
  ora: { temp: number; icona: TipoIcona; descrizione: Descrizione | null };
  giorni: { data: string; oggi: boolean; icona: TipoIcona; max: number; min: number }[];
  ventoKmh: number;
  pioggia24h: number;
};

const LAT = 45.608;
const LON = 7.355;
const QUOTA = 1534;
const FUSO = "Europe/Rome";

type Punto = {
  time: string;
  data: {
    instant: { details: { air_temperature?: number; wind_speed?: number } };
    next_1_hours?: { summary: { symbol_code: string }; details?: { precipitation_amount?: number } };
    next_6_hours?: { summary: { symbol_code: string }; details?: { precipitation_amount?: number } };
  };
};

export function iconaDa(codice: string): TipoIcona {
  const notte = codice.endsWith("_night");
  if (/snow|sleet/.test(codice)) return "neve";
  if (/rain|thunder/.test(codice)) return "pioggia";
  if (/^(clearsky|fair)/.test(codice)) return notte ? "luna" : "sole";
  if (codice.startsWith("partlycloudy")) return notte ? "lunaNuvola" : "soleNuvola";
  return "nuvola"; // cloudy, fog
}

const DESCRIZIONI: [RegExp, Descrizione][] = [
  [/thunder/, "temporale"],
  [/sleet/, "nevischio"],
  [/^heavysnow/, "neveForte"],
  [/^lightsnow/, "neveDebole"],
  [/snowshowers/, "rovesciNeve"],
  [/snow/, "neve"],
  [/^heavyrain/, "pioggiaForte"],
  [/^lightrain/, "pioggiaDebole"],
  [/rainshowers/, "rovesci"],
  [/rain/, "pioggia"],
  [/^clearsky/, "sereno"],
  [/^fair/, "pocoNuvoloso"],
  [/^partlycloudy/, "variabile"],
  [/^fog/, "nebbia"],
  [/^cloudy/, "nuvoloso"],
];

function descrizioneDa(codice: string): Descrizione | null {
  return DESCRIZIONI.find(([re]) => re.test(codice))?.[1] ?? null;
}

const giornoLocale = (iso: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: FUSO }).format(new Date(iso)); // AAAA-MM-GG
const oraLocale = (iso: string) =>
  Number(new Intl.DateTimeFormat("en-GB", { timeZone: FUSO, hour: "2-digit", hourCycle: "h23" }).format(new Date(iso)));

export async function leggiMeteo(): Promise<Meteo | null> {
  try {
    const res = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${LAT}&lon=${LON}&altitude=${QUOTA}`,
      {
        headers: { "User-Agent": "scuolascigranparadiso.com meteo https://www.scuolascigranparadiso.com" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    const json = await res.json();
    const serie: Punto[] = json?.properties?.timeseries ?? [];
    if (!serie.length) return null;

    const adesso = serie[0];
    const codiceOra =
      adesso.data.next_1_hours?.summary.symbol_code ?? adesso.data.next_6_hours?.summary.symbol_code ?? "cloudy";

    // raggruppo per giorno (ora italiana)
    const perGiorno = new Map<string, Punto[]>();
    for (const p of serie) {
      const g = giornoLocale(p.time);
      if (!perGiorno.has(g)) perGiorno.set(g, []);
      perGiorno.get(g)!.push(p);
    }

    const oggi = giornoLocale(adesso.time);
    const giorni = [...perGiorno.entries()]
      .filter(([g, punti]) => g === oggi || punti.length >= 4) // scarto l'ultimo giorno incompleto
      .slice(0, 6)
      .map(([g, punti]) => {
        const temp = punti.map((p) => p.data.instant.details.air_temperature).filter((t): t is number => t != null);
        // icona del giorno: le 6 ore attorno a mezzogiorno, altrimenti la prima disponibile
        const conSei = punti.filter((p) => p.data.next_6_hours);
        const mezzogiorno =
          conSei.reduce<Punto | undefined>(
            (best, p) => (!best || Math.abs(oraLocale(p.time) - 11) < Math.abs(oraLocale(best.time) - 11) ? p : best),
            undefined,
          ) ?? punti[0];
        const codice =
          mezzogiorno.data.next_6_hours?.summary.symbol_code ?? mezzogiorno.data.next_1_hours?.summary.symbol_code ?? "cloudy";
        return {
          data: g,
          oggi: g === oggi,
          icona: iconaDa(codice.replace("_night", "_day")),
          max: Math.round(Math.max(...temp)) || 0, // niente "-0"
          min: Math.round(Math.min(...temp)) || 0,
        };
      });

    const pioggia24h = serie
      .slice(0, 24)
      .reduce((s, p) => s + (p.data.next_1_hours?.details?.precipitation_amount ?? 0), 0);

    return {
      ora: {
        temp: Math.round(adesso.data.instant.details.air_temperature ?? 0) || 0,
        icona: iconaDa(codiceOra),
        descrizione: descrizioneDa(codiceOra),
      },
      giorni,
      ventoKmh: Math.round((adesso.data.instant.details.wind_speed ?? 0) * 3.6),
      pioggia24h: Math.round(pioggia24h * 10) / 10,
    };
  } catch {
    return null;
  }
}
