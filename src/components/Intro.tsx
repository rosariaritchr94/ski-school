"use client";

import { useEffect, useRef, useState } from "react";

export default function Intro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    (v as any).playsInline = true;

    // assegna la sorgente (cache buster per evitare cache)
    v.src = "/assets/intro/reel.mp4?v=1";
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
  }, []);

  return (
    <section className="slice-intro">
      <div className="container-site grid items-start grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-10">
        {/* Testo */}
        <div className="max-w-[620px]">
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
            THE<br />
            WILD SIDE<br />
            OF SKIING
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
            A Cogne lo sci è pura libertà. Qui, ai piedi del Gran Paradiso, ogni curva è un’avventura:
            che tu sia alle prime discese o un esperto della tecnica, con noi vivi lo sci nel suo lato più
            adrenalinico. Bambini, ragazzi, adulti: ognuno trova la sua sfida e il suo divertimento.
            La Scuola di Sci Gran Paradiso è il posto dove imparare, ridere e condividere emozioni vere,
            circondati dai paesaggi più spettacolari della Valle d’Aosta. Ready to ride the wild side?
          </p>
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
