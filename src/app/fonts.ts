// src/app/fonts.ts
import { Sofia_Sans, Oswald } from "next/font/google";

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
