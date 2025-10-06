"use client";
import { useRef } from "react";

type Img = { src: string; alt?: string };
export default function GalleryStrip({ images }: { images?: Img[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current; if (!el) return;
    el.scrollBy({ left: dir === "next" ? 320 : -320, behavior: "smooth" });
  };
  const items = images?.length ? images.map((i, k) => (
    <div key={k} className="min-w-[200px] h-[130px] rounded-md overflow-hidden bg-white text-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={i.src} alt={i.alt ?? "Foto"} className="w-full h-full object-cover" />
    </div>
  )) : Array.from({ length: 4 }).map((_, k) => (
    <div key={k} className="min-w-[200px] h-[130px] rounded-md bg-white grid place-items-center text-black font-bold">
      FOTO
    </div>
  ));
  return (
    <div className="relative">
      <button onClick={() => scroll("prev")} className="absolute -left-4 top-1/2 hidden -translate-y-1/2 md:flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">‹</button>
      <div ref={trackRef} className="strip flex gap-4 overflow-x-auto px-1 py-1">{items}</div>
      <button onClick={() => scroll("next")} className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">›</button>
    </div>
  );
}
