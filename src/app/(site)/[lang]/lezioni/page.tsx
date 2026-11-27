// src/app/(site)/[lang]/lezioni/page.tsx
import Image from "next/image";
import Lines from "@/components/Lines";
import PageVideoHero from "@/components/PageVideoHero";
import PuntiRitrovo, { type PuntoRitrovo } from "@/components/PuntiRitrovo";
import { reader } from "@/lib/content";
import { alternative, localizza, type Lingua } from "@/lib/lingue";
import { TESTI } from "@/lib/testi";

export function generateMetadata({ params }: { params: { lang: Lingua } }) {
  return { title: TESTI[params.lang].meta.lezioni, alternates: alternative("lezioni", params.lang) };
}

/* Icone delle discipline: versione per sfondo scuro e per sfondo montagna (_b) */
const DISCIPLINE = [
  { value: "alpino", icon: "logo_alpino" },
  { value: "snowboard", icon: "logo_snowboard" },
  { value: "nordico", icon: "logo_fondo" },
] as const;

function DisciplineIcons({
  selected,
  lang,
  variant = "",
}: {
  selected: readonly string[];
  lang: Lingua;
  variant?: "" | "_b";
}) {
  const nomi = TESTI[lang].lezioni.discipline;
  return (
    <div className="mt-6 flex flex-wrap gap-6 text-white/90 text-[11px] md:text-xs uppercase tracking-[0.22em] font-oswald">
      {DISCIPLINE.filter((d) => selected.includes(d.value)).map((d) => (
        <div key={d.value} className="flex items-center gap-2">
          <Image
            src={`/assets/logos/${d.icon}${variant}.png`}
            alt={nomi[d.value]}
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          {nomi[d.value]}
        </div>
      ))}
    </div>
  );
}

/* Celle della tabella: disciplina in maiuscolo + orario sotto */
function TipoLezione({ disciplina, orario }: { disciplina: string; orario: string }) {
  return (
    <td className="border border-white/15 px-4 py-3 align-top">
      <div className="uppercase text-[13px] sm:text-[14px] tracking-[0.16em]">
        {disciplina}
      </div>
      <div className="text-[13px] text-white/70">{orario}</div>
    </td>
  );
}

/* Indice in alto: porta alle sezioni della pagina (le etichette sono in testi.ts) */
const INDICE = [
  { href: "#periodi", chiave: "periodi" },
  { href: "#lezioni-private", chiave: "private" },
  { href: "#lezioni-collettive", chiave: "collettive" },
  { href: "#corsi-annuali", chiave: "annuali" },
  { href: "#snowcare", chiave: "snowcare" },
  { href: "#pagamenti", chiave: "pagamenti" },
  { href: "#ritrovo", chiave: "ritrovo" },
] as const;

/* Colori delle tre stagioni */
const STAGIONI = [
  { key: "altissima", color: "#37C6E6", dark: false },
  { key: "alta", color: "#1DB0D5", dark: false },
  { key: "bassa", color: "#1389A8", dark: false },
] as const;

