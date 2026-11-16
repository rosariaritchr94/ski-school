import Image from "next/image";
import type { ReactNode } from "react";
import HeroVideo from "./HeroVideo";

/**
 * Fascia iniziale delle pagine interne: video in loop (o foto) dietro il titolo.
 * Su telefono l'altezza mostra solo la clip centrale, intera.
 */
export default function PageVideoHero({
  titolo,
  video,
  foto,
  children,
}: {
  titolo: string;
  video?: string | null;
  foto?: string | null;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-black h-[min(133.4vw,720px)] sm:h-[560px] lg:h-[640px]">
      {video ? (
        <HeroVideo
          src={video}
          poster={foto}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      ) : (
        foto && (
          <Image src={foto} alt="" fill priority className="-z-10 object-cover" sizes="100vw" />
        )
      )}
      {/* velo che sfuma nel nero della pagina */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,.15),rgba(0,0,0,.12)_45%,rgba(16,16,16,.75)_80%,#101010)]"
      />

      <div className="container-site flex h-full flex-col items-center justify-end gap-7 md:gap-8 pb-8 md:pb-10 text-center">
        <h1 className="font-sofia text-[48px] sm:text-[64px] lg:text-[96px] leading-none font-extrabold tracking-[0.02em] uppercase text-white [text-shadow:0_4px_24px_rgba(0,0,0,.45)]">
          {titolo}
        </h1>
        {children}
      </div>
    </section>
  );
}
