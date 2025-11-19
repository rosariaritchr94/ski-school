import "@/app/globals.css";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { sofia, oswald } from "@/app/fonts";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={`${sofia.variable} ${oswald.variable}`}>
      <body className="bg-black text-white font-sofia">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
