// src/app/fonts.ts
import { Sofia_Sans, Oswald, Caveat } from "next/font/google";

export const sofia = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-sofia",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// scritte "a mano" della bacheca eventi
export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["500", "700"],
});
