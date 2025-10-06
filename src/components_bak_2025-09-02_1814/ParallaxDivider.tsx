"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Fit = "cover" | "contain" | "width";

type Props = {
  image?: string;
  height?: number;        // usato solo se non passi ratio
  ratio?: number;         // larghezza/altezza (es. 1148/690)
  speed?: number;         // intensità parallasse
  flip?: boolean;         // alias: flipY
  flipX?: boolean;        // specchio orizzontale
  flipY?: boolean;        // capovolgi verticale
  fit?: Fit;              // "contain" per vedere tutto
  fullBleed?: boolean;    // a tutta larghezza viewport
  offsetY?: number;       // <<< NUOVO: sposta su/giù in px (es. -60 per vedere più nero)
  className?: string;
};

export default function ParallaxDivider({
  image = "/img/hero-mountains.jpg",
  height = 420,
  ratio,
  speed = 0.30,
  flip = false,
  flipX = false,
  flipY = false,
  fit = "contain",
  fullBleed = true,
  offsetY = 0,
  className = "",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  const doFlipY = flipY || flip;

  useEffect(() => {
    const wrap = wrapRef.current!;
    const layer = layerRef.current!;
    let raf = 0;

    const update = () => {
      const r = wrap.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      const scrollMove = Math.max(Math.min(center * -speed, 200), -200);
      // Applica offset manuale + movimento, invertendo il verso se capovolto in Y
      const base = offsetY + scrollMove;
      const applied = doFlipY ? -base : base;

      const sx = flipX ? -1 : 1;
      const sy = doFlipY ? -1 : 1;

      // translate poi scale: la traduzione resta nel verso “normale”
      layer.style.transform = `translate3d(0, ${applied}px, 0) scale(${sx}, ${sy})`;
      raf = 0;
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [speed, flipX, doFlipY, offsetY]);

  const style: CSSProperties & Record<string, any> = {};
  if (ratio) style["--ratio"] = String(ratio);
  else style["--h"] = `${height}px`;

  return (
    <div
      ref={wrapRef}
      className={[
        "parallax-divider",
        ratio ? "parallax-ratio" : "parallax-fixedh",
        fullBleed ? "parallax-bleed" : "",
        className,
      ].join(" ")}
      style={style}
      aria-hidden="true"
    >
      <div
        ref={layerRef}
        className={[
          "parallax-layer",
          fit === "contain" ? "parallax--contain" : "",
          fit === "width"   ? "parallax--width"   : "",
        ].join(" ")}
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
}