/* Testo con parole tra **asterischi** in azzurro */
function Evidenzia({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? (
          <span key={i} className="text-[#37C6E6] font-medium">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

type Voce = { nome: string; disciplina: string; periodo: string; dettaglio: string; prezzo: string };

/* Elenco corsi/pacchetti con prezzo a destra */
function ListaPrezzi({ voci }: { voci: Voce[] }) {
  return (
    <div className="mt-6 border-t-[3px] border-[#37C6E6]">
      {voci.map((v, i) => (
        <div key={i} className="grid grid-cols-[1fr_auto] items-center gap-4 sm:gap-6 border-b border-white/15 py-5">
          <div>
            <div className="font-sofia font-extrabold uppercase text-white text-[22px] sm:text-[26px] lg:text-[32px] leading-tight">
              {v.nome}
              {v.disciplina && (
                <span className="ml-2.5 inline-block align-middle rounded-full border-[1.5px] border-[#37C6E6] px-2.5 py-0.5 text-[11px] sm:text-[13px] tracking-[0.08em] text-[#37C6E6]">
                  {v.disciplina}
                </span>
              )}
            </div>
            {v.periodo && (
              <div className="font-oswald mt-1.5 uppercase tracking-[0.04em] text-[15px] sm:text-[17px] text-[#37C6E6]">
                {v.periodo}
              </div>
            )}
            {v.dettaglio && (
              <div className="font-oswald mt-0.5 uppercase tracking-[0.04em] text-[14px] sm:text-[16px] text-white/80">
                {v.dettaglio}
              </div>
            )}
          </div>
          <div className="border-l-[3px] border-[#37C6E6] pl-4 sm:pl-6 sm:min-w-[170px] text-right font-sofia font-extrabold text-white text-[28px] sm:text-[36px] lg:text-[46px] whitespace-nowrap">
            {v.prezzo}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function LezioniPage({ params }: { params: { lang: Lingua } }) {
  const { lang } = params;
  const t = TESTI[lang].lezioni;
  const contenuto = await reader.singletons.lezioni.readOrThrow();
  const l = localizza(contenuto, lang);
  // scheda Snowcare nella lingua della pagina (se manca, quella italiana)
  const chiave = ({ it: "ita", en: "eng", fr: "fra" } as const)[lang];
  const schedaPdf = l.snowcare.scheda[chiave] || l.snowcare.scheda.ita;
  const schedaImmagine = l.snowcare.schedaImmagine[chiave] || l.snowcare.schedaImmagine.ita;
  // punti di ritrovo: le coordinate scritte in Keystatic ("45.6, 7.35") diventano numeri
  const punti: PuntoRitrovo[] = l.ritrovo.punti.flatMap((p) => {
    const [lat, lng] = p.coordinate.split(",").map((x) => Number(x.trim()));
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return [];
    return [{ nome: p.nome, luogo: p.luogo, tipo: p.tipo, nota: p.nota, lat, lng }];
  });
  const ca = l.corsiAnnuali;

  return (
    <main>
      {/* ===================== HERO CON VIDEO + INDICE ===================== */}
      <PageVideoHero titolo={l.titolo} video={l.heroVideo} foto={l.heroFoto}>
          <nav aria-label={t.sezioni}>
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
              {INDICE.map((v) => (
                <li key={v.href}>
                  <a
                    href={v.href}
                    className="inline-block border border-[#37C6E6] bg-[#101010]/60 backdrop-blur-sm px-3 sm:px-4 py-2 font-oswald uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[11px] sm:text-[14px] text-white hover:bg-[#37C6E6] hover:text-[#001018] transition-colors"
                  >
                    {t.indice[v.chiave]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
      </PageVideoHero>

      {/* ===================== BLOCCO NERO 1 – LEZIONI INDIVIDUALI ===================== */}
      <section
        id="lezioni-individuali"
        className="lezioni-black lezioni-black--first"
      >
        <div className="container-site">
          <div id="periodi" className="mb-12 md:mb-16">
            <h3 className="font-sofia text-white text-[30px] sm:text-[34px] lg:text-[38px] font-extrabold uppercase">
              {t.periodi1} <span className="text-[#37C6E6]">{t.periodi2}</span>
            </h3>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {STAGIONI.map(({ key, color, dark }) => {
                const s = l.stagioni[key];
                return (
                  <article key={key} className="bg-white/[0.05]">
                    <h4
                      className={`px-6 py-3 font-sofia font-extrabold uppercase text-[20px] sm:text-[22px] tracking-[0.04em] ${dark ? "text-[#001018]" : "text-white"}`}
                      style={{ background: color }}
                    >
                      {s.nome}
                    </h4>
                    <p className="font-oswald px-6 py-4 text-[16px] sm:text-[17px] leading-[1.7] text-white/90">
                      <Lines text={s.date} />
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div id="lezioni-private" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="max-w-[620px]">
              <h2
                className="
                  font-sofia mt-2
                  text-[38px] sm:text-[48px] lg:text-[80px]
                  leading-[1.05]
                  font-extrabold uppercase text-white
                "
              >
                <Lines text={l.individuali.titolo} />
              </h2>

              <p
                className="
                  font-oswald mt-4
                  text-[16px] sm:text-[18px] lg:text-[20px]
                  leading-relaxed text-white/80
                "
                style={{ textAlign: "justify" }}
              >
                {l.individuali.testo}
              </p>

              <DisciplineIcons selected={l.individuali.discipline} lang={lang} />
            </div>

            {l.individuali.foto && (
              <div className="foto-box relative aspect-[4/3] overflow-hidden">
                <Image
                  src={l.individuali.foto}
                  alt={t.altPrivate}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 520px, 100vw"
                />
              </div>
            )}
          </div>

          <div id="tariffe-private" className="mt-12 md:mt-16">
            <h3 className="font-sofia text-white text-[30px] sm:text-[34px] lg:text-[38px] font-extrabold uppercase">
              {l.private.titolo}
            </h3>
            {l.private.testo && (
              <p className="font-oswald mt-2 text-[16px] sm:text-[18px] leading-relaxed text-white/80">
                {l.private.testo}
              </p>
            )}

            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-white">
                <thead>
                  <tr>
                    <th className="bg-black px-2 sm:px-4 py-3 text-left font-oswald font-medium text-[11px] sm:text-[13px] uppercase tracking-[0.12em] sm:tracking-[0.18em]">
                      {t.tipoLezione}
                    </th>
                    {STAGIONI.map(({ key, color, dark }) => (
                      <th
                        key={key}
                        className={`px-2 sm:px-4 py-3 text-center font-oswald font-medium text-[11px] sm:text-[13px] uppercase tracking-[0.12em] sm:tracking-[0.18em] ${dark ? "text-[#001018]" : ""}`}
                        style={{ background: color }}
                      >
                        {l.stagioni[key].nomeBreve}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {l.private.righe.map((row, idx) => (
                    <tr key={idx} className="bg-black/70">
                      <TipoLezione disciplina={row.disciplina} orario={row.orario} />
                      {[row.prezzoAltissima, row.prezzoAlta, row.prezzoBassa].map((price, j) => (
                        <td
                          key={j}
                          className="border border-white/15 px-2 sm:px-4 py-3 text-center font-sofia font-extrabold text-[22px] sm:text-[30px] lg:text-[36px] whitespace-nowrap"
                        >
                          {price}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 grid md:grid-cols-[1.3fr_2fr] bg-[#37C6E6]/[0.12] border-l-[6px] border-[#37C6E6]">
              <div className="px-5 py-4 sm:px-6">
                <div className="font-sofia font-extrabold uppercase text-[22px] sm:text-[24px] text-[#37C6E6]">
                  {l.private.personaAggiuntaTitolo}
                </div>
                <div className="font-oswald uppercase tracking-[0.08em] text-[13px] sm:text-[14px] text-white/75">
                  {l.private.personaAggiuntaSottotitolo}
                </div>
              </div>
              <div className="px-5 pb-4 md:py-4 flex justify-around items-center gap-4">
                {STAGIONI.map(({ key }) => (
                  <div key={key} className="text-center font-oswald uppercase tracking-[0.14em] text-[13px] text-white/80">
                    {l.stagioni[key].nomeBreve}
                    <strong className="block font-sofia font-extrabold tracking-normal text-[26px] sm:text-[28px] text-white">
                      {l.stagioni[key].supplemento}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            {l.private.maestroTesto && (
              <div className="mt-4 grid md:grid-cols-[1.3fr_2fr] bg-[#37C6E6]/[0.12] border-l-[6px] border-[#37C6E6]">
                <div className="px-5 pt-4 md:py-4 sm:px-6 font-sofia font-extrabold uppercase text-[22px] sm:text-[24px] text-[#37C6E6]">
                  {l.private.maestroTitolo}
                </div>
                <p className="px-5 pb-4 pt-1 md:py-4 font-oswald text-[16px] sm:text-[17px] leading-relaxed text-white/90">
                  <Evidenzia text={l.private.maestroTesto} />
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================== MONTAGNA – LEZIONI DI GRUPPO ===================== */}
      <section id="lezioni-collettive" className="lezioni-mtn" data-sfondo="azzurro">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {l.collettive.foto && (
              <div className="foto-box relative aspect-[4/3] overflow-hidden">
                <Image
                  src={l.collettive.foto}
                  alt={t.altCollettive}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 520px, 100vw"
                />
              </div>
            )}

            <div className="max-w-[620px]">
              <h2 className="font-sofia mt-2 text-[38px] sm:text-[48px] lg:text-[80px] leading-[1.05] font-extrabold uppercase text-white">
                <Lines text={l.collettive.titolo} />
              </h2>

              <p
                className="font-oswald mt-4 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/90"
                style={{ textAlign: "justify" }}
              >
                {l.collettive.testo}
              </p>

              <DisciplineIcons selected={l.collettive.discipline} lang={lang} variant="_b" />
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-sofia text-white text-[30px] sm:text-[34px] lg:text-[38px] font-extrabold uppercase">
              {l.collettive.tariffeTitolo}
            </h3>

            <p className="font-oswald mt-3 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/90 max-w-[900px]">
              {l.collettive.tariffeTesto}
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {l.collettive.corsi.map((c, i) => (
                <article key={i} className="bg-black/65 border-t-[6px] border-[#37C6E6] px-6 pt-5 pb-2">
                  <h4 className="font-sofia font-extrabold uppercase text-white text-[26px] lg:text-[28px] leading-none">
                    {c.nome}
                  </h4>
                  <p className="font-oswald mt-2 min-h-[44px] uppercase tracking-[0.08em] text-[13px] sm:text-[14px] leading-snug text-white/75">
                    <Lines text={c.orari} />
                  </p>
                  <dl className="mt-3">
                    {c.prezzi.map((p, j) => (
                      <div key={j} className="flex items-baseline justify-between border-t border-[#37C6E6]/40 py-2.5">
                        <dt className="font-oswald uppercase tracking-[0.06em] text-[16px] sm:text-[17px] text-white">
                          {p.pacchetto}
                        </dt>
                        <dd className="font-sofia font-extrabold text-[26px] sm:text-[30px] text-white">
                          {p.prezzo}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>

            {l.collettive.nota && (
              <p className="mt-3 font-oswald text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed text-white/90">
                {l.collettive.nota}
              </p>
            )}

            <p className="mt-6 text-center">
              <a
                href="https://scuolascigranparadiso.beebeeboard.com/scuolesci_ecommerce/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#101010] px-6 py-3 font-oswald uppercase text-[16px] sm:text-[18px] lg:text-[20px] tracking-[0.06em] text-[#37C6E6] hover:bg-black"
              >
                {t.preventivo}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ===================== BLOCCO NERO – CORSI ANNUALI ===================== */}
      <section id="corsi-annuali" className="lezioni-black !pb-[150px] md:!pb-[170px]">
        <div className="container-site">
          <h2 className="font-sofia mt-2 text-[38px] sm:text-[48px] lg:text-[80px] leading-[1.05] font-extrabold uppercase text-white">
            {ca.titolo} <span className="text-[#37C6E6]">{ca.titoloColorato}</span>
          </h2>
          <p className="font-oswald mt-4 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/80 max-w-[760px]">
            {ca.testo}
          </p>

          <ListaPrezzi
            voci={ca.corsi.map((c) => ({
              nome: c.nome,
              disciplina: c.disciplina,
              periodo: c.periodo,
              dettaglio: c.orari,
              prezzo: c.prezzo,
            }))}
          />

          <h3 className="font-sofia mt-14 text-white text-[30px] sm:text-[34px] lg:text-[38px] font-extrabold uppercase">
            {ca.pacchettiTitolo} <span className="text-[#37C6E6]">{ca.pacchettiTitoloColorato}</span>
          </h3>
          <ListaPrezzi
            voci={ca.pacchetti.map((c) => ({
              nome: c.nome,
              disciplina: c.disciplina,
              periodo: "",
              dettaglio: c.descrizione,
              prezzo: c.prezzo,
            }))}
          />

          {ca.sconto.titolo && (
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 bg-[#37C6E6] text-[#001018] px-6 py-5 sm:px-8">
              <div>
                <div className="font-sofia font-extrabold uppercase text-[22px] sm:text-[26px] lg:text-[32px] leading-tight">
                  {ca.sconto.titolo}
                </div>
                <div className="font-oswald uppercase tracking-[0.08em] text-[13px] sm:text-[14px]">
                  {ca.sconto.testo}
                </div>
              </div>
              <div className="font-sofia font-extrabold text-[44px] sm:text-[56px] lg:text-[64px] leading-none">
                {ca.sconto.percentuale}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================== BLOCCO NERO 2 – SNOWCARE & PAGAMENTI ===================== */}
      <section id="snowcare" className="lezioni-mtn" data-sfondo="azzurro">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="max-w-[620px]">
              <h2 className="font-sofia mt-2 text-[38px] sm:text-[48px] lg:text-[80px] leading-[1.05] font-extrabold uppercase text-white">
                <Lines text={l.snowcare.titolo} />
                <br />
                <span className="text-[#0E657C]">
                  <Lines text={l.snowcare.titoloColorato} />
                </span>
              </h2>

              {l.snowcare.paragrafi.map((testo, i) => (
                <p
                  key={i}
                  className={`font-oswald ${i === 0 ? "mt-4" : "mt-3"} text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/90`}
                  style={i === 0 ? { textAlign: "justify" } : undefined}
                >
                  {testo}
                </p>
              ))}
            </div>

            {schedaPdf && schedaImmagine ? (
              /* scheda Snowcare come un volantino: cliccandola si apre il PDF nella lingua della pagina.
                 Abbassata quanto basta per partire all'altezza delle lettere di "Assicurazione". */
              <div className="w-full flex justify-center md:justify-end md:mt-[18px] lg:mt-[30px]">
                <a
                  href={schedaPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.apriScheda}
                  title={t.apriScheda}
                  className="group relative block w-full max-w-[400px] overflow-hidden rounded-[12px] bg-white shadow-[0_20px_40px_rgba(0,0,0,.35)] rotate-[1.5deg] transition-transform duration-300 hover:rotate-0 hover:-translate-y-1 motion-reduce:rotate-0"
                >
                  <Image
                    src={schedaImmagine}
                    alt={t.altScheda}
                    width={900}
                    height={1273}
                    sizes="400px"
                    className="block h-auto w-full"
                  />
                </a>
              </div>
            ) : l.snowcare.foto && (
              <div className="w-full flex justify-center md:justify-end">
                <div className="foto-box relative w-full max-w-[720px] aspect-[4/3] overflow-hidden">
                  <Image
                    src={l.snowcare.foto}
                    alt={t.altSnowcare}
                    fill
                    sizes="(min-width: 1024px) 720px, (min-width: 768px) 480px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <div id="pagamenti" className="mt-10 md:mt-14 max-w-[780px]">
            <h3 className="font-sofia text-white text-[30px] sm:text-[34px] lg:text-[38px] font-extrabold uppercase">
              {l.pagamenti.titolo}
            </h3>

            {l.pagamenti.paragrafi.map((testo, i) => (
              <p
                key={i}
                className="font-oswald mt-3 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/80"
              >
                {testo}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MONTAGNA – ORARI & LUOGHI ===================== */}
      <section id="ritrovo" className="lezioni-black">
        <div className="container-site">
          <div className="max-w-[900px]">
            <h2 className="font-sofia mt-2 text-white text-[38px] sm:text-[48px] lg:text-[80px] leading-[1.05] font-extrabold uppercase">
              <Lines text={l.ritrovo.titolo} />
            </h2>

            <p
              className="font-oswald mt-4 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/90"
              style={{ textAlign: "justify" }}
            >
              {l.ritrovo.testo}
            </p>
          </div>

          <PuntiRitrovo punti={punti} testi={t.ritrovo} />
        </div>
      </section>
    </main>
  );
}
