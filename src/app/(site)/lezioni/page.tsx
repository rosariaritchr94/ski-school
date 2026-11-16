// src/app/(site)/lezioni/page.tsx
import Image from "next/image";
import Lines from "@/components/Lines";
import { reader } from "@/lib/content";

export const metadata = { title: "Lezioni – Gran Paradiso" };

/* Icone delle discipline: versione per sfondo scuro e per sfondo montagna (_b) */
const DISCIPLINE = [
  { value: "alpino", label: "Sci alpino", icon: "logo_alpino" },
  { value: "snowboard", label: "Snowboard", icon: "logo_snowboard" },
  { value: "nordico", label: "Sci nordico", icon: "logo_fondo" },
] as const;

function DisciplineIcons({
  selected,
  variant = "",
}: {
  selected: readonly string[];
  variant?: "" | "_b";
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-6 text-white/90 text-[11px] md:text-xs uppercase tracking-[0.22em] font-oswald">
      {DISCIPLINE.filter((d) => selected.includes(d.value)).map((d) => (
        <div key={d.value} className="flex items-center gap-2">
          <Image
            src={`/assets/logos/${d.icon}${variant}.png`}
            alt={d.label}
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          {d.label}
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

export default async function LezioniPage() {
  const [l, home] = await Promise.all([
    reader.singletons.lezioni.readOrThrow(),
    reader.singletons.home.readOrThrow(),
  ]);
  const { natale, alta, bassa } = l.stagioni;
  const email = home.contatti.email;

  const stagioniCard = [
    { s: natale, bg: "bg-[#B91C1C]" },
    { s: alta, bg: "bg-[#1DB0D5]" },
    { s: bassa, bg: "bg-[#0E657C]" },
  ];

  return (
    <main>
      {/* HERO CON FOTO DI SFONDO */}
      <section className="lezioni-hero">
        <div className="inner">
          <div className="container-site text-center">
            <h1
              className="
                font-sofia mt-2
                text-[38px] sm:text-[48px] lg:text-[80px]
                leading-[1.05]
                font-extrabold tracking-[0.02em]
                uppercase text-white
              "
            >
              {l.titolo}
            </h1>
          </div>
        </div>
      </section>

      {/* ===================== BLOCCO NERO 1 – LEZIONI INDIVIDUALI ===================== */}
      <section
        id="lezioni-individuali"
        className="lezioni-black lezioni-black--first"
      >
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
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

              <DisciplineIcons selected={l.individuali.discipline} />
            </div>

            {l.individuali.foto && (
              <div className="foto-box relative aspect-[4/3] overflow-hidden">
                <Image
                  src={l.individuali.foto}
                  alt="Lezioni individuali di sci a Cogne"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 520px, 100vw"
                />
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {stagioniCard.map(({ s, bg }, i) => (
              <article
                key={i}
                className={`${bg} rounded-[12px] shadow-[0_18px_40px_rgba(0,0,0,.45)] px-6 py-6 md:px-7 md:py-7 flex flex-col items-center justify-center text-center min-h-[220px]`}
              >
                <h4 className="font-sofia font-extrabold text-white text-[22px] sm:text-[24px] lg:text-[26px] uppercase tracking-[0.08em] mb-3">
                  <span className="inline-block border-b-2 border-white pb-1">
                    {s.nome}
                  </span>
                </h4>
                <p className="font-oswald text-white text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed">
                  <Lines text={s.date} />
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 md:mt-12">
            <h3 className="font-sofia text-white text-[30px] sm:text-[34px] lg:text-[38px] font-extrabold uppercase">
              {l.private.titolo}
            </h3>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse font-oswald text-[15px] sm:text-[17px] lg:text-[19px] text-white">
                <thead>
                  <tr>
                    <th className="bg-black px-4 py-3 text-left text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      Tipo lezione
                    </th>
                    <th className="bg-[#B91C1C] px-4 py-3 text-center text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      {natale.nome}
                    </th>
                    <th className="bg-[#1DB0D5] px-4 py-3 text-center text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      {alta.nome}
                    </th>
                    <th className="bg-[#1389A8] px-4 py-3 text-center text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      {bassa.nome}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {l.private.righe.map((row, idx) => (
                    <tr key={idx} className="bg-black/70">
                      <TipoLezione disciplina={row.disciplina} orario={row.orario} />
                      {[row.prezzoNatale, row.prezzoAlta, row.prezzoBassa].map(
                        (price, j) => (
                          <td
                            key={j}
                            className="border border-white/15 px-4 py-3 text-center"
                          >
                            {price}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 font-oswald text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed text-white/60">
              {l.private.notaSupplemento}{" "}
              <span className="uppercase tracking-[0.16em] text-[#B91C1C]">
                {natale.nomeBreve}
              </span>{" "}
              {natale.supplemento} |{" "}
              <span className="uppercase tracking-[0.16em] text-[#1DB0D5]">
                {alta.nomeBreve}
              </span>{" "}
              {alta.supplemento} |{" "}
              <span className="uppercase tracking-[0.16em] text-[#1389A8]">
                {bassa.nomeBreve}
              </span>{" "}
              {bassa.supplemento}.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== MONTAGNA – LEZIONI DI GRUPPO ===================== */}
      <section id="lezioni-collettive" className="lezioni-mtn">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {l.collettive.foto && (
              <div className="foto-box relative aspect-[4/3] overflow-hidden">
                <Image
                  src={l.collettive.foto}
                  alt="Lezioni di gruppo di sci a Cogne"
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

              <DisciplineIcons selected={l.collettive.discipline} variant="_b" />
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-sofia text-white text-[30px] sm:text-[34px] lg:text-[38px] font-extrabold uppercase">
              {l.collettive.tariffeTitolo}
            </h3>

            <p className="font-oswald mt-3 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/90 max-w-[900px]">
              {l.collettive.tariffeTesto}
            </p>

            <h4 className="font-sofia mt-6 text-white text-[26px] sm:text-[30px] lg:text-[32px] font-extrabold uppercase">
              {l.collettive.tabellaTitolo}
            </h4>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse font-oswald text-[15px] sm:text-[17px] lg:text-[19px] text-white">
                <thead>
                  <tr>
                    <th className="bg-black/70 px-4 py-3 text-left text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      Tipo lezione
                    </th>
                    <th className="bg-[#1DB0D5] px-4 py-3 text-center text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      Pacchetto
                    </th>
                    <th className="bg-[#1389A8] px-4 py-3 text-center text-[12px] sm:text-[13px] uppercase tracking-[0.18em]">
                      Tariffa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {l.collettive.righe.map((row, idx) => (
                    <tr key={idx} className="bg-black/60">
                      <TipoLezione disciplina={row.disciplina} orario={row.orario} />
                      <td className="border border-white/15 px-4 py-3 text-center align-top">
                        {row.pacchetto}
                      </td>
                      <td className="border border-white/15 px-4 py-3 text-center align-top">
                        {row.tariffa}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {l.collettive.nota && (
              <p className="mt-3 font-oswald text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed text-white/80">
                {l.collettive.nota}
              </p>
            )}

            <p className="font-oswald mt-4 text-center text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-[rgb(var(--accent))]">
              <a
                href={`mailto:${email}?subject=Richiesta%20preventivo%20lezioni%20collettive`}
                className="underline-offset-4 hover:underline"
              >
                RICHIEDI IL TUO PREVENTIVO.
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ===================== BLOCCO NERO 2 – SNOWCARE & PAGAMENTI ===================== */}
      <section className="lezioni-black">
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
                  className={`font-oswald ${i === 0 ? "mt-4" : "mt-3"} text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed text-white/80`}
                  style={i === 0 ? { textAlign: "justify" } : undefined}
                >
                  {testo}
                </p>
              ))}
            </div>

            {l.snowcare.foto && (
              <div className="w-full flex justify-center md:justify-end">
                <div className="foto-box relative w-full max-w-[720px] aspect-[16/9] overflow-hidden">
                  <Image
                    src={l.snowcare.foto}
                    alt="Assicurazione Snowcare – proteggi la tua prenotazione"
                    fill
                    sizes="(min-width: 1024px) 720px, (min-width: 768px) 480px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 md:mt-14 max-w-[780px]">
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
      <section className="lezioni-mtn">
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

          <div className="mt-6 grid gap-4 md:grid-cols-3 font-oswald text-[13px] md:text-[14px] text-white">
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-red-500" />
              Punto scuola sci
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-green-500" />
              Campo scuola / debutto
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-blue-500" />
              Ritrovo collettive
            </div>
          </div>

          <div className="mt-8 w-full rounded-[12px] overflow-hidden shadow-xl shadow-black/40">
            <div className="aspect-[16/9] w-full">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(home.contatti.mappa).replace(/%20/g, "+").replace(/%2C/g, ",")}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
