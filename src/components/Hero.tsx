// src/components/Hero.tsx
"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    const vScuro = -0.08;
    const vChiaro = -0.30;
    const vBianco = -0.28;

    const maxUpScuro = -60;
    const maxUpChiaro = -90;
    const maxUpBianco = -120;

    let ticking = false;

    const update = () => {
      ticking = false;
      const yPos = Math.max(0, window.scrollY);

      const pScuro = Math.max(maxUpScuro, vScuro * yPos);
      const pChiaro = Math.max(maxUpChiaro, vChiaro * yPos);
      const pBianco = Math.max(maxUpBianco, vBianco * yPos);

      root.style.setProperty("--p-scuro", `${pScuro}px`);
      root.style.setProperty("--p-chiaro", `${pChiaro}px`);
      root.style.setProperty("--p-bianco", `${pBianco}px`);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative bg-[#101010]">
      {/* TITOLI */}
      <div
        className="
          container-site
          pt-[var(--title-offset)]
          pb-[440px] md:pb-[560px] lg:pb-[760px] xl:pb-[800px] 2xl:pb-[840px]
        "
      >
        {/* SOLO LA SCRITTA viene spostata verso l'alto */}
        <div
          className="
            relative max-w-3xl mx-auto
            transform
            -translate-y-6 sm:-translate-y-8 md:-translate-y-12 lg:-translate-y-14
            text-center
          "
        >
          <p className="heading text-[19px] tracking-[0.50em] text-[rgb(var(--accent))]">
            Scuola di Sci & Snowboard
          </p>
          <h1
            className="
              mt-3 md:mt-4 lg:mt-5
              text-5xl md:text-7xl lg:text-8xl
              tracking-[0.02em] md:tracking-[0.03em]
              font-extrabold
              uppercase
            "
          >
            Gran Paradiso
          </h1>
        </div>
      </div>

      {/* MONTAGNE (invariato) */}
      <div className="mtn-wrap">
        <div className="mtn z-10 mtn--scuro">
          <img
            src="/assets/mountains/montagna-azzurro-scuro.png"
            alt=""
            aria-hidden="true"
            draggable="false"
          />
        </div>
        <div className="mtn z-20 mtn--chiaro">
          <img
            src="/assets/mountains/montagna-azzurro-chiaro.png"
            alt=""
            aria-hidden="true"
            draggable="false"
          />
        </div>
        <div className="mtn z-30 mtn--bianco">
          <img
            src="/assets/mountains/montagna-bianco.png"
            alt=""
            aria-hidden="true"
            draggable="false"
          />
        </div>
      </div>

      {/* LOGO CENTRALE (invariato) */}
      <div className="hero-logo">
        <img
          src="/assets/logos/logo-centrale.png"
          alt="Logo Gran Paradiso"
          className="block"
          draggable="false"
        />
      </div>
    </section>
  );
}
