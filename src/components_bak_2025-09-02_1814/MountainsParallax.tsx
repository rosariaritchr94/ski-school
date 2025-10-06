"use client";

import { useEffect, useRef } from "react";

/**
 * 3 PNG interi sovrapposti nell’ordine:
 *  - /img/mountains-dark.png   (scuro)  z:10
 *  - /img/mountains-light.png  (chiaro) z:20
 *  - /img/mountains-white.png  (bianco) z:30
 *
 * Il “cielo” e i riempimenti sono in CSS. Qui gestiamo il parallasse.
 */
export default function MountainsParallax({
  speed1 = 0.05,   // scuro
  speed2 = 0.09,   // chiaro
  speed3 = 0.13,   // bianco
  preStart = 0.90, // inizia vicino al fondo viewport
}: {
  speed1?: number; speed2?: number; speed3?: number; preStart?: number;
}) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const l1 = useRef<HTMLDivElement | null>(null);
  const l2 = useRef<HTMLDivElement | null>(null);
  const l3 = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);
  const sectionTopRef = useRef<number>(0);

  function computeSectionTop() {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset || 0;
    sectionTopRef.current = rect.top + scrollTop;
  }

  useEffect(() => {
    const mqlMobile = window.matchMedia("(max-width: 768px)");
    const mqlReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const speeds = mqlReduce.matches
      ? { s1: 0, s2: 0, s3: 0 }
      : (mqlMobile.matches
         ? { s1: 0.025, s2: 0.04, s3: 0.055 }
         : { s1: speed1, s2: speed2, s3: speed3 });

    const tick = () => {
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const vh = window.innerHeight || 0;
      const triggerBottom = scrollTop + vh * preStart;
      const yRel = Math.max(0, triggerBottom - sectionTopRef.current);

      if (l1.current) l1.current.style.setProperty("--py", `${yRel * speeds.s1}px`);
      if (l2.current) l2.current.style.setProperty("--py", `${yRel * speeds.s2}px`);
      if (l3.current) l3.current.style.setProperty("--py", `${yRel * speeds.s3}px`);

      raf.current = null;
    };

    const onScroll = () => { if (raf.current != null) return; raf.current = requestAnimationFrame(tick); };
    const onResize = () => { computeSectionTop(); tick(); };

    computeSectionTop();
    tick();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [speed1, speed2, speed3, preStart]);

  return (
    <section ref={wrapRef} className="mountains-stack" aria-label="Decorazione montagne">
      {/* SCURO (strato più basso, si vede poco sopra il cielo) */}
      <div ref={l1} className="bleed mountain-1 parallax" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/mountains-dark.png" alt="" loading="eager" className="mountain-img" />
      </div>

      {/* AZZURRO CHIARO (sopra lo scuro) */}
      <div ref={l2} className="bleed mountain-2 parallax" aria-hidden>
        <img src="/img/mountains-light.png" alt="" loading="eager" className="mountain-img" />
      </div>

      {/* BIANCO (sopra a tutti, farà da raccordo con la sezione bianca dopo) */}
      <div ref={l3} className="bleed mountain-3 parallax" aria-hidden>
        <img src="/img/mountains-white.png" alt="" loading="eager" className="mountain-img" />
      </div>
    </section>
  );
}
