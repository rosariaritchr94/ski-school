"use client";

import { useEffect, useRef, useState } from "react";

export default function Intro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;           // requisito per autoplay su mobile
    (v as any).playsInline = true;

    // assegna la sorgente (cache buster per evitare cache)
    v.src = "/assets/intro/reel.mp4?v=1";
    v.load();

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {/* silenzia errori autoplay */});
    };

    const onCanPlay = () => { setStatus("ready"); tryPlay(); };
    const onPlaying = () => setStatus("ready");
    const onError = () => setStatus("error");

    tryPlay();
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("error", onError);
    const vis = () => { if (!document.hidden) tryPlay(); };
    document.addEventListener("visibilitychange", vis);

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return (
    <section className="slice-intro">
      <div className="container-site grid items-start grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-10">
        {/* Testo */}
        <div className="max-w-[560px]">
          <p className="text-[12px] tracking-[0.35em] text-[#37C6E6] uppercase">
            The strongest
          </p>
          <h2 className="mt-2 text-[28px] leading-[1.1] md:text-[34px] font-extrabold text-[#37C6E6] uppercase">
            Ski School in<br/>Aosta Valley
          </h2>
          <p className="mt-4 text-[13px] leading-relaxed text-black/80">
            Riders, imparare, godersi l’essenza di una lunga stagione come mai prima.
            Offriamo lezioni su misura per ogni livello, dai principianti agli esperti,
            con i migliori maestri della Valle.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <a href="/lezioni" className="btn btn-accent">Richiedi lezione</a>
            <a href="/prenota" className="btn border border-black/20 text-black hover:bg-black hover:text-white">
              Prenota
            </a>
          </div>
        </div>

        {/* Pannello VIDEO — verticale (portrait) */}
        <figure className="relative md:-mt-2 lg:-mt-3 justify-self-center lg:justify-self-end w-full">
          <div
            className="
              relative
              mx-auto md:ml-auto
              w-[78%] sm:w-[65%] md:w-[380px] lg:w-[420px] max-w-[440px]
              aspect-[3/4] md:aspect-[2/3]
              rounded-[12px] overflow-hidden
              shadow-[0_20px_40px_rgba(0,0,0,.35)]
              bg-black
            "
          >
            {/* Stato (utile per capire se carica) */}
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

          <figcaption className="absolute -bottom-5 right-1/2 translate-x-1/2 md:right-4 md:translate-x-0 text-[9.5px] tracking-[0.22em] text-black/60 uppercase">
            Reel di presentazione
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
