"use client";

import { useEffect, useRef } from "react";

/**
 * Video di sfondo in loop, senza audio.
 * Con "riduci movimento" attivo resta ferma l'immagine (poster).
 */
export default function HeroVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster?: string | null;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster ?? undefined}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
