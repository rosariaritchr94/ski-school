// src/app/fonts.ts
import { Sofia_Sans } from "next/font/google";

export const sofia = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-sofia",
  display: "swap",
  weight: [
    "300", "400", "500", "600", "700"
  ],
});
