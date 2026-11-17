// src/components/BachecaEventi.tsx
// Lavagna nera con polaroid appese al filo. Gli eventi con data passata spariscono da soli;
// senza eventi la bacheca non compare. Stili .bacheca-* in globals.css.
import Image from "next/image";

type Evento = {
  foto: string | null;
  data: string | null;
  titolo: string;
  testo: string;
  scritta: string;
};

const FUSO = "Europe/Rome";
const oggi = () => new Intl.DateTimeFormat("en-CA", { timeZone: FUSO }).format(new Date()); // AAAA-MM-GG
const mese = (iso: string) =>
  new Intl.DateTimeFormat("it-IT", { month: "short", timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`)).replace(".", "");

export default function BachecaEventi({ titolo, eventi }: { titolo: string; eventi: readonly Evento[] }) {
  const adesso = oggi();
  const visibili = eventi
    .filter((e): e is Evento & { foto: string } => Boolean(e.foto))
    .filter((e) => !e.data || e.data >= adesso)
    .sort((a, b) => (a.data ?? "9999").localeCompare(b.data ?? "9999"));

  if (!visibili.length) return null;

  // a gruppi di 3: ogni riga ha il suo filo
  const righe: (typeof visibili)[] = [];
  for (let i = 0; i < visibili.length; i += 3) righe.push(visibili.slice(i, i + 3));

  return (
    <section aria-label={titolo} className="bacheca mt-6">
      <h2 className="font-gesso font-bold normal-case text-[44px] md:text-[56px] leading-none text-white/90">
        {titolo}
      </h2>
      <span aria-hidden="true" className="bacheca-sottolineato" />

      {righe.map((riga, r) => (
        <div key={r} className="bacheca-riga">
          <svg aria-hidden="true" className="bacheca-filo" viewBox="0 0 1000 40" preserveAspectRatio="none">
            <path d="M0 6 Q250 40 500 18 T1000 8" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2" />
          </svg>
          <ul className="grid gap-12 md:gap-8 md:grid-cols-3">
            {riga.map((e, i) => (
              <li key={`${r}-${i}`} className="bacheca-evento">
                {/* post-it della data; senza data resta il post-it "presto" */}
                <div className="bacheca-data">
                  <span className="bacheca-nastro" aria-hidden="true" />
                  <b className="font-sofia">{e.data ? e.data.slice(8, 10) : "?"}</b>
                  <span className="font-oswald">{e.data ? mese(e.data) : "presto"}</span>
                </div>
                <figure className="bacheca-polaroid">
                  <span className="bacheca-molletta" aria-hidden="true" />
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-800">
                    <Image
                      src={e.foto}
                      alt={e.titolo || e.scritta || ""}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 360px, 90vw"
                    />
                  </div>
                  {(e.titolo || e.testo || e.scritta) && (
                    <figcaption className="pt-3">
                      {e.titolo && (
                        <h3 className="font-sofia font-extrabold uppercase text-[22px] md:text-[24px] leading-[1.05] text-[#101010]">
                          {e.titolo}
                        </h3>
                      )}
                      {e.testo && (
                        <p className="font-oswald text-[15px] leading-[1.45] text-[#333] mt-1.5 whitespace-pre-line">
                          {e.testo}
                        </p>
                      )}
                      {e.scritta && (
                        <p className={`font-gesso font-bold text-[24px] leading-tight text-[#1389A8] mt-1 ${e.titolo || e.testo ? "" : "text-center"}`}>
                          {e.scritta}
                        </p>
                      )}
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
