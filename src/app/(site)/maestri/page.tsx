// src/app/(site)/maestri/page.tsx
import { Fragment } from "react";
import MaestriGrid, { type Maestro } from "@/components/MaestriGrid";
import { reader } from "@/lib/content";

export const metadata = {
  title: "Maestri – Gran Paradiso",
};

export default async function MaestriPage() {
  const pagina = await reader.singletons.paginaMaestri.read();
  const entries = await reader.collections.maestri.all();

  const maestri: Maestro[] = entries
    .sort(
      (a, b) =>
        (a.entry.ordine ?? 1000) - (b.entry.ordine ?? 1000) ||
        a.entry.nome.localeCompare(b.entry.nome),
    )
    .map(({ slug, entry }) => ({
      id: slug,
      nome: entry.nome,
      ruolo: entry.ruolo || undefined,
      disciplina: entry.disciplina || undefined,
      foto: entry.foto ?? undefined,
    }));

  const sloganRighe = (pagina?.slogan ?? "").split("\n").filter(Boolean);
  const paragrafi = pagina?.paragrafi ?? [];

  return (
    <main>
      {/* HERO – stesso effetto di Lezioni */}
      <section className="maestri-hero">
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
              {pagina?.titolo || "Maestri"}
            </h1>
          </div>
        </div>
      </section>

      {/* BLOCCO NERO – QUALITÀ / ESPERIENZA / DIVERTIMENTO */}
      <section className="maestri-black">
        <div className="container-site grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
          <div className="max-w-[520px]">
            <h2
              className="
                font-sofia
                text-white
                text-[34px] sm:text-[40px] lg:text-[52px]
                leading-[0.98]
                font-extrabold uppercase
                tracking-[0.08em]
              "
            >
              {sloganRighe.map((riga, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {riga}
                </Fragment>
              ))}
            </h2>

            {paragrafi.map((testo, i) => (
              <p
                key={i}
                className={`
                  font-oswald
                  ${i === 0 ? "mt-4" : "mt-3"}
                  text-[15px] sm:text-[17px] lg:text-[19px]
                  leading-relaxed
                  text-white/80
                `}
                style={i === 0 ? { textAlign: "justify" } : undefined}
              >
                {testo}
              </p>
            ))}
          </div>

          {/* Riquadro FOTO a destra */}
          {pagina?.foto && (
          <div className="w-full flex justify-center md:justify-end">
            <div className="foto-box relative w-full max-w-[360px] aspect-square overflow-hidden bg-black">
              <img
                src={pagina.foto}
                alt="Scuola di Sci Gran Paradiso"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          )}
        </div>
      </section>

      {/* GRIGLIA MAESTRI SU SFONDO MONTAGNA AZZURRA */}
      <MaestriGrid maestri={maestri} />
    </main>
  );
}