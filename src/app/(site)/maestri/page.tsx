// src/app/(site)/maestri/page.tsx
import { Fragment } from "react";
import MaestriGrid, { type Maestro } from "@/components/MaestriGrid";
import { reader } from "@/lib/content";
import PageVideoHero from "@/components/PageVideoHero";

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
      {/* HERO CON VIDEO – come in Lezioni */}
      <PageVideoHero
        titolo={pagina?.titolo || "Maestri"}
        video={pagina?.heroVideo}
        foto={pagina?.heroFoto}
      />

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
            <div className="relative w-full max-w-[360px] aspect-square overflow-hidden bg-[#101010]">
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