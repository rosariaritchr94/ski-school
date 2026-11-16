"use client";

import { useEffect, useRef, useState } from "react";
import Lines from "./Lines";

export type IntroContent = {
  titolo: string;
  testo: string;
  video: string | null;
};

/**
 * Parallasse leggera: il pannello si sposta di al massimo ±maxShift px
 * mentre si scorre. Al centro dello schermo è nella sua posizione normale.
 */
function useParallax(maxShift = 40, factor = 0.12) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      const shift = Math.max(-maxShift, Math.min(maxShift, -fromCenter * factor));
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [maxShift, factor]);

  return ref;
}

export default function Intro({ titolo, testo, video }: IntroContent) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const parallaxRef = useParallax();
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !video) return;

    v.muted = true;
    (v as any).playsInline = true;

    // assegna la sorgente (cache buster per evitare cache)
    v.src = `${video}?v=1`;
    v.load();

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const onCanPlay = () => {
      setStatus("ready");
      tryPlay();
    };
    const onPlaying = () => setStatus("ready");
    const onError = () => setStatus("error");

    tryPlay();
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("error", onError);
    const vis = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener("visibilitychange", vis);

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [video]);

  return (
    <section className="slice-intro">
      <div className="container-site grid items-start grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-10">
        {/* Testo */}
        <div className="max-w-[620px] lg:translate-y-[46px]">
          {/* TITOLO – SOFIA SANS */}
          <h2
            className="
              font-sofia
              mt-2
              text-[38px] sm:text-[48px] lg:text-[80px]
              leading-[1.05]
              font-extrabold
              text-[#37C6E6]
              uppercase
            "
          >
            <Lines text={titolo} />
          </h2>

          {/* PARAGRAFO – OSWALD, GIUSTIFICATO */}
          <p
            className="
              font-oswald
              mt-4
              text-[16px] sm:text-[18px] lg:text-[20px]
              leading-relaxed
              text-black/80
            "
            style={{ textAlign: "justify" }}
          >
            {testo}
          </p>
        </div>

        {/* Pannello VIDEO — verticale (portrait) */}
        <figure className="relative md:-mt-2 lg:-mt-3 justify-self-center lg:justify-self-end w-full translate-y-[60px] md:translate-y-[80px]">
          <div
            ref={parallaxRef}
            className="
              relative will-change-transform
              mx-auto md:ml-auto
              w-[78%] sm:w-[65%] md:w-[380px] lg:w-[420px] max-w-[440px]
              aspect-[9/16]
              rounded-[12px] overflow-hidden
              shadow-[0_20px_40px_rgba(0,0,0,.35)]
              bg-black
            "
          >
            {status !== "ready" && (
              <div className="absolute inset-0 grid place-items-center text-white/85 text-[11px] tracking-[0.22em] uppercase z-10">
                {status === "loading" ? "Caricamento video…" : "Errore video"}
              </div>
            )}

            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Reel di presentazione - Scuola di Sci"
            />
          </div>
          {/* figcaption rimosso */}
        </figure>
      </div>
    </section>
  );
}
